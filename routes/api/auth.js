const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/test', (req, res)=>{
  res.send('it works');
})
// @route GET api/auth/google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

// @route GET api/auth/google/callback 
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res)=> {
    console.log('test')
    // Successful authentication, redirect home.
    res.redirect('https://glacial-hamlet-49682.herokuapp.com/');
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