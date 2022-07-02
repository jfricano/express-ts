import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/LoginController';
import AppRouter from './Router';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['string'] }));
app.use(AppRouter.router);

app.listen(3000, () => console.log('listening on port 3000'));
