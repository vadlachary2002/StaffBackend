const { Account, User } = require("../models")

const createAccount = async(accountBody)=>{
  const account =  await Account.create(accountBody);
  if(!account) return false;
  return true;
}

const updateAccountByAdmin = async(accountBody)=>{
  const { email, name,designation} = accountBody;
  const account = await Account.findOne({email});
  account.name=name;
  account.designation=designation;
  await Account.updateOne({email},{$set:account});
  const user = await User.findOne({email});
  user.name=name;
  user.designation=designation;
  user.email=email;
  await User.updateOne({email},{$set:user});
  return {
    code:200,
    info:{
      message:"acount updated successfully"
    }
  }
}
const updateAccount = async(accountBody)=>{
  const { email, name, gender, dob, experience, qualification, subjects, field,image,about} = accountBody;
  const updatedAccount =  await Account.findOne({email});
  updatedAccount.name=name;
  updatedAccount.gender=gender;
  updatedAccount.dob=dob;
  updatedAccount.experience=experience;
  updatedAccount.qualification=qualification;
  updatedAccount.subjects=subjects;
  updatedAccount.field=field;
  updatedAccount.image=image;
  updatedAccount.about=about;
  console.log("sub",updatedAccount);
  const status = await Account.updateOne({email},{$set:updatedAccount});
  if(!status){
    return {
      code:500,
      info:{
        message:"unable to acces account",
      }
    }
  }
  await User.updateOne({email},{$set:{profileStatus:true}});
  return {
    code:200,
    info:{
      message:"Account updated successfully",
      profileStatus:true,
    }
  }
}

const getAccountDetails = async(email)=>{
  console.log("email",email);
  const exsistingUser = await User.getUser(email);
  if(!exsistingUser){
    return {
      code:401,
      info:{
        message:"user does not exist",
      }
    }
  }
  const account = await Account.findOne({email});
  if(!account){
    return {
      code:500,
      info:{
        message:"unable to acces account",
        
      }
    }
  }
  return {
    code:200,
    info:{
      profileStatus:exsistingUser.profileStatus,
      account,
    }
  }
}
const getAccounts = async()=>{
  const accounts =  await Account.find();
  return {
    code:200,
    info:{ accounts }
  }
}


const search = async(name,subject,field)=>{
  const {code, info} =  await getSubjects();
  const { subjects } = info;
  let matchField =  field?[field]:['Teaching','Non-Teaching'];
  let matchSubjects=subject?[subject]:subjects;
  const accounts = await Account.aggregate([
    {
      "$match":{
        subjects:{
          $in : [...matchSubjects]
        },
        $and:[
          {"name":{
            $regex :name?name:"" , $options:"i"
          }},
          {"field":{
            $in:[...matchField]
          } },
        ],
      }
    },
  ])
  return {
    code:200,
    info:{accounts}
  }
}


const getSubjects = async()=>{
  const subjects =  await Account.distinct("subjects");
  return{ code:200, info:{subjects}};
}

module.exports = { createAccount, getAccountDetails ,updateAccount ,updateAccountByAdmin, getAccounts, getSubjects, search}