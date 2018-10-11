const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blueBird = require('bluebird');
const api = require('./routes/index');

mongoose.Promise = blueBird;

mongoose.connect('mongodb://127.0.0.1:27017/zombicide')
  .then( () => 
    { 
      console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/zombicide`)
    }
  )
  .catch( () => 
    { 
      console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/zombicide`)
    }
  );

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
  
  app.use('/api', api);

  const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
