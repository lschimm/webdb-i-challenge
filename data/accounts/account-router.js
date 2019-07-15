const express = require("express");
const knex = require("knex");

const db = require("../dbConfig");

const dbConnection = knex({
  client: "sqlite3",
  connection: {
    filename: "../seeds/budget.db3"
  },
  useNullAsDefault: true
});

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = server;
