const mongoose = require('mongoose');

const accountSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    gender:{
      type:String,  
      enum:['male','female','others']
    },
    designation:{
      type: String,
      required:true,
    },
    branch:{
      type: String,
      default:"CSE"
    },
    dob:{
      type: Date
    },
    experience:{
      type:String
    },
    qualification:{
      type:String
    },
    subjects:{
      type:[String],
    },
    field:{
      type:String,
      enum:['Teaching','Non-Teaching']
    },
    image:{
      type:String,
      default:"./uploads/rgu-default.jpg"
    },
    about:{
      type:String,
    }
  },
  {
    timestamps: true,
  }
);

accountSchema.statics.activeFaculty = async function () {
  const faculties = await this.find({active:true});
  return faculties;
};


const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
