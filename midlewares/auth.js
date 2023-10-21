const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/User');



exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    jwt.verify(token, config.jwtSecret, async (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      let role = await User.findById(user.id);
      req.user = role;
      next();
    });
}
