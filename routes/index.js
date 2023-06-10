const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { URL_CHECK } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(URL_CHECK),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.use(auth);

router.use('/', usersRoutes);
router.use('/', cardsRoutes);

router.use((req, res, next) => next(new NotFoundError('Неправильный путь')));

module.exports = router;
