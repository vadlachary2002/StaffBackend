const { userService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const login = catchAsync (async(req,res)=>{
  const { code, info } = await userService.login(req.body);
  res.status(code).json(info);
})

const updatePassword = catchAsync(async(req,res)=>{
  const { code, info } =  await userService.updatePassword(req.body);
  res.status(code).json(info);
})

module.exports = { login, updatePassword }