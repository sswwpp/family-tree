const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ensure the db directory exists
const dbPath = path.resolve(__dirname, "../db/database.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database opening error: ", err);
  }
});

// Update the family_member table schema
db.serialize(() => {
  // Add the 'birthday' column if it does not exist
  db.run(`ALTER TABLE family_member ADD COLUMN birthday TEXT`, [], (err) => {
    if (err && err.message.includes("duplicate column name")) {
      console.log("Column 'birthday' already exists.");
    } else if (err) {
      console.error("Error adding column 'birthday':", err.message);
    } else {
      console.log("Column 'birthday' added successfully.");
    }
  });

  // Add the 'dateOfPassing' column if it does not exist
  db.run(
    `ALTER TABLE family_member ADD COLUMN dateOfPassing TEXT`,
    [],
    (err) => {
      if (err && err.message.includes("duplicate column name")) {
        console.log("Column 'dateOfPassing' already exists.");
      } else if (err) {
        console.error("Error adding column 'dateOfPassing':", err.message);
      } else {
        console.log("Column 'dateOfPassing' added successfully.");
      }
    }
  );

  // Add the 'color' column if it does not exist
  db.run(
    `ALTER TABLE family_member ADD COLUMN color TEXT DEFAULT '#000000'`,
    [],
    (err) => {
      if (err && err.message.includes("duplicate column name")) {
        console.log("Column 'color' already exists.");
      } else if (err) {
        console.error("Error adding column 'color':", err.message);
      } else {
        console.log("Column 'color' added successfully.");
      }
    }
  );
});

db.close();
