const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
        name: { type: String, required: true },
        manufacturer: { type: String, required: true },
        description: { type: String, required: true },
        mainPepper: { type: String, required: true },
        heat: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        userId: { type: String, required: true },
        usersLiked: { type: Array, required: false },
        usersDisliked: { type: Array, required: false },
        likes: { type: Number, required: false, default: 0 },
        dislikes: { type: Number, required: false, default: 0 }
});

module.exports = mongoose.model('Sauces', saucesSchema);