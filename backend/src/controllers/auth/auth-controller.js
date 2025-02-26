const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const User = require('../../models/user')

// Register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // Check if user already exists
        const checkUser = await User.findOne({ email })

        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            })
        }

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
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(200).json({
                success: false,
                message: "User does not exist with this email."
            });
        }

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) {
            return res.status(200).json({
                success: false,
                message: "Invalid password. Please try again."
            });
        }

        const token = jwt.sign(
            { id: checkUser._id, role: checkUser.role, email: checkUser.email },
            'CLIENT_SECRET_KEY',
            { expiresIn: '1h' }
        );

        return res
            .cookie('token', token, { httpOnly: true, secure: false })
            .json({
                success: true,
                message: "Login Successful",
                user: {
                    email: checkUser.email,
                    role: checkUser.role,
                    id: checkUser._id
                }
            });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Error in login part"
        });
    }
};

// logout
const logoutUser = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "Logout Successful"
    });
}

// Auth middleware
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user"
        })
    }

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized user"
        })
    }
}

module.exports = { registerUser, loginUser, logoutUser, authMiddleware }