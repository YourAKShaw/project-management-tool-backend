import express from 'express';
import UserController from '../controllers/UserController.js';

// eslint-disable-next-line new-cap
const router = express.Router();

// Route to create a new user
router.post('/auth/register', UserController.createUser);

export default router;
