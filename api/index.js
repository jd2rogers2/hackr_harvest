const express = require('express');
const cors = require('cors');
const { EventAttendees, Events, Users } = require('./models');


let corsOptions = {
  origin : ['http://localhost:3001'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get('/events', async (req, res) => {
  const events = await Events.findAll({ include: ['host', 'attendees'] });
  res.send({ events });
});

app.post('/events', async (req, res) => {
  const event = await Events.create(req.body);
  res.send({ event });
});

app.get('/users', async (req, res) => {
  const users = await Users.findAll({ include: ['hostings', 'attendings'] });
  res.send({ users });
});

app.post('/users', async (req, res) => {
  const user = await Users.create(req.body);
  res.send({ user });
});

// app.get('/eventAttendees', async (req, res) => {
//   const eventAttendees = await EventAttendees.findAll();
//   res.send({ eventAttendees });
// });

app.post('/eventAttendees', async (req, res) => {
  const eventAttendee = await EventAttendees.create(req.body);
  res.send({ eventAttendee });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Hackr_harvest api listening on port ${port}`);
});
