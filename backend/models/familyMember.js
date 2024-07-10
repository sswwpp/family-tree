const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS family_member (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        parent_id INTEGER,
        FOREIGN KEY(parent_id) REFERENCES family_member(id)
    )`);
});

module.exports = db;
