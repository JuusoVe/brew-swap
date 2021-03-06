import express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './routes';
import { loadErrorHandlers } from './utils/errorHandler';
import session from 'express-session';
import helmet from "helmet";
import compression from "compression";
import { SESSION_SECRET } from "./utils/secrets";
import './db'; // initialize database
import './utils/passport';
import cors from 'cors';
import path from 'path';



const app: Application = express();

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 60000
    },
    resave           : false,
    saveUninitialized: false
  }
));
app.use('/api', MainRouter);

if (process.env.NODE_ENV === 'test') {
  app.use(express.static('build'));

  const buildPath = path.resolve(__dirname, '../build');

  app.get('/*', function (_req, res) {
    res.sendFile('index.html', { root: buildPath });
  });

}



loadErrorHandlers(app);

export default app;