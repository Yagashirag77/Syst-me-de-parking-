// models/paiement.js
const db = require('./db');

const Paiement = {
  save: (data, callback) => {
    db.query(
      'INSERT INTO paiement (montant, methode, statut, transaction_id, timestamp) VALUES (?, ?, ?, ?, NOW())',
      [data.montant, data.methode, data.statut, data.transaction_id],
      callback
    );
  }
};

module.exports = Paiement;
