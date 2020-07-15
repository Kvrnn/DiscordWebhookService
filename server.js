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

// Declaring endpoint
const mainRouter = require('./api/services/main.route')

app.use('/',mainRouter)

app.listen(appport, function(err) {
    if (err) throw new err;
    console.log(`Server is running on port: ${appport}`);
});