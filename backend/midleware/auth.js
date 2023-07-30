const jwt = require('jsonwebtoken');

// Variable du fichier .env
require('dotenv').config()
const AUTH_TOKEN = process.env.AUTH_TOKEN;


module.exports = (req, res, next) => {
    // Pour éviter les pb
    try {
        // Fonction split pour récup les infos dans le header
        const token = req.headers.authorization.split(' ')[1];
        // Recup token avec le code crypter
        // Vrify pour vérifier la validité du token
        
        const decodeToken = jwt.verify(token, AUTH_TOKEN);
        
        const userId = decodeToken.userId;
        req.auth = {
            userId: userId
        }
        next();
    } catch (error){
        res.status(401).json({ error })
    }
}