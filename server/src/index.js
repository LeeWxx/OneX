const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');

const fs = require('fs');
const path = require('path');

const storesRoutes = require('./routes/stores-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const getCoordsForAddress = require('./utill/location');

const port = config.get('port');
const clientUrl = config.get('client');
const db = config.get('db');

const app = express();

app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({ origin: clientUrl, credentials: true }));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

//     next();
// });

app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use('/api/stores', storesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
    .connect(db.mongoUrl)
    .then(() => {
        app.listen(port);
        console.log('성공');
    })
    .catch((err) => {
        console.log(err);
    });