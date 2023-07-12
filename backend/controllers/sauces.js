const Sauces = require('../models/sauces');

exports.getAll = (req, res, next) => {
    Sauces.find()
        .then((sauces) => {res.status(200).json(sauces)})
        .catch( error => {res.status(500).json(error)});
};