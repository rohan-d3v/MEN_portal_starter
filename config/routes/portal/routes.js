module.exports = function (app, passport, url) {

    app.get('/dashboard', isLoggedIn, function (req, res) {
        var entryMessage = ""; if(req.query.smessage) entryMessage = req.query.smessage
        res.render('portal/dashboard', { message: entryMessage, user: req.user.name, title: 'Dashboard' });
    });
    
};

/*Middleware Router*/
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();
        
    res.redirect('/');
}