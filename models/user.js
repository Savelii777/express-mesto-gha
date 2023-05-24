 const bcrypt = require('bcrypt');
 const isEmail = require('validator/lib/isEmail');
 const isURL = require('validator/lib/isURL');
 const mongoose = require('mongoose');
 const userSchema = new mongoose.Schema({
   name: {
     type: String,
     default: 'Равшан',
     minlength: [2, 'Должно быть минимум 2 символа'],
     maxlength: [30, 'Должно быть максимум 30 символов'],
   },
   about: {
     type: String,
     default: 'Гастарбайтер',
     minlength: [2, 'Должно быть минимум 2 символа'],
     maxlength: [30, 'Должно быть максимум 30 символов'],
   },
   avatar: {
     type: String,
     required: false,
     default: 'https:demotivation.ru/wp-content/uploads/2020/03/24.jpg',
     validate: [isURL, 'Неправильный формат ссылки'],
   },
   email: {
     type: String,
     required: true,
     unique: true,
     validate: [isEmail, 'Неправильный формат почты'],
   },
   password: {
     type: String,
     required: true,
     select: false,
   },
 }, {
   toJSON: {
     transform: (doc, ret) => {
       delete ret.password;

       return ret;
     },
   },
 });

 userSchema.statics.findUserByCredentials = function (email, password) {
   return this.findOne({ email }).select('+password')
     .then((user) => bcrypt.compare(password, user.password)
       .then((matched) => {
         if (!matched) {
           return Promise.reject(new Error('Неправильные почта или пароль'));
         }

         return user;
       }))
     .catch((err) => {
       if (err.name === 'CastError') {
         return Promise.reject(new Error('Неправильные почта или пароль'));
       }

       return Promise.reject(err);
     });
 };

 module.exports = mongoose.model('User', userSchema);