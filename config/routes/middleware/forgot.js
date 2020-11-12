const otpGenerator = require('otp-generator'), userModel = require('../../models/user');
module.exports = function (app, aws, url) {
    app.get('/forgot', function (req, res) {
        res.render('middleware/forgot/index', { message: "", title: 'Forgot Password' });
    });
    app.post('/forgot_otp', (req, res) => {
        var number = req.body.mobile;
        var otpval = otpGenerator.generate(6, { alphabets: false, digits: true, upperCase: false, specialChars: false });
        var params = {
            Message: 'Your TAX360 OTP for resetting your password is ' + otpval, PhoneNumber: '+91' + number, MessageAttributes: {
                'AWS.SNS.SMS.SenderID': { 'DataType': 'String', 'StringValue': 'signupOtp' }
            }
        }
        req.db.get('users').findOne({ mobile: number }, {}, function (e, docs) {
            if (docs) {
                var publishTextPromise = new aws.SNS({
                    "region": "us-east-1"
                }).publish(params).promise();
                publishTextPromise.then((data) => {
                    res.render('middleware/forgot/otp', {
                        title: 'Forgot Password',
                        mobile: number,
                        message: "",
                        otpHash: new userModel().generateHash(otpval)
                    });
                }).catch((error) => { res.send(error) });
                console.log('-----------------\n' + number + '|' + otpval + '\n-----------------');
            }
            else res.render('middleware/forgot/index', { message: "Your number doesn't seem to exist", title: 'Forgot Password' })
        });
    });
    app.post('/forgot_password', otpcheck, (req, res) => {
        res.render('middleware/forgot/reset', { title: 'Forgot Password', mobile: req.body.mobile })
    });
    app.post('/forgot', (req, res) => {
        var number = req.body.mobile, pass = req.body.password;
        var User = require('../../models/user');
        var changepass = new User().generateHash(pass);

        req.db.get('users').findOneAndUpdate({ mobile: number }, {
            $set: { password: changepass, confirm_password: pass }
        }, { new: true }, (err, doc) => {
            if (err) { console.log(err); res.send(err); }
            else {
                res.redirect(url.format({
                    pathname: "login",
                    query: { sMessage: "Your password has been changed successfully" }
                }));
            }
        })
    });
}

const bcrypt = require('bcrypt')
function otpcheck(req, res, next) {
    var otp = req.body.d1 + req.body.d2 + req.body.d3 + req.body.d4 + req.body.d5 + req.body.d6
    if (bcrypt.compareSync(otp, req.body.otpHash))
        return next();
    else {
        res.render('middleware/forgot/otp', {
            message: "Please Check your OTP before entering",
            title: 'Forgot',
            mobile: req.body.mobile,
            otpHash: req.body.otpHash
        });
    }

}
