// Importation du fichhier "App.js"
const app = require('./app');

// Création http
const http = require('http');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

// Utilisation du port 3000 si il est disponible, sinon un autre port sera utilisé
server.listen(process.env.PORT || 3000);