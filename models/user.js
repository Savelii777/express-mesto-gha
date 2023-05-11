const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимум 2 символа.'],
    maxlength: [30, 'Максимум 30 символов.'],
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'Минимум 2 символа.'],
    maxlength: [30, 'Максимум 30 символов.'],
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
