const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connection = 'postgres://localhost:5432/halpdesk';

var client = new pg.Client(connection);
client.connect();

exports.submitTicket = (req, res) => {
  const results = [];
  const ticket = req.body;
  const query = client.query('INSERT INTO tickets(author, subject, issue, chatUrl, archive, status) values ($1, $2, $3, $4, $5, $6)', [ticket.author, ticket.subject, ticket.issue, ticket.chatUrl, ticket.archive, ticket.status]);
  query.on('row', (row) => {
    results.push(row);
  })
  query.on('end', () => {
    return res.json(results);
  });
};

exports.getOpenTickets = (req, res) => {
  const openTickets = [];
  const query = client.query('SELECT * FROM tickets WHERE archive = false');
  query.on('row', (row) => {
    openTickets.push(row);
  });
  query.on('end', () => {
    return res.json(openTickets);
  });
};

exports.getArchivedTickets = (req, res) => {
  const archiveTickets = [];
  const query = client.query('SELECT * FROM tickets WHERE archive = true');
  query.on('row', (row) => {
    archiveTickets.push(row);
  });
  query.on('end', () => {
    return res.json(archiveTickets);
  });
};

exports.updateTicket = (req, res) => {
  console.log(req.body);
  const results = [];
  const id = req.body.id;
  const ticket = Object.assign({}, req.body, { archive: !req.body.archive })
  const query = client.query('UPDATE tickets SET archive = $1 WHERE id = $2', [ticket.archive, id]);
  query.on('row', (row) => {
    results.push(row);
  })
  query.on('end', () => {
    return res.json(results);
  });
};

exports.deleteTicket = (req, res) => {
  const results = [];
  const query = client.query('DELETE FROM tickets WHERE tickets.id = $1', [req.body.id]);
  query.on('row', (row) => {
    results.push(row);
  })
  query.on('end', () => {
    return res.json(results);
  });
};
