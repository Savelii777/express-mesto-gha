const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимум 2 символа.'],
    maxlength: [30, 'Максимум 30 символов.'],
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    required: true,
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: Array,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
