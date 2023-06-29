// Importation d'Express et son utilisation
const express = require('express')
const app = express();

// Import du fichier "user.js" du dossier "router"
const userRoute = require('./routes/user');

// Pour éviter les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  

  app.use('/api/auth/', userRoute), console.log('oki');

// Importation de mongoose et connexion à MongoDb
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://amriasollene:piiquante@piiquante.8n4sb6w.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion réussie'))
  .catch(() => console.log('Erreur de connexion'));


app.use(express.json());

// Exportation du fichier "App.js"
module.exports = app;