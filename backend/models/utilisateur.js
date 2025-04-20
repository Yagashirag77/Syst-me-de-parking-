// models/utilisateur.js
const db = require('./db');

const Utilisateur = {
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM utilisateur WHERE email = ?', [email], callback);
  },

  create: (userData, callback) => {
    db.query('INSERT INTO utilisateur (nom, prenom, email, password) VALUES (?, ?, ?, ?)', 
    [userData.nom, userData.prenom, userData.email, userData.password], callback);
  },
};

module.exports = Utilisateur;
