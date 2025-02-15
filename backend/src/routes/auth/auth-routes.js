const express = require('express')
const { resgisterUser } = require('../../controllers/auth/auth-controller')
const router = express.Router();

router.post('/register', resgisterUser)

module.exports = router