const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('./routes/auth');
const app = express();

app.use(cors());

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure',
  })
);

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

require('./startup/db')();
require('./startup/routes')(app);

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
