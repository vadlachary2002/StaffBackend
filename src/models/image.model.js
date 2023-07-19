const mongoose = require('mongoose');

const imageSchema =  mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  image:{
    type:String
  }

},{
  timestamps: true,
})

ImageModel = mongoose.model('image', imageSchema);

module.exports = ImageModel