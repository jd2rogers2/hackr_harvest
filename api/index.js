const express = require('express');
const cors = require('cors');
const { Events } = require('./models');


let corsOptions = {
  origin : ['http://localhost:3001'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', async (req, res) => {
  const events = await Events.findAll();
  res.send({ events });
});

app.post('/', async (req, res) => {
  const event = await Events.create(req.body);
  res.send({ event });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Hackr_harvest api listening on port ${port}`);
});
