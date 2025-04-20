// models/vehicle.js
const db = require('./db');

const Vehicle = {
  add: (data, callback) => {
    db.query(
      'INSERT INTO vehicle (immatriculation, type, client_id) VALUES (?, ?, ?)',
      [data.immatriculation, data.type, data.client_id],
      callback
    );
  },

  getByClient: (clientId, callback) => {
    db.query('SELECT * FROM vehicle WHERE client_id = ?', [clientId], callback);
  }
};

module.exports = Vehicle;
