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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Now listening on http://localhost:${PORT}`); });