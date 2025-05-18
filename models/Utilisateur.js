const db = require("../config/db");

const Utilisateur = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      //requette
      const sql = `INSERT INTO utilisateurs (nom, prenom, email, password) VALUES (?, ?, ?, ?)`;
      //executer le statement
      db.query(sql, [data.nom, data.prenom, data.email, data.password], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM utilisateurs WHERE email = ?`;
      db.query(sql, email, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM utilisateurs`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM utilisateurs WHERE id_utilisateur = ?`;
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
      const sql = `UPDATE utilisateurs SET nom = ? prenom = ? email = ? password = ? WHERE id_utilisateur = ? `;
      db.query(
        sql,
        [data.nom, data.prenom, data.email, data.password, data.id_utilisateur],
        id, (err, result) => {
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
      const sql = `DELETE FROM utilisateurs WHERE id_utilsateurs = ?`;
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

module.exports = Utilisateur;
