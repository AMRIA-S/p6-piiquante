// Importation du fichhier "App.js"
const app = require('./app');

// Création http
const http = require('http');

require('dotenv').config()
const PORT_UTILISE = process.env.PORT_UTILISE;

//const PORT = process.env.PORT;
app.set('port', process.env.PORT || PORT_UTILISE);
const server = http.createServer(app);

// Utilisation du port 3000 si il est disponible, sinon un autre port sera utilisé
server.listen(process.env.PORT || PORT_UTILISE);