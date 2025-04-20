// controllers/qrCodeController.js
const QrCode = require('../models/qrCode');
const { v4: uuidv4 } = require('uuid');

exports.generate = (req, res) => {
  const clientId = req.body.client_id;
  const code_unique = uuidv4();

  QrCode.create({ code_unique, client_id: clientId }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la génération du QR code' });

    res.json({ code_unique });
  });
};
