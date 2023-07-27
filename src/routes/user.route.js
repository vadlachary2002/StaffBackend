const express = require('express');
const { userController, adminController } = require('../controllers');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router
  .route('/')                                                              // status  route      privilages
  .get(authenticate,adminController.getStaffProfiles)                                   // ok      private    admin
  .post(authenticate,adminController.createStaff)                                       // ok      private    admin
  .put(authenticate,adminController.updateAccount)                                      // ok      private    admin
  .delete(authenticate,adminController.removeStaff);                                    // ok      private    admin

router
  .route('/deactivate')
  .post(authenticate,adminController.pauseAccount);                        // ok     private     admin

router
  .route('/activate')
  .post(authenticate,adminController.resumeAccount);                       // ok     private     admin
router
  .route('/reset')
  .post(authenticate,adminController.resetStaffPassword);                  // ok     private     admin
router
  .route('/login')
  .post(userController.login);                                             // ok    public     staff

router
  .route('/updatepassword')
  .post(authenticate, userController.updatePassword);                     // ok    private     staff

module.exports = router ;