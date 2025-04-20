// controllers/paiementController.js
const Paiement = require('../models/paiement');

exports.effectuerPaiement = (req, res) => {
  const { montant, methode, statut, transaction_id } = req.body;

  Paiement.save({ montant, methode, statut, transaction_id }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur paiement' });

    res.status(201).json({ message: 'Paiement enregistré' });
  });
};
