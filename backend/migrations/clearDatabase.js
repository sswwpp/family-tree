const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ensure the db directory exists
const dbPath = path.resolve(__dirname, "../db/database.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database opening error: ", err);
  }
});

// Clear the family_member table and reset the auto-increment counter
db.serialize(() => {
  db.run(`DELETE FROM family_member`, [], (err) => {
    if (err) {
      console.error("Error clearing the family_member table:", err.message);
    } else {
      console.log("family_member table cleared successfully.");
    }
  });

  // Reset the auto-increment counter
  db.run(
    `DELETE FROM sqlite_sequence WHERE name='family_member'`,
    [],
    (err) => {
      if (err) {
        console.error(
          "Error resetting the auto-increment counter:",
          err.message
        );
      } else {
        console.log("Auto-increment counter reset successfully.");
      }
    }
  );
});

db.close();
