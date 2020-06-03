'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./api/api');

// Set up the express app
const app = express();

//set view engine
app.set('view engine', 'ejs');


app.use(cors());
  //set CORS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.urlencoded({
  extended: true
}));
  app.use(bodyParser.json());
  //serve static files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'build')));

// Bundle API routes.
app.use('/', api);

app.get('/*', function (req, res) {
 res.status(200).send("under construction");
});
const server = http.createServer(app);
server.listen(4000);
server.on('listening', () => {console.log('server connected');});
