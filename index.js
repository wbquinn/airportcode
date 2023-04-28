'use strict';

const functions = require('@google-cloud/functions-framework');

functions.http('airportsGET', (req, res) => {
  res.send('Airports of the World!');
});
