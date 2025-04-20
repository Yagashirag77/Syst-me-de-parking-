// controllers/authController.js
const Utilisateur = require('../models/utilisateur');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;

  Utilisateur.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });

    if (results.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, match) => {
      if (!match) return res.status(401).json({ error: 'Mot de passe incorrect' });

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.json({ token });
    });
  });
};
