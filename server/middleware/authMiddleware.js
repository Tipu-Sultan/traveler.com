const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  const bearerToken = token.split(' ')[1];  // Extract the token part after 'Bearer'
  if (!bearerToken) return res.status(401).json({ message: 'Invalid token format' });

  try {
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decoded;  // Assign the entire decoded payload to req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};



module.exports = auth;
