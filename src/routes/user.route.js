const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validators/user.validator');

const router = express.Router();

router.post('/sign-up', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

module.exports = router;
