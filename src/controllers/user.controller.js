const config = require("../config/config");
const moment = require("moment");
const { userService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const login = catchAsync (async(req,res)=>{
  const { code, info } = await userService.login(req.body);
  const options = {
    expires: new Date(moment (Date.now()).add(config.tokenExpiryDays,'days')),
    httpOnly: false,
    secure: false,
  }
  const { email, staffId, token } =  info;
  res
    .cookie('email',email,{httpOnly:true})
    .cookie('staffId',staffId,{httpOnly:true})
    .cookie('jwtoken',token,{httpOnly:false});
  res.status(code).json(info);
})

const logout = catchAsync(async(req,res)=>{
  const { email, staffId, jwtoken } = req.cookies;
  email && res.clearCookie('email',{path:'/'});
  staffId && res.clearCookie('staffId',{path:'/'});
  jwtoken && res.clearCookie('jwtoken',{path:'/'});
})

const updatePassword = catchAsync(async(req,res)=>{
  const { code, info } =  await userService.updatePassword(req.body);
  res.status(code).json(info);
})

module.exports = { login, updatePassword, logout }