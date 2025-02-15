const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
// Register

const resgisterUser = async (req, res) => {
    const { userName, email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            userName, email, hashedPassword
        })

        await newUser.save()

        res.status(200).json(
            {
                success: true,
                message: "Registration Successfull"
            }
        )
    } catch (e) {
        console.log(e)
        res.status(500).json(
            {
                success: false,
                message: "Error in registration part"
            }
        )
    }
}

// login
const login = async (req, res) => {
    const { email, password } = req.body

    try {

    } catch (e) {
        console.log(e)
        res.status(500).json(
            {
                success: false,
                message: "Error in registration part"
            }
        )
    }
}

module.exports = { resgisterUser }