const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
const GoogleUser = require('../models/GoogleUser');


module.exports = function(passport){
  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/api/auth/google/callback",
    proxy:true
  },
  (accessToken, refreshToken, profile, done)=>{
    // console.log('accessToken', accessToken);
    // console.log('profile', profile);
    const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
    
    const newUser = {
      googleID: profile.id,
      firstName: profile.name.givenName,
      lastname: profile.name.familyName,
      email: profile.emails[0].value,
      image: image
    }

    //check for existing user
    GoogleUser.findOne({
      googleID: profile.id
    }).then(user=>{
      if(user){
        //return user
        done(null, user);
      } else{
        //create user
        new GoogleUser(newUser).save().then(user=>done(null, user));
      }
    })
  }
));

passport.serializeUser((user, done)=>{
  done(null, user.id);
})

passport.deserializeUser((id, done)=>{
  GoogleUser.findById(id).then(user=>done(null ,user));
})
} 