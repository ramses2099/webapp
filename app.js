import express from 'express';
import debug from 'debug';
import chalk  from 'chalk';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import  path  from 'path';
import { sessionsRouter } from './src/routers/sessionsRouter.js';
import { adminRouter } from './src/routers/adminRouter.js';

const debugs = debug('app');
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public/')));
//

//set variable views
app.set('views','./src/views');
app.set('view engine','ejs');
//

//router
app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);


app.get('/', (req, res) => {
  res.render('index',{title:'test', data:['a','b','c']});
})

app.listen(PORT, () => {
    debugs(`webapp listening on port ${chalk.green(PORT)}`);
})