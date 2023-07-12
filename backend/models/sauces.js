const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
    sauces: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Sauces', saucesSchema);