const db = require("../config/db");

const EntreeSortie = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO entree_sorties (id_qrCode, statuts) VALUES (?, ?)`;
      db.query(sql, [data.id_qrCode, data.statuts], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM entree_sorties WHERE id_entree_sortie = ?`;
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  findByIdQrcode: (id_qrCode) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM entree_sorties WHERE id_qrCode = ?`;
      db.query(sql, [id_qrCode], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  updateEntree: (id, data) => {
    return new Promise((resolve, reject) => {
        const sql = `
        UPDATE entree_sorties 
        SET date_entree = ?, matricule_vehicule = ?, statuts = ?
        WHERE id_entree_sortie = ?
      `;
      db.query(
        sql,
        [data.date_entree, data.matricule_vehicule, data.statuts, id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    })
},
  

  updateSortie: (id, data) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE entree_sorties SET date_sortie = ?, statuts = ?, tarif = ? WHERE id_entree_sortie = ?`;
      db.query(
        sql,
        [data.date_sortie, data.statuts, data.tarif, id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  updateStatuts: (id, data) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE entree_sorties SET statuts = ? WHERE id_entree_sortie = ?`;
      db.query(
        sql,
        [data.statuts,id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  updatePaiement: (id, data) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE entree_sorties SET type_operation = ?, statuts = ? WHERE id_entree_sortie = ?`;
      db.query(
        sql,
        [data.type_operation, data.statuts, id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM entree_sorties WHERE id_entree_sortie = ?`;
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
};

module.exports = EntreeSortie;
