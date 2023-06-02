import express from 'express';
import { loginUser, signupUser, makePremium } from '../controllers/user.js'

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.patch('/premium/:username', makePremium)

export default router;