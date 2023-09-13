const express = require('express');
const cors = require('cors');
const { EventAttendees, Events, Users } = require('./models');
const { eventsRouter } = require('./routes');


let corsOptions = {
  origin : ['http://localhost:3001'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use('', eventsRouter);

app.get('/users', async (req, res) => {
  const users = await Users.findAll({ include: ['hostings', 'attendings'] });
  res.send({ users });
});

app.post('/users', async (req, res) => {
  const user = await Users.create(req.body);
  res.send({ user });
});

app.post('/eventAttendees', async (req, res) => {
  const eventAttendee = await EventAttendees.create(req.body);
  res.send({ eventAttendee });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Hackr_harvest api listening on port ${port}`);
});
