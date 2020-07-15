/**
 * DO NOT EDIT THESE CONST
 * They are required dependencies
 */
const express   = require('express');
const cors      = require('cors');
require('dotenv').config()

const app = express();
const appport = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

// Declaring all Services
const devRouter      = require('./api/services/development.route')
const herokuRouter   = require('./api/services/heroku.route')

app.use('/dev',devRouter)
app.use('/heroku',herokuRouter)

app.listen(appport, function(err) {
    if (err) throw new err;
    console.log(`Server is running on port: ${appport}`);
});