const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

//throw new Error('Something failed during startup.');
const p = Promise.reject(new Error('Something failed miserably :('));
 p.then(() => console.log('Done'));


const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
