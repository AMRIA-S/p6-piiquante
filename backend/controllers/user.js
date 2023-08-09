const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Variable du fichier .env
require('dotenv').config()
const AUTH_TOKEN = process.env.AUTH_TOKEN;


// Exportation de la fonction signUp
exports.signUp = (req, res, next) => {
    // Function hash pour scripter le mot de passe
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        // création d'un tableau objet User avec email et password
        const user = new User({
          email: req.body.email,
          password: hash
        });
        // Méthode save pour sauvegarder
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.log = (req, res, next) => {
    // Recherche email
    User.findOne({ email: req.body.email })
        .then(user => {
            // Si email n'existe pas => erreur
            if (!user) {
                return res.status(400).json({ message: 'Identifiant ou mot de passe incorrect'});
            }
            
            // Sinon comparer les mots de passe
            bcrypt.compare(req.body.password, user.password)
            
                .then(valid => {
                    // Si mdp pas correct => erreur
                    if (!valid) {
                        return res.status(400).json({ message: 'Identifiant ou mot de passe incorrect' });
                    }
                    // Sinon recup token et id
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            AUTH_TOKEN,
                            { expiresIn: '12h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };