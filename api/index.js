const express = require('express');
const cors = require('cors');


let corsOptions = {
   origin : ['http://localhost:3001'],
};

const app = express();
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Hackr_harvest api listening on port ${port}`);
});
