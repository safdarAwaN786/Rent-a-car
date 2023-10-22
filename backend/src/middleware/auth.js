const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware function for user authentication
const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    // Extract the token without the "Bearer " prefix
    const tokenWithoutBearer = token.replace('Bearer ', '');

    // Verify the token
    const decoded = jwt.verify(tokenWithoutBearer, '159abr');

    // Find the user by the decoded token information
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Set the user in the request object for further use
    req.user = user;

    // Call the next middleware
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authMiddleware;


module.exports = authMiddleware;
