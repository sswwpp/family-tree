const express = require("express");
const db = require("../models/familyMember");
const router = express.Router();

router.get("/", (req, res) => {
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

router.post("/", (req, res) => {
  const { name, parent_id } = req.body;
  db.run(
    `INSERT INTO family_member (name, parent_id) VALUES (?, ?)`,
    [name, parent_id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: { id: this.lastID, name, parent_id },
      });
    }
  );
});

module.exports = router;
