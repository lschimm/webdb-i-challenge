const express = require("express");
const knex = require("knex");

const dbConnection = knex({
  client: "sqlite3",
  connection: {
    filename: "../seeds/budget.db3"
  },
  useNullAsDefault: true
});
