const db = require("../config/db");

const Client = {
  create: (id_utilisateur, callback) => {
    db.query(
      `INSERT INTO clients (id_client) VALUES (?)`,
      [id_utilisateur],
      callback
    );
  },

  //   update:(data, callback)=>{
  //     sql = `UPDATE clients SET id_utilisateur = ? WHERE id_client = ? `
  //     db.query(sql, [data.id_utilisateur ,data.id_client], callback);
  // },

  findByUtilisateurId: (id) => {
    return new Promise((resolve, reject) => {
      sql = `SELECT * FROM clients WHERE id_client = ?`;
      db.query(sql, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  delete: (id, callback) => {
    return new Promise((resolve, reject) => {
      sql = `DELETE FROM clients WHERE id_client = ?`;
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

module.exports = Client;
