const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const optionsCors = {
    origin: '*' || 'http://localhost:5473',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(optionsCors));

// Routes
app.use("/api/v1/auth", require("./routes/user.route"));

module.exports = app;