const express = require('express');
const router = express.Router();
const passport = require('passport');
const Home = require('../../models/Homes');


// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res)=>res.json({name: 'raj'}));

// @route GET api/profile/:id
// @desc get current user posts route
// @access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
  Home.find().then(homes=>{
    const home = homes.filter(home=>home.user.toString() === req.user.id)    
      res.json(home)
  })
}) 

// @route DELETE api/profile/:id
// @desc delete home by id
// @access private
router.delete('/:id', passport.authenticate("jwt", { session: false }), (req, res)=>{
  Home.findById(req.params.id)
  .then(home=>{
    home.remove().then(()=>res.json({success: true}));
  }).catch(err=>res.status(404).json({homenotfound: 'No home found'}))
})

module.exports = router;