import express from 'express';
import userCTRL from '../controllers/userControllers.mjs';

const router = express.Router();

// @desc: Get All Users
// @path: /api/user
// @access: Public
router.route('/').get(userCTRL.getAllUsers).post(userCTRL.createUser);

// @desc: Get ONE Users
// @path: /api/user/:id
// @access: Public
router
  .route('/:id')
  .get(userCTRL.getOneUser)
  .patch(userCTRL.editUser)
  .delete(userCTRL.deleteUser);

export default router;
