import express from 'express';
import bodyParser from 'body-parser';

import postsRoutes from './routes/posts';
import userRoutes from './routes/users';
import categoriesRoutes from './routes/categories';
import tokenRoutes from './routes/token';
import pagesRoutes from './routes/pages';
import emailsRoutes from './routes/emails';

import errorHandler from './middlewares/error-handler';
import unHandledRoutes from './middlewares/un-handled-routes';
import corsHeaders from './middlewares/cors';
import appStartUp from './startup/app';
import envsCheck from './startup/envs';

envsCheck();
const app = express();

app.use(bodyParser.json());
app.use(corsHeaders);
app.use('/api/posts', postsRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/token', tokenRoutes);
app.use('/api/emails', emailsRoutes);
app.use(unHandledRoutes);
app.use(errorHandler);

export default appStartUp(app);
