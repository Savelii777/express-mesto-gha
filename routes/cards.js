const { celebrate, Joi } = require('celebrate');
const express = require('express');

const router = express.Router();

const {
  getCards,
  createCard,
  deleteCards,
  putLikes,
  deleteLikes,
} = require('../controllers/cards');
const { URL_CHECK } = require('../utils/constants');

router.get('/cards', getCards);

router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().required().regex(URL_CHECK),
    }),
  }),
  createCard,
);

router.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteCards,
);

router.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  putLikes,
);

router.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteLikes,
);

module.exports = router;
