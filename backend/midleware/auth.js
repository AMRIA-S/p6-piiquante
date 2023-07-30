const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Pour éviter les pb
    try {
        // Fonction split pour récup les infos dans le header
        const token = req.headers.authorization.split(' ')[1];
        // Recup token avec le code crypter
        // Vrify pour vérifier la validité du token
        const decodeToken = jwt.verify(token, 'CLE_SECRETE_POUR_DECODER_LE_TOKEN');
        const userId = decodeToken.userId;
        req.auth = {
            userId: userId
        }
        next();
    } catch (error){
        res.status(401).json({ error })
    }
}