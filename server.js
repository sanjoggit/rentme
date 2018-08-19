const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const keys = require('./config/keys');
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());


//connection to MongoDB
mongoose
  .connect(keys.mongoDBConnect)
  .then(()=>console.log('MongoDB Connected'))
  .catch(err=>console.log(err));

app.use('/uploads', express.static('uploads'));

//passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);
require('./config/passportGoogle')(passport);

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

//Passport Middleware
// app.use(passport.initialize());
app.use(passport.session());

//Set global vars
app.use((req, res, next)=>{
  res.locals.user = req.user || null;
  next();
})



//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/auth', auth);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res)=>{
    res.send(path.join(__dirname, 'client/build/index.html'));
  })
}

//process.env.PORT is for deploying and 5000 for local
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server running");
});