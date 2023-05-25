const jwt = require('jsonwebtoken');
const AuthorizedError = require('../errors/AuthorizedError');

const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9ieyJ';
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    return next(new AuthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
