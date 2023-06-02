const express = require('express');
const {
  loginUser,
  signupUser,
  makePremium
} = require('../controllers/user.js');


const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.patch('/premium/:username', makePremium)

module.exports = router;