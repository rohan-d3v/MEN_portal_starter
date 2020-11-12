module.exports = function (app, passport, url) {

    app.get('/dashboard', isLoggedIn, function (req, res) {
        var entryMessage = ""; if(req.query.smessage) entryMessage = req.query.smessage
        req.db.get('sample_table').find({},{}, (e, docs)=>{
            res.render('portal/dashboard', { message: entryMessage, user: req.user.name, title: 'Dashboard', data: docs });
        })
    });
    
};

/*Middleware Router*/
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();
        
    res.redirect('/');
}