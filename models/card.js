 const mongoose = require('mongoose');
 const { isURL } = require('validator');

 const cardSchema = new mongoose.Schema({
   name: {
     type: String,
     required: true,
     minlength: 2,
     maxlength: 30
   },
   link: {
     type: String,
     required: true,
     validate: [isURL, 'Неправильный формат ссылки']
   },
   owner: {
     required: true,
     ref: 'User',
     type: mongoose.Schema.Types.ObjectId
   },
   likes: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     default: Array
   }],
   createdAt: {
     type: Date,
     default: Date.now
   },
 });

 module.exports = mongoose.model('card', cardSchema);