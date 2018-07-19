const express = require('express');
const router = express.Router();
const Home = require('../../models/Homes');
const passport = require('passport');


// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res)=>res.json({name: 'sanjog'}));

// @route POST api/posts
// @desc create posts 
// @access private
router.post('/', passport.authenticate("jwt", { session: false }), (req, res)=>{
  const newPost = new Home({
    user: req.user.id,
    title: req.body.title,
    price: req.body.price,
    rooms: req.body.rooms,
    floor: req.body.floor,
    city: req.body.city,
    address: req.body.address,
    description: req.body.desc
  });
  newPost.save().then(post=>res.json(post)).catch(err=>console.log(err));
});

// @route GET api/posts
// @desc get posts 
// @access public
router.get('/', (req, res)=>{
  Home.find()
    .sort({date: -1})
    .then(homes=>res.json(homes))
    .catch(err=>res.status(404).json({nohomesfound: "No homes found"}));
})

module.exports = router;