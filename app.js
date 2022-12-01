import express from 'express';
import debug from 'debug';
import chalk  from 'chalk';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import  path  from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { passportConfig } from './src/config/passport.js';
import { sessionsRouter } from './src/routers/sessionsRouter.js';
import { adminRouter } from './src/routers/adminRouter.js';
import { authRouter } from './src/routers/authRouter.js';

const debugs = debug('app');
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public/')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret:'globomantics'}));

passportConfig(app);

//

//set variable views
app.set('views','./src/views');
app.set('view engine','ejs');
//

//router
app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
  res.render('index',{title:'test', data:['a','b','c']});
})

app.listen(PORT, () => {
    debugs(`webapp listening on port ${chalk.green(PORT)}`);
})