const express = require("express");
const bodyParser = require("body-parser"); 
const port = process.env.PORT || 1234;
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();  //compulsory so that control can use next middleware
  })

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req,res) => res.send("Welcome " + req.query.username + "!!"));
app.get('/error', (req ,res) => res.send("Username and password is wrong !!!"));


passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  

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

passport.use(new LocalStrategy(
    function (username, password, done) {
        UserDetails.findOne({
            username: username
        }, function(err, user) {
            if(err) {
                return done(err);
            }

            if(!user){
                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false);
            }

            return done(null, user);
        });
    }
));

app.post('/', 
    passport.authenticate('local', { failureRedirect: '/error'}),
    function(req, res) {
        res.redirect('/success?username=' + req.user.username);
    });


app.get('/', (req, res)=> {
    res.sendFile('index.html', { root: __dirname 
        // + '/public/' 
    })
});

// app.use(express.static("public"));




app.listen(port , () => console.log(` server running on port  ${port}...`));
