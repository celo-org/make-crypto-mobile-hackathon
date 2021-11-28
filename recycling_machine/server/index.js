const express = require('express');
const cors = require('cors');
const { setPrices, restartSession, insertBottle, getAll } = require('./components/bottlesReceiver');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./components/contractCalls')(app);

let wss;

app.get('/', (req, res) => {
  res.send('Hi There')
});

const PrepareMachine = async () => {
  await setPrices();
  restartSession();
}

PrepareMachine();

app.post('/insertBottle', (req, res) => {
  console.log("Received: ", req.body);
  insertBottle(req.body["packagingType"]);
  
  res.send({ message: 'all good' });
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(getAll());
    }
  });
});

app.get('/restartSession', (req, res) => {
  restartSession();
  res.send('Session restarted');
});

let server = app.listen('3001', () => { })

const WebSocket = require('ws');
wss = new WebSocket.Server({ server:server });
wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  ws.send(getAll());
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});