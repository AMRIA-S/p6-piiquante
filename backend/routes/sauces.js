const express = require('express');
const routeSauces = express.Router();

const auth = require('../midleware/auth');
const ctrlSauce = require('../controllers/sauces');
const multer = require('../midleware/multer');

routeSauces.get('/', auth, ctrlSauce.getAll);
routeSauces.post('/', auth, multer, ctrlSauce.create);
routeSauces.get('/:id', auth, ctrlSauce.getOne);
routeSauces.put('/:id', auth, multer, ctrlSauce.modify);
routeSauces.delete('/:id', auth, ctrlSauce.delete);
routeSauces.post('/:id/like', auth, ctrlSauce.likeSauces);


module.exports = routeSauces;