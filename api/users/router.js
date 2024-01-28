const express = require("express");
const Users = require("./model");
const router = express.Router();

router.get("/", (req, res) => {
  Users.find()
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((resp) => {
      if (!resp) {
        res.status(404).json({ message: "user does not exist" });
        return;
      }
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({ message: "provide name and bio" });
    return;
  }
  Users.insert({ name, bio })
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({ message: "provide name and bio" });
    return;
  }
  Users.update(id, { name, bio })
    .then((resp) => {
      if (!resp) {
        res.status(404).json({ message: "does not exist" });
        return;
      }
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then((resp) => {
      if (!resp) {
        res.status(404).json({ message: "does not exist" });
        return;
      }
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
