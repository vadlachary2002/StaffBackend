const { userService, accountService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const createStaff = catchAsync(async(req,res)=>{
  const { code, info } = await userService.signup(req.body);
  res.status(code).json(info);
})

const removeStaff = catchAsync(async(req,res)=>{
  const { email } = req.query;
  const { code, info } = await userService.removeUser(email);
  res.status(code).json(info);
})

const getStaffProfiles = catchAsync(async (req,res)=>{
  const {code, info} = await userService.getUsers();
  res.status(code).json(info);
})

const pauseAccount =  catchAsync(async(req,res)=>{
  const { email } =  req.body;
  const { code, info } = await userService.pauseAccount(email);
  res.status(code).json(info);
})

const resumeAccount =  catchAsync(async(req,res)=>{
  const { email } =  req.body;
  const { code, info } = await userService.resumeAccount(email);
  res.status(code).json(info);
})

const updateAccount = catchAsync(async(req,res)=>{
  const { code, info }= await accountService.updateAccountByAdmin(req.body);
  res.status(code).json(info);
})

const resetStaffPassword = catchAsync(async(req,res)=>{
  const { email } =  req.body;
  const { code, info }= await userService.resetStaffPassword(email);
  res.status(code).json(info);
})


module.exports ={ createStaff, removeStaff, getStaffProfiles, pauseAccount, updateAccount, resumeAccount, resetStaffPassword}