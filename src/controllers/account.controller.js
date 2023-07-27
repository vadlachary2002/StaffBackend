const { accountService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const getAccount = catchAsync(async (req,res)=>{
  const { email } = req.query;
  console.log("cok",req.cookies);
  const { code, info } = await accountService.getAccountDetails(email);
  res.status(code).json(info);
});

const updateAccount =  catchAsync(async(req,res)=>{
  const accountBody =  JSON.parse(req.body.body);
  accountBody.image = (req.file?'./uploads/'+req.file.filename:accountBody.image);
  const { code, info } = await accountService.updateAccount(accountBody);
  res.status(code).json(info);
})

const getAccounts = catchAsync(async(req,res)=>{
  const { code, info} = await accountService.getAccounts();
  res.status(code).json(info);
})

const getSubjects =  catchAsync(async(req,res)=>{
  const { code, info } = await accountService.getSubjects();
  res.status(code).json(info);
})
const search = catchAsync(async(req,res)=>{
  const { name, subject, field } = req.query;
  const { code, info } = await accountService.search(name,subject,field);
  res.status(code).json(info);
})

module.exports = { getAccount, updateAccount, getAccounts, getSubjects, search}