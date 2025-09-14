const route = require('express').Router();

const { SignUp, Login } = require('../controllers/user.controller');

route.post('/signup', SignUp);
route.post('/login', Login);

module.exports = route;