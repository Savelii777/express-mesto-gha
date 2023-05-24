const jwt = require('jsonwebtoken');
const key = 'faWQiOiI2NDA1ZWI5ZDAyNGRmMTI3ZThhNGFkZTQi'
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer '))
    return res.status(401).send({ message: 'Необходима авторизация' });

  try {
    req.user = jwt.verify(authorization.replace('Bearer ', ''), key);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  return next();
};