/**
 * Quick and dirty controller for all ORLCS overlays.
 */

const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
const { readFileSync } = require('fs');
const server = http.createServer(app);
const JSON5 = require('json5');

app.use(cors())

app.get('/', (req, res) => {
  res.send(JSON5.parse(readFileSync('./state.json')));
});

server.listen(3333, () => {
  console.log('listening on *:3333');
});