const pkg = require('./config/dependencies');
const app = pkg.express();
const port = process.env.PORT || 4040;
const config = require('./config/config.js');
/*RazorPay Config*/
// var rzpInstance = new pkg.razorpay(config.rzpConfig);
/*NodeMailer Config*/
// const smtpContact = pkg.nodemailer.createTransport(config.mailerConfig);
/* AWS Config */
pkg.aws.config.update(config.awsConfig);
/* DB Config */
pkg.mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }); // Mongoose for login
var db = pkg.monk(config.dbURI); // Monk For API View

app.use(function (req, res, next) {
    req.db = db;
    next();
})
require('./config/passport')(pkg.passport);

app.use(pkg.morgan('dev'));
app.use(pkg.cookieParser());
app.use(pkg.bodyParser());
app.set('view engine', 'ejs');
app.use(pkg.express.static(pkg.path.join(__dirname, 'public')));

app.use(pkg.session({ secret: config.passportClientSecret, saveUninitialized: false, resave: true }));
app.use(pkg.passport.initialize());
app.use(pkg.passport.session());
app.use(pkg.flash());

/*Middleware Routes*/
require('./config/routes/middleware/signup.js')(app, pkg.passport, pkg.aws, pkg.url);
require('./config/routes/middleware/forgot.js')(app, pkg.aws, pkg.url);
require('./config/routes/middleware/login.js')(app, pkg.passport);

require('./config/routes/portal/routes.js')(app, pkg.passport, pkg.url);


app.listen(port);
console.log('The smugglers are on port ' + port);