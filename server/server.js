const express = require('express');
const path = require('path');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 1337;
const router = express.Router();
const bodyParser = require('body-parser');

app.set('view engine', 'html');

app.use([bodyParser.json(), bodyParser.urlencoded({extended: true})]);
app.use(express.static(path.join(__dirname, '../client')));
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server Error');
});
app.use('/api', routes);

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});


app.listen(port, (err) => {
  err
    ? console.log('Cannot connect...', err)
    : console.log(`Connected! Server is listening on port ${port}`);
});
