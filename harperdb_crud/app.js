require("dotenv").config();
const db = require("./config/database");
const express = require("express");

const app = express();

app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello HarperDB, NodeJS server is up and running");
});

// Tạo mới 1 schema
app.post("/create/schema", (req, res) => {
  const { body } = req;

  db.createSchema(
    {
      operation: "create_schema",
      schema: body.schema,
    },
    (err, response) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(response.statusCode).json(response.data);
    }
  );
});

// Tạo mới 1 table
app.post("/create/table", (req, res) => {
  const { body } = req;

  db.createSchema(
    {
      operation: "create_table",
      schema: body.schema,
      table: body.table,
      hashAttribute: "id",
    },
    (err, response) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(response.statusCode).json(response.data);
    }
  );
});

module.exports = app;
