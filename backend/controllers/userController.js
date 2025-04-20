// controllers/userController.js
const Utilisateur = require('../models/utilisateur');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
  const { nom, prenom, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    const userData = { nom, prenom, email, password: hash };

    Utilisateur.create(userData, (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
      res.status(201).json({ message: 'Utilisateur créé' });
    });
  });
};
