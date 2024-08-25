// const jwt = require('jsonwebtoken');
// const User = require('../Model/User');

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.status(401).json({ message: 'Unauthorized' });

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
//     if (err) return res.status(403).json({ message: 'Forbidden' });

//     // Attach user to request object
//     req.user = await User.findById(user.id);
//     next();
//   });
// };

// module.exports = authenticateToken;
