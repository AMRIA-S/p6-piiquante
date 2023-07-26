const Sauces = require('../models/sauces');
const fs = require('fs');

exports.getAll = (req, res, next) => {
    Sauces.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch( error => res.status(500).json(error));
};

exports.create = (req, res, next) => {
  const reqSauce = JSON.parse(req.body.sauce);
  delete reqSauce._id;
  delete reqSauce.userId;

  const sauces = new Sauces({
    ...reqSauce,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0
  });
 
  sauces.save()
    .then(() => {res.status(201).json({ message: 'Sauce ajoutée' })})
    .catch((error) => {res.status(400).json({ error })});
};

exports.getOne = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.modify = (req, res, next) => {
  const reqSauces = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body };

    
  Sauces.findOne({ _id: req.params.id })
    .then ((sauce) => {
      // Supprime l'image d'avant si on la modifié
      if (req.file){
      const imgSupp = sauce.imageUrl.split('/images/')[1];
      fs.unlinkSync(`backend/images/${imgSupp}`)
      };

      if(sauce.userId != req.auth.userId){
        res.status(403).json({ message: 'Non-autorisée' });
      } else {
          Sauces.updateOne({ _id: req.params.id }, reqSauces)
            .then(() => res.status(201).json({ message: 'Sauces modifiée' }))
            .catch(error => res.status(400).json({ error }));
      };
    })
    .catch( error => {res.status(401).json({ error })});
};

exports.delete = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId != req.auth.userId){
        res.status(403).json({ message: 'Non-autorisé' })
      } else {
        const imgSupp = sauce.imageUrl.split('/images/')[1];
    
        fs.unlink(`backend/images/${imgSupp}`, () => {
          Sauces.deleteOne({ _id: req.params.id })
            .then(() => {res.status(200).json({ message: 'Sauce supprimée' })})
            .catch(error => {res.status(401).json({ error })});
        })  
      }
  })
    .catch(error => res.status(500).json({ error }));
};

exports.likeSauces = (req, res, next) => {
  // const userId = req.auth.userId;
  // const likes = req.body.like;

  Sauces.findOne({ _id: req.params.id })
    .then(sauce => {

      const likesOrDislikes = {
        usersLiked: [],
        usersDisliked: [],
        likes: 0,
        dislikes: 0
      };

      // L'utilisateur like
      if (req.body.like === 1) {
        likesOrDislikes.usersLiked.push(req.auth.userId);
        likesOrDislikes.likes = likesOrDislikes.usersLiked.length;

        // L'utilisateur dislike
      } else if (req.body.like === -1) {
        likesOrDislikes.usersDisliked.push(req.auth.userId);
        likesOrDislikes.dislikes = likesOrDislikes.usersDisliked.length;

        // L'utilisateur annule son like ou son dislike
      } else if (req.body.like === 0) {
        if(likesOrDislikes.usersLiked.includes(req.auth.userId)){
          likesOrDislikes.usersLiked.splice(req.auth.userId);
          likesOrDislikes.likes = likesOrDislikes.usersLiked.length;
        } else if (likesOrDislikes.usersDisliked.includes(req.auth.userId)) {
          likesOrDislikes.usersDisliked.splice(req.auth.userId);
          likesOrDislikes.dislikes = likesOrDislikes.usersDisliked.length;
        };
      };

      Sauces.updateOne({ _id: req.params.id }, likesOrDislikes)
        .then(() => res.status(200).json({ message: 'Merci de votre avis' }))
        .catch(error => res.status(400).json({ error }));
      })
    .catch(error => res.status(500).json({ error }));
};