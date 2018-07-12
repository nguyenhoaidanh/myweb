var express=require('express');
var app=express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var user = require('./route/user');
var db = require('./route/db');
var index= require('./route/index');
var SqlString = require('sqlstring');
var session = require('express-session');
app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.use(express.static('public'));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nguyenhoaidanh',
    database: 'myweb'
});
connection.connect();
app.use(bodyParser.urlencoded({
    extended: false
}));
global.db = connection;
global.SqlString = SqlString;

app.use(session({
    secret: 'axxxxxxxxaaaaa',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000*60
    }
}))




app.get('/',index.index);
app.post('/',user.login);
app.post('/profile',user.signUp);
app.get('/logout',user.logout);
app.get('/profile',user.profile);
app.get('/editProfile',user.editProfile);
app.post('/editProfile',user.editProfile);
app.get('/cart',user.cart);
app.get('/item/:itemId',db.detail_item);
app.get('/search',db.search);
app.post('/toCart',db.toCart);
app.post('/delFromCart',db.delFromCart);
app.set('port', process.env.PORT || 8080);
app.listen(process.env.PORT || 8080);
console.log("Create server done");