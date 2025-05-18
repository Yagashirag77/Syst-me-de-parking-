const db = require("../config/db");

const QrCode = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      sql = `INSERT INTO qr_codes (id_client, code_unique, actif, date_creation) VALUES (?,?,?,?)`;
      //executer le statement
      db.query(sql, [
        data.id_client,
        data.code_unique,
        data.actif,
        data.date_creation,
      ], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  findByClientId: (id) => {
    return new Promise((resolve, reject) => {
      sql = `SELCT * FROM qr_codes WHERE id_client = ?`;
      db.query(sql, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  findBycodeUnique: (id) => {
    return new Promise((resolve, reject) => {
      sql = `SELECT * FROM qr_codes WHERE code_unique = ?`;
      db.query(sql, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // findByVehiculeId: (id) => {
  //   return new Promise((resolve, reject) => {
  //     sql = `SELCT * FROM qr_codes WHERE id_vehicule = ?`;
  //     db.query(sql, id, (err, result) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(result);
  //       }
  //     });
  //   });
  // },

  desactiver: (id) => {
    return new Promise((resolve, reject) => {
      sql = `UPDATE qr_codes SET actif = ? WHERE id_qrCode = ?`;
      db.query(sql, [0, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      sql = `DELETE FROM qr_codes WHERE id_qrCode = ?`;
      db.query(sql, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = QrCode;
