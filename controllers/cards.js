const Card = require('../models/card');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../errors/errors_constants');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    if (!cards) {
      return res.status(NOT_FOUND).send({ message: 'Карточки не созданы' });
    }
    return res.send(cards);
  } catch (err) {
    if (err.name === 'InternalServerError') {
      return next(res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' }));
    } else {
      return next(err);
    }
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const { _id: owner } = req.user;
  try {
    const card = await Card.create({ name, link, owner });
    return res.send({
      name: card.name,
      link: card.link,
      owner: card.owner,
      likes: card.likes,
      _id: card._id,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании карточки',
        }),
      );
    } else if (err.name === 'InternalServerError') {
      return next(res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' }));
    } else {
      return next(err);
    }
  }
};

module.exports.deleteCards = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена.' });
    }
    await card.remove();
    return res.send({ data: card });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(res.status(BAD_REQUEST).send({ message: 'Передан некорректный id' }));
    } else {
      return next(err);
    }
  }
};

module.exports.putLikes = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      return res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена.' });
    }
    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(res.status(BAD_REQUEST).send({
        message: 'Переданы некорректные данные для постановки лайка.',
      }));
    }
    return next(res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' }));
  }
};

module.exports.deleteLikes = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      return res.status(NOT_FOUND).send({ message: 'Карто чка с указанным _id не найдена.' });
    }
    return res.send(card);
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        return next(
          res.status(BAD_REQUEST).send({
            message: 'Переданы некорректные данные для постановки лайка.',
          }),
        );
      case 'InternalServerError':
        return next(res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' }));
      default:
        return next(err);
    }
  }
};
