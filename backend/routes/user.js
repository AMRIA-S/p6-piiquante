const express = require('express');
const route = express.Router();

// Import du fichier "User.js" du dossier "Router"
const userCtrl = require('../controllers/user');
const password = require('../midleware/password');

// Les route post pour la connexion ou création de compte
route.post('/signup', password, userCtrl.signUp);
route.post('/login', userCtrl.log);


module.exports = route;