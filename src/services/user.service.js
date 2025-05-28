const config = require("../config/config");
const { User, Account } = require("../models")
const bcryptjs = require('bcryptjs');
const jwt  = require("jsonwebtoken");
const { createAccount } = require("./account.service");

const signup = async (userBody)=>{
  const { name, email , designation} = userBody;
  const isEmailExist = await User.isEmailTaken(email);
  if(isEmailExist){
    return {
      code:401,
      info:{
        message:"Email already exist",
      },
    }
  }
  console.log(config.defaultPassword);

  const hashedPassword = await bcryptjs.hash(config.defaultPassword,10);
  let lastUser;
  let nid;
  try{
    lastUser =  await User.find().sort({staffId:-1}).limit(1);
    console.log(lastUser);
    nid=lastUser[0].staffId+1;
  }catch(e){
    nid=10;
  }
  console.log(nid);
  const newStaffId =  "RGUCSE-"+nid;
  const updatedUserBody = {
    name:name,
    email:email,
    staffId:nid,
    password:hashedPassword,
    designation:designation,
  }
  const user = await User.create(updatedUserBody);
  const account =  await createAccount({
    email:email,
    name:name,
    designation:designation
  })
  if(!user || !account){
    return {
      code:400,
      info:{
        message:"Something went wrong",
      }
    }
  }
  return {
    code:200,
    info:{
      message:"Staff Created Succesfully",
    }
  }
}

const login =  async (userBody)=>{
  const { staffId, password } = userBody;
  console.log(staffId);
  const decryptedId=  staffId.split("-");
  if(decryptedId[0]!="RGUCSE"){
    return {
      code:401,
      info:{
        message:"User ID is wrong",
      }
    }
  }
  let exsistingUser = await User.findOne({staffId:decryptedId[1]});
  if(!exsistingUser){
    exsistingUser = await User.findOne({staffId:decryptedId[1]});
  }
  const matchPassword = await bcryptjs.compare(password,exsistingUser.password);
  if(!matchPassword){
    return {
      code:400,
      info:{
        message:"Incorrect password"
      }
     };
  }
  const defaultMatch = await bcryptjs.compare(config.defaultPassword,exsistingUser.password);
  const isAdmin =  await User.isAdmin(exsistingUser.email);
  const token = jwt.sign({email : exsistingUser.email, staffId },config.jwtkey);
  return {
    code:200,
    info:{
      message:"Successfully Logged In",
      profileStatus:exsistingUser.profileStatus,
      shouldChangePassword:!!defaultMatch,
      isAdmin,
      email:exsistingUser.email,
      staffId:exsistingUser.staffId,
      token
    }
  }
}

const updatePassword = async(userBody)=>{
  const { email, oldPassword, newPassword } =  userBody;
  const exsistingUser = await User.getUser(email);
  if(!exsistingUser){
    return {
      code:401,
      info:{
        message:"User Does Not Exist",
      }
    }
  }
  const matchPassword = await bcryptjs.compare(oldPassword,exsistingUser.password);
  if(!matchPassword){
    return {
      code:400,
      info:{
        message:"Incorrect password"
      }
     };
  }
  const hashedPassword = await bcryptjs.hash(newPassword,10);
  const updatedUser = await User.updateOne({email},{$set:{password:hashedPassword}});
  if(!updatedUser){
    return {
      code:400,
      info:{
        message:"Something went wrong",
      }
    }
  }
  return {
    code:200,
    info:{
      message:"Updated password succesfully",
    }
  }


}
const getUsers =  async ()=>{
  const users = await User.find();
  return {code:200,info:{users}};
}

const removeUser = async(email)=>{
  await User.deleteOne({email});
  await Account.deleteOne({email});
  return {
    code:200,
    info:{
      message:"Removed Staff "+email+" successfully"
    }
  }
}
const pauseAccount =  async(email)=>{
  const pausedAccount =  await User.updateOne({email},{$set:{active:false}});
  if(!pausedAccount){
    return {
      code:400,
      info:{
        message:"Something went wrong"
      }
    }
  }
  return {
    code:200,
    info:{
      message:"Account paused successfully"
    }
  }
}

const resumeAccount =  async(email)=>{
  const resumedAccount =  await User.updateOne({email},{$set:{active:true}});
  if(!resumedAccount){
    return {
      code:400,
      info:{
        message:"Something went wrong"
      }
    }
  }
  return {
    code:200,
    info:{
      message:"Account activated successfully"
    }
  }
}

const resetStaffPassword =  async(email)=>{
  const hashedPassword = await bcryptjs.hash(config.defaultPassword,10);
  const updatedUser = await User.updateOne({email},{$set:{password:hashedPassword}});
  if(!updatedUser){
    return {
      code:400,
      info:{
        message:"Something went wrong"
      }
    }
  }
  return {
    code:200,
    info:{
      message:"Password reseted successfully"
    }
  }
}

module.exports = { signup ,login, getUsers, updatePassword, removeUser, pauseAccount, resumeAccount, resetStaffPassword}
