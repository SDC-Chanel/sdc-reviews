const cluster = require('cluster');
const { cpus } = require('node:os');
const process = require('node:process');
const app = require('./index.js');

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(app.get('port'), () => { console.log(`Worker ${process.pid} listening on http://localhost:${app.get('port')}`); });
}
