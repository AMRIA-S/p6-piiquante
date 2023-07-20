const express = require('express');
const routeSauces = express.Router();

const auth = require('../midleware/auth');
const ctrlSauce = require('../controllers/sauces');
const multer = require('../midleware/multer');

routeSauces.get('/api/sauces',auth, ctrlSauce.getAll);
routeSauces.post('/api/sauces', auth, multer, ctrlSauce.create);
routeSauces.get('/api/sauces/:id', auth, ctrlSauce.getOne);
// routeSauces.put('/api/sauces/:id', auth, multer, ctrlSauce.modify);
routeSauces.delete('/api/sauces/:id', auth, ctrlSauce.delete);


module.exports = routeSauces;