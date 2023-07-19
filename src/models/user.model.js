const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    staffId:{
      type:Number,
      required:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    profileStatus:{
      type:Boolean,
      default:false
    },
    designation:{
      type:String,
      required:true,
    },
    role:{
      type:String,
      default:"user",
    },
    active:{
      type:Boolean,
      default:true,
    }
  },
  {
    timestamps: true,
  }
);


userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({email});
  return !!user;
};

userSchema.statics.getUser =  async function(email){
  const user = await this.findOne({email});
  return user;
}

userSchema.statics.isAdmin =  async function(email){
  const status = await this.findOne({'email':email,'role':'Admin'});
  return !!status;  
}

const User = mongoose.model('User', userSchema);

module.exports = User;
