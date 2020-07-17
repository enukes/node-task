/* eslint-disable no-console */
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const constants = require('./config/constants');
const routes = require('./routes');

module.exports = () => {
  const server = express();

  const create = (config) => {
    // Server settings
    server.set('port', config.port);
    server.set('hostname', config.hostname);

    // Returns middleware that parses json
    server.use(bodyParser.json());

    // Setup morgan for development
    server.use(morgan('dev'));

    // CORS
    server.use(cors());

    // Accessing static content
    server.use('/uploads', express.static('static/uploads'));
    server.use('/server-images', express.static('images'));
    // Set up routes
    server.use('/', routes);

    moment.tz.setDefault(constants.momentTimezone);

    // Setting up template engine
    server.set('view engine', 'ejs');
    server.use((req, res) => {
      res.status(404).send('not found');
    });
  };

  const start = () => {
    const hostname = server.get('hostname');
    const port = server.get('port');
    const uri = 'mongodb+srv://root:root@grocery-system-wa6ge.mongodb.net/aapki-dokan?retryWrites=true&w=majority';
    mongoose.connect(uri, {
      useNewUrlParser: true
    });
    mongoose.set('useFindAndModify', false);
    mongoose.set('debug', true);

    mongoose.Promise = global.Promise;
    const db = mongoose.connection;

    // Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    db.once('open', async () => {
      console.log('Db is Successfully Connected');
      server.listen(port, () => {
        console.log(`EDb connected successfully && Server started at - http://${hostname}:${port}`);
      });
    });
  };

  return { create, start };
};
