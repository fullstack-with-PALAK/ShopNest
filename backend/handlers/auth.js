const bcrypt = require('bcryptjs');
const User = require('../schemas/users');
const { generateToken } = require('./jwts');
const { isDemoMode } = require('../mockData');

const signup = async (req, res) => {
    // Disable signup in demo mode
    if (isDemoMode()) {
        return res.status(200).json(['Demo Mode', 'Registration disabled in demo mode']);
    }
    
    const salt = 10;
    const { name, email, role, password } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json(['Error', `User with email ${email} already exists`]);
        }
        
        const newUser = new User({
            name,
            email,
            role,
            password: hashedPassword
        });
        
        await newUser.save();
        res.status(200).json(['Success', 'You have signed up successfully']);
    } catch (error) {
        console.log(error);
        res.status(500).json(['Error', 'Error creating user']);
    }
};

const login = async (req, res) => {
    // Disable login in demo mode
    if (isDemoMode()) {
        return res.status(200).json(['Demo Mode', 'Login disabled in demo mode. Browse products freely!']);
    }
    
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(400).json(['Error', 'User not found']);
        }
        
        const match = await bcrypt.compare(req.body.password, user.password);
        
        if (match) {
            const token = generateToken(user);
            res.status(200)
                .cookie('token', token, { httpOnly: true })
                .json(['Success', 'You have logged in successfully']);
        } else {
            res.status(400).json(['Error', 'Invalid credentials']);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(['Error', 'Login failed']);
    }
};

module.exports = { signup, login };
