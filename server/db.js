const express = require('express');
const router = express.Router();
const pg = require('pg');

const db = 'postgres://localhost:5432/halpdesk';

const onConnect = (err, client, done) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
};

pg.connect(db, onConnect);

module.exports = db;
