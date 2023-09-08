const express = require('express');
const cors = require('cors');


let corsOptions = {
  origin : ['http://localhost:3001'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const data = [];

app.get('/', (req, res) => {
  console.log('data', data);
  res.send({ data });
});

app.post('/', (req, res) => {
  console.log('req.body', req.body);
  data.push(req.body)
  res.send(true);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Hackr_harvest api listening on port ${port}`);
});
