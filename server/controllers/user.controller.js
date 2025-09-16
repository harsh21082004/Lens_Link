const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// This requires firebase-admin to be installed on your server
// const admin = require('firebase-admin');

const SignUp = async (req, res) => {
    try {
        const { displayName, email, password, uid } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a simple unique username
        const username = email.split('@')[0] + Math.floor(Math.random() * 1000);

        const newUser = new User({
            uid: uid,
            displayName: displayName, // Ensure this matches your User schema field
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ uid: uid }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                uid: uid,
                displayName: newUser.displayName,
                username: newUser.username,
                email: newUser.email,
                photoURL: user.photoURL || ''
            }
        });
    } catch (error) {
        console.error('Error during sign up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ uid: user.uid },
            process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                uid: user.uid,
                displayName: user.displayName, // Ensure this matches your User schema field
                username: user.username,
                email: user.email,
                photoURL: user.photoURL || ''
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const SocialLogin = async (req, res) => {
    try {
        // Instead of verifying the token, we trust the data from the client after Firebase auth
        const { uid, email, displayName, photoURL } = req.body;

        let user = await User.findOne({ email });
        console.log("Social login user:", uid);

        if (!user) {
            console.log(`User not found for email ${email}. Creating new user.`);
            const randomPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);
            const username = email.split('@')[0] + Math.floor(Math.random() * 1000);

            user = new User({
                displayName,
                username,
                email,
                password: hashedPassword,
                photoURL: photoURL || '',
                uid: uid
            });
            await user.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }
        });
    } catch (error) {
        console.error('Error during social login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { SignUp, Login, SocialLogin };

