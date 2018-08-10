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
  phone: {
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
  },
  //can be done like this also
  // addressLatLng: {
  //   type: Map,
  //   of: Number
  // },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  homeImage: {
    type: String
  }
})

const Home = mongoose.model('homes', HomeSchema);
module.exports = Home;