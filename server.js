var express=require('express');
var app=express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var user = require('./route/user');
var trade = require('./route/trade');
var admin = require('./route/admin');
var index= require('./route/index');
var SqlString = require('sqlstring');
var session = require('express-session');
var sha1 = require('sha1');
var nodemailer = require('nodemailer');

var request = require('request');
var formidable=require('formidable');

  

const fileUpload = require('express-fileupload');
// default options
app.use(fileUpload());
app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use('/fileUpload',express.static('fileUpload'));
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
global.nodemailer=nodemailer;
global.db = connection;
global.formidable=formidable
global.SqlString = SqlString;
global.sha1 = sha1;
global.request=request;








app.use(session({
    secret: 'axxxxxxxxaaaaa',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000*60
    }
}))

app.get('/cart',trade.cart);
app.get('/item/:itemId',trade.detail_item);
app.get('/search',trade.search);
app.get('/',index.index);
app.get('/logout',user.logout);
app.get('/profile',user.profile);
app.get('/editProfile',user.editProfile);
app.get('/changePass',user.changePass);
app.get('/admin',admin.admin);
app.get('/retrieve',trade.retrieve);
app.post('/updateItem',trade.updateItem);

app.post('/addItem',trade.addItem);

app.post('/removeItem',trade.removeItem);
app.post('/retrieve',trade.retrieve);
app.post('/admin',admin.admin);
app.post('/changePass',user.changePass);
app.post('/chat',trade.chat);
app.post('/',user.login);
app.post('/profile',user.signUp);
app.post('/editProfile',user.editProfile);
app.post('/search',trade.search);
app.post('/toCart',trade.toCart);
app.post('/delFromCart',trade.delFromCart);

app.set('port', process.env.PORT || 8080);
app.listen(process.env.PORT || 8080);
console.log("Create server done");