var express=require('express');
var app=express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var user = require('./route/user');
var index= require('./route/index');
var SqlString = require('sqlstring');
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

app.get('/',index.index);
app.post('/',user.login);
app.post('/profile',user.signUp);
//
//app.get('/login',user.login);
app.set('port', process.env.PORT || 8080);
app.listen(process.env.PORT || 8080);
console.log("Create server done");