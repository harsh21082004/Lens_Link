const route = require('express').Router();

const { SignUp, Login, SocialLogin } = require('../controllers/user.controller');

route.post('/signup', SignUp);
route.post('/login', Login);
route.post('/social-login', SocialLogin)

module.exports = route;