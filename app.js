const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const {dbConfig, cookieConfig} = require('./config/index');
const bodyParser = require('body-parser');
const cors = require('cors');
const {localStrategyHandler, googleStrategyHandler,facebookStrategyHandler, serializeUser, deserializeUser, isValid} = require('./passport');
const mongoose = require('mongoose');
const db = mongoose.connection;
const path = require('path');


const corsOptions ={
  origin: 'http://localhost:3000'
  // credentials:true,            //access-control-allow-credentials:true
  // optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// Import the MongoDB connection setup
const { mongoDB } = require('./config/db');
app.use(express.static('public'));

app.use(session({
    secret: 'my_secret_john_bryce!$@#$',
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore(dbConfig),
    cookie: cookieConfig
  }));

app.use(passport.initialize());
app.use(passport.session());

//pasport strategy init
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use('local',
  new LocalStrategy(localStrategyHandler)
);

//import secrets
const {google} = require('./config/secrets');

passport.use('google',
  new GoogleStrategy(
    {
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: '/auth/google/callback', // Your callback URL
    },
    googleStrategyHandler
  )
);


passport.use('facebook',
  new FacebookStrategy(
    {
      clientID: 'YOUR_APP_ID',
      clientSecret: 'YOUR_APP_SECRET',
      callbackURL: '/auth/facebook/callback', // Your callback URL
    },
    facebookStrategyHandler
  )
);

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// const chordsRouter = require('./routes/chordsRouter');
const authorRouter = require('./routes/authorRouter');
const songsRouter = require('./routes/songsRouter');
const userRouter = require('./routes/userRouter');


const port = process.env.PORT || 3030;




db.once('open', function() {
    console.log('Connected!');
    app.listen(port, () => {
        console.log('Server is up and running on port numner ' + port);
    });
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/logout', (req, res)=>{
  req.logOut(passport.LogOutOptions, (err) => {
    console.log(err)
  });
  res.redirect('/')
});

// Local authentication routes
app.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/',
    })
  );

// Google authentication routes
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }), (req, res)=>{
    res.token = req.user;
    res.send(200);
  }
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    // successRedirect: '/profile',
    failureRedirect: '/',
  }), (req, res)=>{
    // console.log(req);
    res.redirect('http://localhost:3000/profile');
  }
);

// Facebook authentication routes
app.get('/auth/facebook', passport.authenticate('facebook'));
  
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/',
  })
);


app.get('/isLogIn',(req, res)=>{
  res.send(req.isAuthenticated());
})
// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/google'); // Redirect to Google login if not authenticated
}

// Profile route
app.get('/profile', async (req, res) => {
  res.send(req.user);
});
//author router
app.use('/authors', authorRouter);
// //chords router
// app.use('/chords', chordsRouter);
//songs router
app.use('/songs', songsRouter);


//user router
app.use('/user', userRouter);