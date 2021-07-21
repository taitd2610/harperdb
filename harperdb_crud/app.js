require("dotenv").config();
const db = require("./config/database");
const express = require("express");

const app = express();

app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello HarperDB, NodeJS server is up and running");
});

// Create Schema
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

// Create Table
app.post("/create/table", (req, res) => {
  const { body } = req;

  db.createTable(
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

// Create Data in movie table
app.post("/movie/action/create", (req, res) => {
  const { body } = req;

  db.insert(
    {
      operation: "insert",
      schema: body.schema,
      table: body.table,
      records: body.records,
    },
    (err, response) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(response.statusCode).json(response.data);
    }
  );
});

// Update
app.post("/movie/action/update", (req, res) => {
  const { body } = req;

  db.update(
    {
      operation: "update",
      schema: body.schema,
      table: body.table,
      records: body.records,
    },
    (err, response) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(response.statusCode).json(response.data);
    }
  );
});

// Upsert a new row
app.post("/movie/action/upsert", (req, res) => {
  const { body } = req;

  db.upsert(
    {
      operation: "upsert",
      schema: body.schema,
      table: body.table,
      searchAttribute: body.records,
    },
    (err, response) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(response.statusCode).json(response.data);
    }
  );
});

// Get all records
app.post("/movie/action/search", (req, res) => {
  const { body } = req;

  db.searchByHash(
    {
      operation: "search_by_hash",
      schema: body.schema,
      table: body.table,
      hashValues: body.hashValues,
      attributes: body.getAttributes, // column get
    },
    (err, response) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(response.statusCode).json(response.data);
    }
  );
});

// Get records by values
app.post("/movie/action/searchByValue", (req, res) => {
  const { body } = req;

  db.searchByValue(
    {
      operation: "search_by_value",
      schema: body.schema,
      table: body.table,
      searchAttribute: body.searchAttribute,
      searchValue: body.searchValue,
      attributes: body.getAttributes, // column get
    },
    (err, response) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(response.statusCode).json(response.data);
    }
  );
});

// Delete records
app.post("/movie/action/delete", (req, res) => {
  const { body } = req;

  db.delete(
    {
      operation: "delete",
      schema: body.schema,
      table: body.table,
      hashValues: body.hashValues, // column get
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
