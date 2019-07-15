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

router.get("/:id", (req, res) => {
  dbConnection("accounts")
    .where({ id: req.params.id })
    .first()
    .then(post => {
      if (accounts) {
        res.status(200).json(accounts);
      } else {
        res.status(404).json({ message: "account not found" });
      }
    })
    .catch(error => res.status(500).json(error));
});

router.delete("/:id", (req, res) => {
  dbConnection("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200({ message: `${account} record(s) deleted` }));
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
