const express = require('express');
const cors = require('cors');
const { Events, Users } = require('./models');


let corsOptions = {
  origin : ['http://localhost:3001'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get('/events', async (req, res) => {
  const events = await Events.findAll();
  res.send({ events });
});

app.post('/events', async (req, res) => {
  const event = await Events.create(req.body);
  res.send({ event });
});

app.get('/users', async (req, res) => {
  const users = await Users.findAll();
  res.send({ users });
});

app.post('/users', async (req, res) => {
  const user = await Users.create(req.body);
  res.send({ user });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Hackr_harvest api listening on port ${port}`);
});
