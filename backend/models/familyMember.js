const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ensure the db directory exists
const dbPath = path.resolve(__dirname, "../db/database.db"); // Verify this path is correct
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database opening error: ", err);
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS family_member (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        parent_id INTEGER,
        birthday TEXT,
        dateOfPassing TEXT,
        color TEXT,
        FOREIGN KEY(parent_id) REFERENCES family_member(id)
    )`);
});

module.exports = db;
