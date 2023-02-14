const jwt = require('jsonwebtoken');
const { JWT_SECRET='95958be621a6bbfafe1c636048f8b91bad946057e85c63dda1a2d0f68a96c67f' } = process.env;
const AuthError = require("../errors/auth-err");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Authorization Required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (next) {
    return next(new AuthError('Authorization Required'));
  }

  req.user = payload;

  return next();
};