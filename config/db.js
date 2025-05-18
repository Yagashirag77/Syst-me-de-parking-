require('dotenv').config();
const mysql = require('mysql2');
const db_init = require('../db_init');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// db.connect(err=>{
//     if (err){throw err;}
//     console.log("Connecte a la base de donnees avec success") 

//     db_init.initializeDatabase(db);
// });
if (db){
    db_init.initializeDatabase(db);
}



module.exports = db;