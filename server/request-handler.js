// var db = require('./db_config.js');
// var http = require('http');
const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connection = 'postgres://localhost:5432/halpdesk';


exports.submitTicket = (req, res) => {
  const results = [];
  const data = req.body;
  const ticket = {
    author: data.author,
    subject: data.subject,
    issue: data.issue,
    chatUrl: data.chatUrl,
    archive: data.archive,
    status: data.status
  };
  pg.connect(connection, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query('INSERT INTO tickets(author, subject, issue, chatUrl, archive, status) values ($1, $2, $3, $4, $5, $6)', [ticket.author, ticket.subject, ticket.issue, ticket.chatUrl, ticket.archive, ticket.status]);
    query.on('row', (row) => {
      results.push(row);
    })
    query.on('end', () => {
      done();
      return res.json(results);
    })
  });
};

exports.getOpenTickets = (req, res) => {
  const openTickets = [];
  pg.connect(connection, (err, client, done) => {
    if (err) {
      done();
      console.log(error);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query('SELECT * FROM tickets WHERE archive = false');
    query.on('row', (row) => {
      openTickets.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(openTickets);
    });
  });
};

exports.getArchivedTickets = (req, res) => {
  const archiveTickets = [];
  pg.connect(connection, (err, client, done) => {
    if (err) {
      done();
      console.log(error);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query('SELECT * FROM tickets WHERE archive = true');
    query.on('row', (row) => {
      archiveTickets.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(archiveTickets);
    });
  });
};

exports.updateTicket = (req, res) => {
  console.log(req.body);
  const results = [];
  const id = req.body.id;
  const archive = !req.body.archive;

  pg.connect(connection, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query('UPDATE tickets SET archive = $1 WHERE id = $2', [archive, id]);
    query.on('row', (row) => {
      results.push(row);
    })
    query.on('end', () => {
      done();
      return res.json(results);
    })
  });
};

exports.deleteTicket = (req, res) => {
  console.log(req.body);
  const results = [];

  pg.connect(connection, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query('DELETE FROM tickets WHERE tickets.id = $1', [req.body.id]);
    query.on('row', (row) => {
      results.push(row);
    })
    query.on('end', () => {
      done();
      return res.json(results);
    })
  });
};
