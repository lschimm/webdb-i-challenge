const express = require("express");

const db = require("./data/dbConfig.js");
const AccountRouter = require("./data/accounts/account-router.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Givin' it a go</h2>`);
});

module.exports = server;
