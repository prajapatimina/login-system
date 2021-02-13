const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const userController = require('../controllers/userController')

router.post('/signup', userController.userSignup)

router.post('/login', userController.userLogin)
module.exports = router;