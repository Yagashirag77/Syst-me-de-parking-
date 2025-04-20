// models/qrCode.js
const db = require('./db');

const QrCode = {
  create: (data, callback) => {
    db.query(
      'INSERT INTO qrcode (code_unique, actif, date_creation, client_id) VALUES (?, ?, NOW(), ?)',
      [data.code_unique, true, data.client_id],
      callback
    );
  },

  findByClientId: (clientId, callback) => {
    db.query('SELECT * FROM qrcode WHERE client_id = ?', [clientId], callback);
  }
};

module.exports = QrCode;
