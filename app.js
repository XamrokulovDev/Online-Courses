const express = require('express');
const app = express();
const connectDb = require('./config/mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
