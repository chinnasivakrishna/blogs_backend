require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = "12345"

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    console.log(token)
    console.log(JWT_SECRET)
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
