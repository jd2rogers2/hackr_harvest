const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { eventAttendeesRouter, eventsRouter, usersRouter } = require('./routes');


let corsOptions = {
  credentials: true,
  origin: [process.env.HH_WEB_FE_URL],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/eventAttendees', eventAttendeesRouter);
app.use('/events', eventsRouter);
app.use('/users', usersRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Hackr_harvest api listening on port ${port}`);
});
