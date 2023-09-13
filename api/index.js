const express = require('express');
const cors = require('cors');

const { eventAttendeesRouter, eventsRouter, usersRouter } = require('./routes');


let corsOptions = {
  origin : ['http://localhost:3001'],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/eventAttendees', eventAttendeesRouter);
app.use('/events', eventsRouter);
app.use('/users', usersRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Hackr_harvest api listening on port ${port}`);
});
