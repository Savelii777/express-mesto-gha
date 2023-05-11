const User = require('../models/user');
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVERE_ERROR,
} = require('../errors/errors_constants');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    if (err.name === 'InternalServerError') {
      next(
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' })
      );
    } else {
      next(err);
    }
  }
};

module.exports.postUsers = async (req, res, next) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя',
      }),
    );
  } else if (err.name === 'InternalServerError') {
    next(
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' })
    );
  } else {
    next(err);
  }
}
};

module.exports.findUsersById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Передан несуществующий в БД id' });
    }
    return res.send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      next(
        res.status(BAD_REQUEST).send({ message: 'Передан некорректный id' }),
      );
    } else {
      next(err);
    }
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Пользователь по указанному _id не найден' });
    }
    return res.send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании пользователя',
        })
      );
    } else if (err.name === 'InternalServerError') {
      next(
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' })
      );
    } else {
      next(err);
    }
  }
};

module.exports.patchUsersAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Пользователь по указанному _id не найден' });
    }
    return res.send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании пользователя',
        }),
      );
    }
    return next(
      res
        .status(INTERNAL_SERVERE_ERROR)
        .send({ message: 'Ошибка по умолчанию' }),
    );
  }
};
