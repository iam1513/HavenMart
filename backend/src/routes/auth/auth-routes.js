const express = require('express')
const { registerUser, loginUser } = require('../../controllers/auth/auth-controller')
const router = express.Router();

router.post('/register', registerUser)

router.post('/login', loginUser)
// router.get('/info', (req, res) => {
//     res.json({
//         message: "This is the auth route"
//     })
// })
module.exports = router