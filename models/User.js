const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({  
  username:{
    type: String,
    unique: true
  },
  email:{
    type: String
  },
  password:{
    type: String
  },
  avatar:{
    type: String
  },
  date:{
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('users', UserSchema);
module.exports = User;