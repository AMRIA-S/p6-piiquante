// Import de multer
const multer = require('multer');

// Définit les 3 types d'image
const typesImages = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpeg',
    'images/png': 'png',
    'images/jfif': 'jfif'
};

// Pour enregistrer les fichiers (nom et chemin)
const storage = multer.diskStorage({
    // Chemin de la destination où le fichier sera enregistré
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    // Définit le nom de l'image
    filename: (req, file, callback) => {
        // Met tiret du bas "_" à la place des espaces " "
        const nom = file.originalname.split(' ').join('_');

        // constante format pour réutiliser typesImages
        const format = typesImages[file.mimetype];

        // callback pour renomer l'image avec la date du jour
        callback(null, nom + Date.now() + '.' + format);
    }
});

module.exports = multer({storage: storage}).single('image');