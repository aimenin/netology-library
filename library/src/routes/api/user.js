const express = require('express');
const passport = require('passport');

const User = require('../../store/schema/User');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('user/login', {
    title: 'Login',
  });
});

router.get('/me', (req, res) => {
  res.render('user/profile', {
    title: 'Profile',
  });
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
  }),
  function (req, res) {
    res.redirect('/');
  }
);

router.post('/signup', (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.json({
          success: false,
          message: 'Your account could not be saved. Error: ' + err,
        });
      } else {
        req.login(user, (er) => {
          if (er) {
            res.json({ success: false, message: er });
          } else {
            res.json({ success: true, message: 'Your account has been saved' });
          }
        });
      }
    }
  );
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.post('/login', (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: 'test@mail.ru' });
});

module.exports = router;
