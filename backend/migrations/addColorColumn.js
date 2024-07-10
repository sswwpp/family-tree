const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ensure the db directory exists
const dbPath = path.resolve(__dirname, "../db/database.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database opening error: ", err);
  }
});

// Add 'color' column if it doesn't exist and update existing records
db.serialize(() => {
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

  db.run(
    `UPDATE family_member SET color = '#000000' WHERE color IS NULL OR color = ''`,
    [],
    (err) => {
      if (err) {
        console.error("Error updating existing records:", err.message);
      } else {
        console.log("Existing records updated successfully.");
      }
    }
  );
});

db.close();
