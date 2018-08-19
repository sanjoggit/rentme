const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleUser = require('../../models/GoogleUser');

router.get('/test', (req, res)=>{
  res.send('it works');
})
// @route GET api/auth/google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

// @route GET api/auth/google/callback 
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res)=> {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
    console.log(req.user)
  });

// @route GET api/auth/verify
router.get('/verify', (req, res)=>{
  if(req.user){
    console.log(req.user);
  } else{
    console.log('Not Auth')
  }
})

// @route GET api/auth/logout
router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/');
})

module.exports = router;