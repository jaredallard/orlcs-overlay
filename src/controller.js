/**
 * Quick and dirty controller for all ORLCS overlays.
 */

const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
const { readFileSync, writeFileSync } = require('fs');
const server = http.createServer(app);
const JSON5 = require('json5');

app.use(cors())

// serve the contents
app.get('/', (_req, res) => {
  res.send(JSON5.parse(readFileSync('./state.json')));
});

// +1 game 
app.get('/game', (_req, res) => {
  const state = JSON5.parse(readFileSync('./state.json'))
  state.game++
  writeFileSync('./state.json', JSON.stringify(state))
  res.send({ success: true })
});

// enable
app.get('/enable', (_req, res) => {
  const state = JSON5.parse(readFileSync('./state.json'))
  state.enabled = true
  writeFileSync('./state.json', JSON.stringify(state))
  res.send({ success: true })
});

// disable
app.get('/disable', (_req, res) => {
  const state = JSON5.parse(readFileSync('./state.json'))
  state.enabled = false
  writeFileSync('./state.json', JSON.stringify(state))
  res.send({ success: true })
});

// update current teams
app.get('/teams', (req, res) => {
  const state = JSON5.parse(readFileSync('./state.json'))
  const teamsStr = req.query.teams
  const teams = teamsStr.split(',')
  state.blue = teams[0]
  state.orange = teams[1]
  state.bestOf = teams[2]
  state.game = 0
  writeFileSync('./state.json', JSON.stringify(state))

  res.send({ success: true })
});

server.listen(3333, () => {
  console.log('listening on *:3333');
});