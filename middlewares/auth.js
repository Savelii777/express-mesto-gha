const jwt = require('jsonwebtoken');
const key = 'LCJhVJiI6IkpxdWF2IiwiaWF0IjoxNjA3MDYzMzc3fQeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI2NDA1ZWI5ZDAyNGRmMTI3ZThhNGFkZTQiLCJuYW1lIjoiSndhdXYiLCJpYXQiOjE2MDcwNjMzNzd9.P16E6tV4Ra4jBlS2igTPOWhsKsneAl_3jC3NoMeVb8g'
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