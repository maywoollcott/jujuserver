const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send('A token is required for authentication.');
  }

  const token = authHeader.split(' ')[1];

  console.log('token is' + token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log('user is ' + req.user);
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

module.exports = authenticateToken;
