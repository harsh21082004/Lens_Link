const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
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
        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email, profilePicture: user.profilePicture }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const SocialLogin = async (req, res) => {
    try {
        const { idToken } = req.body;

        // 1. Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { email, name, picture } = decodedToken;

        // 2. Check if the user already exists in your MongoDB
        let user = await User.findOne({ email });

        // 3. If user doesn't exist, create a new one
        if (!user) {
            // We use a random password because this user will only log in via social media
            const randomPassword = Math.random().toString(36).slice(-8);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(randomPassword, salt);

            // Create a username from the email
            const username = email.split('@')[0];

            user = new User({
                displayName: name,
                username: username,
                email,
                password: hashedPassword, // User will not use this password
                profilePicture: picture || '',
            });
            await user.save();
        }

        // 4. Create your backend's own JWT for the user
        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET, { expiresIn: '7d' }); // Longer expiry for social logins

        // 5. Send the token and user data back to the app
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email,
                profilePicture: user.profilePicture
            }
        });

    } catch (error) {
        console.error('Error during social login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { SignUp, Login, SocialLogin };