const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Должно быть минимум 2 символа'],
    maxlength: [30, 'Не должно быть более 30 символов'],
  },
  link: {
    type: String,
    required: true,
    validate: isURL,
  },
  owner: {
    required: true,
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardSchema);