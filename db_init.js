const db = require("./config/db");

const initializeDatabase = (db) => {
  const queries = [
    {
      name: "utilisateurs",
      sql: `CREATE TABLE IF NOT EXISTS utilisateurs (
                id_utilisateur INT NOT NULL AUTO_INCREMENT,
                nom VARCHAR(100),
                prenom VARCHAR(100),
                email VARCHAR(150) UNIQUE,
                password VARCHAR(255),
                PRIMARY KEY (id_utilisateur)
            );`,
    },
    {
      name: "clients",
      sql: `CREATE TABLE IF NOT EXISTS clients (
                id_client INT NOT NULL,
                PRIMARY KEY (id_client),
                FOREIGN KEY (id_client) REFERENCES utilisateurs(id_utilisateur) ON DELETE CASCADE
            );`,
    },
    {
      name: "gerants",
      sql: `CREATE TABLE IF NOT EXISTS gerants (
                id_gerant INT NOT NULL,
                PRIMARY KEY (id_gerant),
                FOREIGN KEY (id_gerant) REFERENCES utilisateurs(id_utilisateur) ON DELETE CASCADE
            );`,
    },
    {
      name: "qr_codes",
      sql: `CREATE TABLE IF NOT EXISTS qr_codes (
                id_qrCode INT AUTO_INCREMENT PRIMARY KEY,
                id_client INT NOT NULL,
                
                code_unique VARCHAR(255) UNIQUE NOT NULL,
                FOREIGN KEY (id_client) REFERENCES clients(id_client) ON DELETE CASCADE,
             
                actif BOOLEAN DEFAULT TRUE,
                date_creation DATETIME
            );`,
    },
    {
      name: "parkings",
      sql: `CREATE TABLE IF NOT EXISTS parkings (
                id_parking INT AUTO_INCREMENT PRIMARY KEY,
                localisation VARCHAR(255),
                capacite INT,
                places_disponibles INT
            );`,
    },
    {
      name: "bornes_paiement",
      sql: `CREATE TABLE IF NOT EXISTS bornes_paiement (
                id_borne_paiement INT AUTO_INCREMENT PRIMARY KEY,
                id_parking INT,
                localisation VARCHAR(255),
                FOREIGN KEY (id_parking) REFERENCES parkings(id_parking) ON DELETE CASCADE
            );`,
    },
    // {
    //     name: "vehicules",
    //     sql: `CREATE TABLE IF NOT EXISTS vehicules (
    //         id_vehicule INT AUTO_INCREMENT PRIMARY KEY,
    //         immatriculation VARCHAR(50),
    //         type VARCHAR(100),
    //         id_client INT,
    //         FOREIGN KEY (id_client) REFERENCES clients(id_client) ON DELETE CASCADE
    //     );`
    // },
    {
      name: "entree_sorties",
      sql: `CREATE TABLE IF NOT EXISTS entree_sorties (
                id_entree_sortie INT AUTO_INCREMENT PRIMARY KEY,
                date_entree DATETIME,
                date_sortie DATETIME,
                id_qrCode INT NOT NULL,
                matricule_vehicule VARCHAR(20),
                FOREIGN KEY (id_qrCode) REFERENCES qr_codes(id_qrCode) ON DELETE CASCADE, 
                tarif DOUBLE,
                type_operation VARCHAR(100),
                statuts VARCHAR(30)
            );`,
    },
    {
      name: "paiements",
      sql: `CREATE TABLE IF NOT EXISTS paiements (
                id_paiement INT AUTO_INCREMENT PRIMARY KEY,
                montant DOUBLE,
                methode VARCHAR(50),
                
                
                timestamp DATETIME,
                id_entree_sortie INT,
                id_client INT,
                FOREIGN KEY (id_entree_sortie) REFERENCES entree_sorties(id_entree_sortie) ON DELETE CASCADE,
                FOREIGN KEY (id_client) REFERENCES clients(id_client) ON DELETE CASCADE
            );`,
    },
    {
      name: "credit_cards",
      sql: `CREATE TABLE IF NOT EXISTS credit_cards (
                id_cc INT AUTO_INCREMENT PRIMARY KEY,
                numero_cc VARCHAR(50),
                date_expiration DATE,
                cvc INT(3),
                id_paiement INT NOT NULL,
                FOREIGN KEY (id_paiement) REFERENCES paiements(id_paiement) ON DELETE CASCADE
            )`,
    },
    {
      name: "espece",
      sql: `CREATE TABLE IF NOT EXISTS espece(
                id_espece INT AUTO_INCREMENT PRIMARY KEY,
                id_paiement INT NOT NULL,
                FOREIGN KEY (id_paiement) REFERENCES paiements(id_paiement) ON DELETE CASCADE
            )`,
    },
  ];

  const executeQueries = (index = 0) => {
    if (index >= queries.length) {
      console.log("✅ Toutes les tables ont été créées");
      // db.end();
      return;
    }

    const { name, sql } = queries[index];
    db.query(sql, (err) => {
      if (err) {
        console.error(
          `❌ Erreur lors de la création de la table ${name} : ${err.message}`
        );
      } else {
        console.log(`✅ Table ${name} créée avec succès`);
      }
      executeQueries(index + 1);
    });
  };

  executeQueries();
};

module.exports = { initializeDatabase };
