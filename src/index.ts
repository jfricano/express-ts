import express from 'express';
import router from './routes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/LoginController';
import { router as controllerRouter } from './controllers/decorators';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['string'] }));
app.use(router);
app.use(controllerRouter);

app.listen(3000, () => console.log('listening on port 3000'));
