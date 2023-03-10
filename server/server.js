const cluster = require('cluster');
const { cpus } = require('os');
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
  app.get('/loaderio-72911ad25e5f00426cfbce65cafc2543', (req, res) => res.send('loaderio-72911ad25e5f00426cfbce65cafc2543'));

  app.listen(app.get('port'), () => { console.log(`Worker ${process.pid} listening on http://localhost:${app.get('port')}`); });
}
