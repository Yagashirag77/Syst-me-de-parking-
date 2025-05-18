const db = require('../config/db');
// const QrCode = require('../models/QrCode');
 const BornePaiement = {
    create: (data, callback)=> {
        sql = `INSERT INTO bornes_paiements (localisation, id_parking) VALUES (?, ?)`;
        db.query(sql, [data.locatisation, data.id_parking], callback);
    },

    findById:(id, callback)=>{
        sql = `SELECT * FROM bornes_paiements WHERE id_borne_paiement = ?`;
        db.query(sql, id, callback);
    },

    findbyCode:(code, callback)=>{
        sql = `SELECT * FROM qr_codes WHERE code_unique = ?`;
        db.query(sql, code, callback);
    },  

    update: (id, data, callback)=>{
        sql = `UPDATE bornes_paiements SET localisation = ?, id_parking = ? WHERE id_borne_paiement = ?`;
        db.query(sql,[data.locatisation, data.id_parking], id, callback);
    }, 

    delete: (id, callback)=>{
        sql = `DELETE FROM bornes_paiements WHERE id_bornePaiement = ?`;
        db.query(sql, id, callback);
    }
 };

 module.exports = BornePaiement;