require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  isTutor: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_PRIVATE_KEY
  );
};

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().min(3).max(255).email(),
    password: Joi.string().min(6).max(255).required(),
    isTutor: Joi.boolean().required(),
  });

  return schema.validate(user);
};

const validateLogin = (userInfo) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(userInfo);
};

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.validate = validate;
module.exports.validateLogin = validateLogin;
