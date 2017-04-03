var db = require('./db.js');

db.sync();
//can add force:true to drop tables before recreating them

module.exports.Ticket = db.models.Ticket;
