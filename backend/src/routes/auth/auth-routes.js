const express = require('express')
const { registerUser } = require('../../controllers/auth/auth-controller')
const router = express.Router();

router.post('/register', registerUser)
// router.get('/info', (req, res) => {
//     res.json({
//         message: "This is the auth route"
//     })
// })
module.exports = router