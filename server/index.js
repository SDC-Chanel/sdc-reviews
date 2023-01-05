require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router.js');

const app = express();

app.use(express.json());
router.use(cors());
app.use(morgan('dev'));
app.use(router);
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

module.exports = app;
