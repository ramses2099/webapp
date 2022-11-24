import express from 'express';
import debug from 'debug';
import chalk  from 'chalk';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import  path  from 'path';

const debugs = debug('app');
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public/')));

debugs(path.join(__dirname,'/public/'));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
    debugs(`Example app listening on port ${chalk.green(port)}`);
})