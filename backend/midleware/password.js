const passwordValidator = require('password-validator');

const passworSchema = new passwordValidator();
passworSchema
    .min(8, "Le mot de passe doit contenir plus de 8 caractères (espace compris")
    .max(64, "Le mot de passe ne doit pas contenir plus de 64 caractères")
    .uppercase(1, "Le mot de passe doit contenir au moins 1 caractère en majuscule") //
    .lowercase(1, "Le mot de passe doit contenir au moins un caractère en minuscule")
    .digits(1, "Le mot de passe doit contenir au moins un chiffre")

module.exports = (req, res, next) => {
    if (passworSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({ error : `Le mot de passe n'est pas assez sécurisé ${passworSchema.validate('req.body.password', { list: true })}` })
    }
}