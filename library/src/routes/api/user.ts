import { Router } from 'express';
import passport from 'passport';

const User = require('../../store/schema/User');

const router = Router();

router.get('/login', (req, res) => {
  res.render('user/login', {
    title: 'Login',
  });
});

router.get(
  '/me',
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/api/user/login');
    }
    next();
  },
  (req, res) => {
    if (req.user) {
      res.render('user/profile', {
        title: 'Profile',
        user: {
          name: req.user.username,
        },
      });
    }
  }
);

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/api/user/login',
    failureFlash: true,
  }),
  function (req, res) {
    res.status(200).json({ message: 'ok' });
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

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/api/user/login');
  });
});

export default router;
