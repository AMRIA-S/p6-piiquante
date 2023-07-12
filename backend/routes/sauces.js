const express = require('express');
const routeSauces = express.Router();

const auth = require('../midleware/auth');
const ctrlSauce = require('../controllers/sauces');

routeSauces.get('/api/sauces',auth, ctrlSauce.getAll);


module.exports = routeSauces;