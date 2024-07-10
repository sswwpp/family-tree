const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

const db = new sqlite3.Database("db/database.db");

// Fetch all family members
app.get("/api/family", (req, res) => {
  db.all("SELECT * FROM family_member", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Add a new family member
app.post("/api/family", (req, res) => {
  const { name, parent_id, birthday, dateOfPassing, color } = req.body;
  db.run(
    `INSERT INTO family_member (name, parent_id, birthday, dateOfPassing, color) VALUES (?, ?, ?, ?, ?)`,
    [name, parent_id, birthday, dateOfPassing, color],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: {
          id: this.lastID,
          name,
          parent_id,
          birthday,
          dateOfPassing,
          color,
        },
      });
    }
  );
});

// Delete a family member
app.delete("/api/family/:id", (req, res) => {
  db.run(
    `DELETE FROM family_member WHERE id = ?`,
    req.params.id,
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
