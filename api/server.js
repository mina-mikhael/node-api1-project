// IMPORTS
const express = require("express");
const Users = require("../api/users/model");

// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());

// -------------------ENDPOINTS--------------------

//GET all
server.get("/api/users", (req, res) => {
  Users.find()
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(500).json({ message: "The users information could not be retrieved" });
    });
});

//GET BY ID
server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "The user with the specified ID does not exist" });
      } else res.json(data);
    })
    .catch(() => {
      res.status(500).json({ message: "The users information could not be retrieved" });
    });
});

// -------------------EXPORTS
module.exports = server;
