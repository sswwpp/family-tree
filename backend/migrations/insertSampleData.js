const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ensure the db directory exists
const dbPath = path.resolve(__dirname, "../db/database.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database opening error: ", err);
  }
});

// Insert new sample data
db.serialize(() => {
  db.run(
    `INSERT INTO family_member (name, parent_id, birthday, dateOfPassing, color) VALUES ('John Doe', NULL, '1950-01-01', NULL, '#FF0000')`
  );
  db.run(
    `INSERT INTO family_member (name, parent_id, birthday, dateOfPassing, color) VALUES ('Jane Doe', 1, '1975-01-01', NULL, '#00FF00')`
  );
  db.run(
    `INSERT INTO family_member (name, parent_id, birthday, dateOfPassing, color) VALUES ('Jimmy Doe', 1, '1978-01-01', NULL, '#0000FF')`
  );
  db.run(
    `INSERT INTO family_member (name, parent_id, birthday, dateOfPassing, color) VALUES ('Jenny Doe', 2, '2000-01-01', NULL, '#FFFF00')`
  );
  console.log("Sample data inserted successfully.");
});

db.close();
