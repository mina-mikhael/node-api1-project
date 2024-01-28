// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const usersRouter = require("./users/router");

server.use(express.json());

server.use("/api/users", usersRouter);

server.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
