
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , login = require('./routes/login')
  , session = require('express-session');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(session({cookieName: 'session', secret: "fafadsfasfgfsgsa", resave: false, saveUninitialized: true,
    duration: 30 * 60 * 1000, activeDuration: 5 * 60 * 1000}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', login.login);
app.get('/admin', login.admin);
app.post('/userRegister',login.userRegister);
app.post('/userLogin',login.userLogin);
app.get('/userhome',login.userhome);
app.get('/userloginhome',login.userloginhome);
app.get('/userInfo',login.userInfo);
app.get('/logout',login.logout);
app.get('/top-rated',login.topRated);
app.get('/most-voted',login.mostVoted);
app.post('/userPreferences',login.userPreferences);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
