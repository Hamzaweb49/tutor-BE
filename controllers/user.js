const { User, validate, validateLogin } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
  const { error } = validate(_.pick(req.body, ['name', 'email', 'password']));

  // if validation failed
  if (error) return res.status(400).json({ message: error.details[0].message });

  // check if the user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: 'User already exists!' });

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  try {
    await user.validate();
  } catch (err) {
    let errors = [];
    for (let key in err.errors) errors = [...errors, err.errors[key].message];
    return res.status(400).send(errors);
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  const token = user.generateAuthToken();

  res
    .status(201)
    .header('x-auth-token', token)
    .json(_.pick(user, ['_id', 'name', 'email']));
};

const login = async (req, res) => {
  const { error } = validateLogin(_.pick(req.body, ['email', 'password']));

  // if validation failed
  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  const token = user.generateAuthToken();

  res.status(200).json({ token });
};

module.exports = { signUp, login };
