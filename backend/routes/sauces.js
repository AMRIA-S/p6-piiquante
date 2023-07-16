const express = require('express');
const routeSauces = express.Router();

const auth = require('../midleware/auth');
const ctrlSauce = require('../controllers/sauces');
const multer = require('../midleware/multer');

routeSauces.get('/api/sauces',auth, ctrlSauce.getAll);
routeSauces.post('/api/sauces', auth, multer, ctrlSauce.create);


module.exports = routeSauces;