const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys')
const mongoose = require('mongoose')
// pulling the models out of mongoose like this is better rather that 
// exporting the model class and requiring it here

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  // this user.id !== google profile.id ,rather it is the id of instance in db
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user)
    })
})
passport.use(new googleStrategy({ clientID: keys.googleClientID, clientSecret: keys.googleClientSecret, callbackURL: '/auth/google/callback', proxy: true }, async (accessToken, refreshToken, profile, done) => {
  // console.log("access", accessToken)
  // console.log("refresh", refreshToken)
  // console.log("profile", profile)

  // Whenever we interact with mongoDB/mongoose for eg ,saving instance,fetching or any opn
  // the process is always async, we get a model instance upon which 
  // further operations can be performed


  // check if this user id exists in db ,if not save to db
  const existingUser = await User.findOne({ googleId: profile.id })

  if (existingUser) {
    // we already have a record with the iven profile ID
    return done(null, existingUser);
  }
  // we dont have a user record with this id , create new record
  const newUser = await new User({ googleId: profile.id }).save()

  done(null, newUser);
  // creating a new instance of user in users collection


}));