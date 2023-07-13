const Sauces = require('../models/sauces');

exports.getAll = (req, res, next) => {
    Sauces.find()
        .then((sauces) => {res.status(200).json(sauces)})
        .catch( error => {res.status(500).json(error)});
};

exports.create = (req, res, next) => {
    const reqSauce = JSON.parse(req.body.sauce);
    delete reqSauce._id;
    delete reqSauce.userId;
    const sauces = new Sauces({
         ...reqSauce,
         userId: req.auth.userId,
         image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauces.save()
        .then(() => { res.status(201).json({ message: 'Sauce ajoutée'}) })
        .catch(error => { res.status(401).json({ error }) });

};