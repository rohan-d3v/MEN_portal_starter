const otpGenerator = require('otp-generator'); var signotp = '';
module.exports = function (app, passport, aws, url) {

    app.get('/signup', function (req, res) {
        var eMessage = '';
        if (req.query.eMessage){
            eMessage = req.query.eMessage
        }
        res.render('middleware/signup/index', {
            message: eMessage,
            title: 'Signup',
        });
    });

    app.post('/signup_otp', (req, res) => {
        var number = req.body.mobile;
        var otpval = otpGenerator.generate(6, {
            alphabets: false, digits: true, upperCase: false, specialChars: false
        }); signotp = otpval;
        var params = {
            Message: 'Your OTP for signing up is ' + otpval,
            PhoneNumber: '+91' + number,
            MessageAttributes: { 'AWS.SNS.SMS.SenderID': { 'DataType': 'String', 'StringValue': 'signupOtp' } }
        };
        console.log(req.body)

        req.db.get('users').findOne({ mobile: number }, {}, function (e, docs) {
            if(!docs) {
                var publishTextPromise = new aws.SNS({ 
                    "region": "us-east-1" }).publish(params).promise();
                publishTextPromise.then(
                    function (data) {
                        res.render('middleware/signup/otp', {
                            message: "",
                            title: 'Signup',
                            name: req.body.name,
                            email: req.body.email,
                            mobile: req.body.mobile,
                            city: req.body.city,
                            password: req.body.password
                        }); console.log('-----------------\n' + number + '|' + otpval + '\n-----------------');
                    }).catch(function (err) { res.render('error', { title: 'Error' }) });
            }
            else res.redirect('/signup?eMessage=That Number Already Exists')
        });
        
    });

    app.post('/signup', otpcheck, passport.authenticate('local-signup', {
        successRedirect: '/dashboard?smessage=Welcome!',
        failureRedirect: '/signup',
        failureFlash: true
    }));

}

function otpcheck(req, res, next) {
    var otp = req.body.d1+ ''+req.body.d2+ ''+req.body.d3+ ''+req.body.d4+ ''+req.body.d5+ ''+req.body.d6
    if (otp == signotp)
        return next();
    else {
        res.render('middleware/signup/otp', {
            message: "Please Check your OTP before entering",
            title: 'Signup',
            first_name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            pan: req.body.pan,
            password: req.body.password
        });
    }

}