const express = require("express");
const bodyParser = require("body-parser"); 
const port = process.env.PORT || 1234;
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport,initilize());
app.use(passport.session());

app.get('/success', (req,res) => res.send("Welcome " + req.query.username + "!!"));
app.get('/error', (req ,res) => res.send("error logging in"));


passport.deserializeUser(function (id, cb){
    User.findById(id, function(err, user){
        cb(err, user);
    });
})

mongoose.connect('mongodb://localhost/MyDatabase');

const Schema = mongoose.Schema;

const UserDetail = new Schema({
    username: String,
    password: String
});

const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

// app.get('/', (req, res)=> {
//     res.sendFile('index.html', { root: __dirname})
// });

app.use(express.static("public"));


app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();  //compulsory so that control can use next middleware
  })

app.listen(port , () => console.log(` server running on port  ${port}...`));
