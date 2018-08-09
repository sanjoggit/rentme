const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const GoogleUserSchema = new Schema({
  googleID: {
    type: String
  },
  firstName: {
    type:String
  },
  lastName: {
    type: String
  },
  image: {
    type: String
  },
  email:{
    type: String
  },
  date:{
    type: Date,
    default: Date.now
  }
})

const GoogleUser = mongoose.model('googleusers', GoogleUserSchema);
module.exports = GoogleUser;