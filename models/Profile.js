const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

const Profile = mongoose.model('profiles', ProfileSchema);
module.exports = Profile;