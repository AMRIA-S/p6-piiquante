// Importation d'Express et son utilisation
const express = require('express')
const app = express();

// Import des fichiers dans le dossier "/routes"
const userRoute = require('./routes/user');
const routeSauces = require('./routes/sauces');

// Importation chemin (path) et et finchier multer.js
const path = require('path');


app.use(express.json());

// Pour éviter les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Route pour s'authentifier
app.use('/api/auth', userRoute); 

app.get('/api/sauces', routeSauces);

// Chemin statique des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Importation de mongoose et connexion à MongoDb
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://amriasollene:piiquante@piiquante.8n4sb6w.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connecté à Mongoose'))
  .catch(() => console.log('Erreur de connexion'));




// Exportation du fichier "App.js"
module.exports = app;