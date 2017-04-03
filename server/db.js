const express = require('express');
const router = express.Router();
const pg = require('pg');

const db = "postgres://kpmnviiofyzapp:2053cedd53d88143b95663388863e02178736fd341ece48293ba05abbdc292ea@ec2-23-23-93-255.compute-1.amazonaws.com:5432/d973qpmit5epft?ssl=true", {"dialect":"postgres", "ssl":true, "dialectOptions":{"ssl":{"require":true}}};

// const db = 'postgres://localhost:5432/halpdesk';

const onConnect = (err, client, done) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
};

pg.connect(db, onConnect);

module.exports = db;
