const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const HomeSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title:{
    type: String
  },
  price:{
    type: Number
  },
  rooms:{
    type: Number
  },
  floor: {
    type: Number
  },
  city: {
    type: String
  },
  address: {
    type: String
  },
  description: {
    type: String
  },
  date:{
    type: Date,
    default: Date.now
  }
})

const Home = mongoose.model('homes', HomeSchema);
module.exports = Home;