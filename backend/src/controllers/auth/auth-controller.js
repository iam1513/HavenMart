const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const User = require('../../models/user')

// Register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword, // Save hashed password
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            data: newUser,
            message: "Registration Successful",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error in registration",
        });
    }
};

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

module.exports = { registerUser }