const express = require('express');
const { accountController, adminController } = require('../controllers');
const { upload } = require('../controllers/image.controller');


const router = express.Router();
router
  .route('/')                               // status     route     privilages
  .post(upload.single('image'),accountController.updateAccount)    //ok          private   staff
  .get(accountController.getAccounts);      //ok          public    none

router
  .route('/get')
  .get(accountController.getAccount);       //ok          private    staff

router
  .route('/search')
  .get(accountController.search);           //ok        public   none

router
  .route('/subjects')
  .get(accountController.getSubjects);
module.exports = router;
