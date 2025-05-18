const db = require("../config/db");
const Paiement = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      sql = `INSERT INTO paiements (montant, methode, timestamp, id_entree_sortie, id_client) VALUES (?, ?, ?, ?, ? )`;
      db.query(
        sql,
        [
          data.montant,
          data.methode,
        //   data.statut,
        //   data.transaction_id,
          data.timestamp,
          data.id_entree_sortie,
          data.id_client,
        ],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      sql = `SELECT * FROM paiements WHERE id_paiement = ?`;
      db.query(sql, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  findByMethode: (methode) => {
    return new Promise((resolve, reject) => {
      sql = `SELECT * FROM paiements WHERE methode = ?`;
      db.query(sql, methode, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },


  findByIdClient: (id) => {
    return new Promise((resolve, reject) => {
      sql = `SELECT * FROM paiements WHERE id_client = ?`;
      db.query(sql, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  update: (id, data) => {
    return new Promise((resolve, reject) => {
      sql = `UPDATE paiements SET montant = ?, methode = ? WHERE id_paiement = ?`;
      db.query( 
        sql,
        [
          data.montant,
          data.methode,
        //   data.statut,
        //   data.tarif,
        //   data.type_operation,
        //   data.id_vehicule,
        ],
        id,

        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      sql = `DELETE FROM paiements WHERE id_paiement = ?`;
      db.query(sql, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  CreateEspece: (data) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO espece (id_paiement) VALUES (?)`;
      db.query(sql, [data.id_paiement], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  

  CreateCc: (data, id) => {
    return new Promise((resolve, reject) => {
      sql = `INSERT INTO credit_cards (numero_cc, date_expiration, cvc id_paiement) VALUES (?, ?, ?, ?)`;;
      db.query(sql, [data.numero_cc, data.date_expiration, data.cvc], id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

};

module.exports = Paiement;
