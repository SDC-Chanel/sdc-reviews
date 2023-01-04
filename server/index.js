require('dotenv').config();
const cluster = require('cluster');
const { cpus } = require('node:os');
const process = require('node:process');

const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router.js');

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  // first connection distribution (accepts all connects and distrubites across workers)
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // worker processes are spawned
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // reforks  if a worker dies
  });
} else { // second connection distribution (listen socket for interested workers)
  const app = express();

  app.use(express.json());
  router.use(cors());
  app.use(morgan('dev'));
  app.use(router);
  app.use(express.urlencoded({ extended: true }));

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => { console.log(`Worker ${process.pid} listening on http://localhost:${PORT}`); });
}
