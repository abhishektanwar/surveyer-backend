//here in line 4 we are using commonjs modules
// commonjs is a system implemented in nodejs for requiring and sharing
// code b/w different files
const express = require('express');

// import express from 'express' -> this uses ES2015/ES6 modules, nodejs does not have
// support for ES2015 modules
// there could be multiple apps aswell 
require('./models/User')
// here we are not exporting anything from passport.js file,
// so we dont need to save it in a variable.Also by this statement we mean just
// execute this file

require('./services/passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require("./config/keys")

const authRoutes = require('./routes/authRoutes')
mongoose.connect(keys.mongoURI).then((result) => console.log("connected to db")).catch((err) => console.log(err))
const app = express();

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // time in milli seconds,
  keys: [keys.cookieKey]
})
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);


// app.get('/', (req, res) => {
//   res.send({ bye: 'buddy' })
// });

// clientId 
// client secret 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

const PORT = process.env.PORT || 5000;
// express listening for requests on post 5000
app.listen(PORT);