// Importation d'Express et son utilisation
const express = require('express')
const helmet = require('helmet');
const app = express();

// Import des fichiers dans le dossier "/routes"
const userRoute = require('./routes/user');
const routeSauces = require('./routes/sauces');

// Pour éviter les erreurs CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use(helmet.contentSecurityPolicy({
  crossOriginResourcePolicy: false
}));

// Importation chemin (path)
const path = require('path');
// Chemin statique des images
app.use('/images', express.static(path.join(__dirname, "images")));


// Route Utilisées
app.use('/api/auth', userRoute);
app.use('/api/sauces', routeSauces);

require('dotenv').config()
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGO_PROJECT = process.env.MONGO_PROJECT;


// Importation de mongoose et connexion à MongoDb
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGO_PROJECT}.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connecté à Mongoose'))
  .catch(() => console.log('Erreur de connexion'));

// Exportation du fichier "App.js"
module.exports = app;