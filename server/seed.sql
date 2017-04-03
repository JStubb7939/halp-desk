DROP TABLE IF EXISTS tickets cascade;

CREATE TABLE tickets(
  id serial primary key,
  author VARCHAR(15),
  subject VARCHAR(50),
  issue VARCHAR(255),
  chatUrl VARCHAR(255),
  archive BOOLEAN,
  status BOOLEAN
);
