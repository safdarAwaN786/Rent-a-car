const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Signup
const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        user = new User({
            firstName,
            lastName,
            email,
            password
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Generate JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            '159abr',
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// User Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            '159abr',
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


const getUserData = async (req, res) => {
    try {
      // Extract the user ID from the request or token
      const userId = req.user.id; // Assuming you have set the user ID in the request during authentication
  
      // Fetch user data from the database
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send the user data as a response
      const userData = user;
  
      res.json(userData);
      console.log('verified user');
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

// User Logout
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'User logged out successfully' });
    });
};

module.exports = { signup, login, logout, getUserData };
