const mongoose = require('mongoose');

// Schema pour créer un compte ou se connecter
const userShema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('user', userShema);

