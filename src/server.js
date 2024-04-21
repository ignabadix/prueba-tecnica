const express = require('express');
const path = require('path');
const exphbs =  require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');

//initializations
const app =express();
require('./config/passport');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));


//register eq on handlebars
const Handlebars = require('handlebars');
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});
app.set('view engine', '.hbs');
//midlewares
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true // Aquí se configura la opción saveUninitialized
}));
app.use(passport.initialize());
app.use(passport.session());
//global variables
app.use((req, res, next) =>{
    res.locals.user = req.user || null;
    next();
})

//routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/gestusu.routes'));


//static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports =app;
