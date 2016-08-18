const express = require('express');
const http = require('http');
const path = require('path');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const errorhandler = require('errorhandler');
const dotenv =       require('dotenv')
dotenv.load();

var env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];

var strategy = require('./config/samlstrategy')(config);

console.log('Using configuration', config);

require('./config/passport')(strategy, passport, config);

var app = express();


app.set('port', config.app.port);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'this shit hits'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/routes')(app, config, passport, strategy);

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});