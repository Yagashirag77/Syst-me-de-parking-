const db = require('../config/db');
 const Parking = {
    create: (data, callback)=> {
        sql = `INSERT INTO parkings (localisation, capacite, places_disponibles) VALUES (?, ?, ?)`;
        db.query(sql, [data.locatisation, data.capacite, data.places_disponibles], callback);
    },

    findById:(id, callback)=>{
        sql = `SELECT * FROM parkings WHERE id_parking = ?`;
        db.query(sql, id, callback);
    },

    update: (id, data, callback)=>{
        sql = `UPDATE parkings SET localisation = ? capacite = ? places_disponibles = ? WHERE id_parking = ?`;
        db.query(sql,[data.locatisation, data.capacite, data.places_disponibles], id, callback);
    }, 

    delete: (id, callback)=>{
        sql = `DELETE FROM parkings WHERE id_parking = ?`;
        db.query(sql, id, callback);
    }
 };

 module.exports = Parking;