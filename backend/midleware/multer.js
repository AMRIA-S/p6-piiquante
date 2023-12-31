// Import de multer
const multer = require('multer');
const path = require('path');
const uuidv4 = require('uuid').v4;

// Définit les 3 types d'image
const fileType = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/jfif': 'jfif',
    'image/webp': 'webp'
};

// Pour enregistrer les fichiers (nom et chemin)
const storage = multer.diskStorage({
    // Chemin de la destination où le fichier sera enregistré
    destination: path.join(__dirname, "../images"),
    // Définit le nom de l'image
    filename: (req, file, callback) => {
        // constante format pour réutiliser typesImages
        const format = fileType[file.mimetype];

        // Met tiret du bas "_" à la place des espaces " "
        const name = file.originalname.split('.')[0].split(' ').join('_');
        const date = new Date();
        const dateDuJour = date.toLocaleDateString("fr").split('/').join('');
        const uuid = uuidv4();
        const nomUnique = uuid.split('-').join('');


        // callback pour renomer l'image avec la date du jour
        callback(null, name + nomUnique + dateDuJour + "." + format);
    }
});

module.exports = multer({storage: storage}).single('image');