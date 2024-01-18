const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yourwaycarhire@gmail.com',
        pass: 'sqvm jlqn xsis ysfn'
    }
});

// User Signup
const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
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
    console.log(req.body);
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not exists!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect Password!' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            '159abr',

            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err);
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

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        console.log(req.body);
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }



        // Send the new password to the user's email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'yourwaycarhire@gmail.com',
                pass: 'sqvm jlqn xsis ysfn'
            }
        });
        const mailOptions = {
            from: 'yourwaycarhire@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            html: `
                <p>Hello ${user.firstName},</p>
                <p>We received a request to reset your password.</strong></p>
                <p>Click the button below to reset your password:</p>
                <a href="https://rent-a-car-1nsj.onrender.com/${user._id}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p>Best regards,<br>Your Way Car Hire</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending email' });
            }
            console.log('Email sent: ' + info.response);
            res.json({ message: ' Check your email to set the new password.' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const changePassword = async (req, res) => {
    try {
        console.log('changing Pasword');
        console.log(req.params);
        console.log(req.body);
        let user = await User.findById(req.params.userId);
        // Generate a new random password
        const { newPassword } = req.body;


        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Save the new password to the user
        await user.save();

        res.status(200).send({
            status: true, message: "The Password is changed!", data: user
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });

    }
}

const sendMessage = async (req, res) => {
    console.log(req.body);
    try {
        
   

    const mailOptions = {
        from: 'yourwaycarhire@gmail.com',
        to: 'naumanahmed449@gmail.com',
        subject: `${req.body.subject}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Message Form User</title>
                <style>
                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }
                    img {
                        width: 100%;
                    }
    
                    th, td {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 8px;
                    }
                </style>
            </head>
            <body>
                <h1>Message From User</h1>
    
                <p>A new message has been received from the website contact form. Details are as follows:</p>
    
                <table>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                    <tr>
                        <td>Full Name</td>
                        <td>${req.body.fullName}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>${req.body.phone}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>${req.body.email}</td>
                    </tr>
                    <tr>
                        <td>Subject</td>
                        <td>${req.body.subject}</td>
                    </tr>
                    <tr>
                        <td>Short Notes</td>
                        <td>${req.body.shortNotes}</td>
                    </tr>
                </table>
    
                
            </body>
            </html>
        `,
    };


    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            res.status(500).send({ status: false, message: 'Internal server error' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({
                status: true,
                message: 'The Message is Sended!',
            });
        }
    });
} catch (error) {
    res.status(500).json({ error: 'Server error' });
}}

module.exports = { signup, login, logout, getUserData, forgotPassword, changePassword, sendMessage };
