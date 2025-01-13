import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, deleteUser } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

// /api/users/delete/:userId
router.route('/delete/:userId').delete(deleteUser);

export default router;