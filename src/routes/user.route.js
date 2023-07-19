const express = require('express');
const { userController, adminController } = require('../controllers');

const router = express.Router();

router
  .route('/')                                    //status  route      privilages
  .get(adminController.getStaffProfiles)         //ok      private    admin
  .post(adminController.createStaff)             //ok      private    admin
  .put(adminController.updateAccount)            //ok      private    admin
  .delete(adminController.removeStaff);          //ok      private    admin

router
  .route('/deactivate')
  .post(adminController.pauseAccount);           //ok     private     admin

router
  .route('/activate')
  .post(adminController.resumeAccount);          //ok     private     admin
router
  .route('/reset')
  .post(adminController.resetStaffPassword);     //ok     private     admin
router
  .route('/login')
  .post(userController.login);                    //ok    public     staff

router
  .route('/updatepassword')
  .post(userController.updatePassword);           //ok    private     staff

module.exports = router ;