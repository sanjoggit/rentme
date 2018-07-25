const express = require('express');
const router = express.Router();
const User = require('../../models/User');
var bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res)=>res.json({name: 'sanjog'}));

// @route GET api/users/register
// @desc Register users
// @access Public
router.post('/register', (req, res)=>{
  User.findOne({email: req.body.email}).then(user=>{
    if(user){
      return res.status(400).json({email: "Email already exists"});
    } else{
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d:"monsterid" //default
      });
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10,(err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
          if(err) throw err;
          newUser.password = hash;
          newUser.save().then(user=>res.json(user)).catch(err=>console.log(err));
        })
      })
    }
  })
})

// @route GET api/users/login
// @desc Login users
// @access Public
router.post('/login', (req, res)=>{
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({email}).then(user=>{
    //check user
    if(!user){
      return res.status(404).json({email: "User not found"});
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch=>{
      if(isMatch){
        //create JWT Payload
        const payload = {id: user.id, username: user.username, avatar: user.avatar, date: user.date};
        //Sign Token
        jwt.sign(payload, 'secret', {expiresIn: 3600}, (err, token)=>{
          res.json({success: true, token: 'Bearer ' + token})
        });
      } else{
        return res.status(400).json({password: "Password Incorrect"})
      }
    })
  })
})

// @route GET api/users/current
// @desc Return Current users
// @access Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res)=>{
  res.json({
    id: req.user.id,
    username:req.user.username,
    email: req.user.email
  });
})



module.exports = router;