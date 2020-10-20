module.exports = function (app, passport) {
    app.get('/login',loginPageCheck, function (req, res) {
        var sMessage = '';
        if (req.query.sMessage) sMessage = req.query.sMessage
        res.render('middleware/login', {
            message: req.flash('loginMessage'),
            title: 'Login',
            successMessage: sMessage
        });
    });
    app.get('/',loginPageCheck, function (req, res) {
        res.redirect('/login')
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

function loginPageCheck (req, res, next) {

    if (!req.isAuthenticated())
        return next();
        
    res.redirect('/dashboard');
}