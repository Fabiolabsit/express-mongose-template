import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import globalErrorHandler from './app/errors/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();
// cors
app.use(cors());

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the path to the views directory
app.set('views', path.join(__dirname, '../views'));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/', routes);

//Welcome route
app.get('/', async (req: Request, res: Response) => {
  res.render('welcome', { port: process.env.PORT });
});

// Error handling
app.use(globalErrorHandler);

export default app;
