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
    .then((users) => {
      res.json(users);
    })
    .catch(() => {
      res.status(500).json({ message: "The users information could not be retrieved" });
    });
});

//GET BY ID
server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist" });
      } else res.json(user);
    })
    .catch(() => {
      res.status(500).json({ message: "The users information could not be retrieved" });
    });
});

//POST A NEW USER
server.post("/api/users", (req, res) => {
  Users.insert(req.body)
    .then((newUser) => {
      if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" });
      } else res.status(201).json(newUser);
    })
    .catch(() => {
      res.status(500).json({ message: "The users information could not be retrieved" });
    });
});

//DELETE A USER
server.delete("/api/users/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist" });
      } else res.json(user);
    })
    .catch(() => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

//Change a user
server.put("/api/users/:id", (req, res) => {
  Users.update(req.params.id, req.body)
    .then((result) => {
      if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" });
      } else if (!result) {
        res.status(404).json({ message: "The user with the specified ID does not exist" });
      } else res.json(result);
    })
    .catch(() => {
      res.status(500).json({ message: "The user information could not be modified" });
    });
});

//CATCH ALL
server.use("*", (req, res) => {
  res.status(404).json({ message: "not Found , lool" });
});

// -------------------EXPORTS
module.exports = server;
