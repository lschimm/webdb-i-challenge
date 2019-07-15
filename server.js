const express = require("express");
const knex = require("knex");

const db = require("./data/dbConfig.js");
// const AccountRouter = require("./data/accounts/account-router.js");

const server = express();

server.use(express.json());

// server.use("/api/accounts", AccountRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Givin' it a go</h2>`);
});

const dbConnection = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/seeds/budget.db3"
  },
  useNullAsDefault: true
});

server.get("/", (req, res) => {
  dbConnection("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/:id", (req, res) => {
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

server.post("/", (req, res) => {
  const accounts = req.body;
  dbConnection("accounts")
    .insert(accounts, "id")
    .then(arrayOfIds => {
      const idOfLastRecordinserted = arrayOfIds[0];
      res.status(201).json(idOfLastRecordinserted);
    })
    .catch(error => res.status(500).json(error));
});

server.put("/:id", (req, res) => {
  dbConnection("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(error => res.status(500).json(error));
});

server.delete("/:id", (req, res) => {
  dbConnection("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200({ message: `${account} record(s) deleted` }));
    })
    .catch(error => res.status(500).json(error));
});

module.exports = server;
