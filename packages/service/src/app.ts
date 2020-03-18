import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import postsRoutes from './routes/posts';
import userRoutes from './routes/users';
import categoriesRoutes from './routes/categories';

import errorHandler from './middlewares/error-handler';
import unHandledRoutes from './middlewares/un-handled-routes';
import corsHeaders from './middlewares/cors';

config();
const app = express();

app.use(bodyParser.json());
app.use(corsHeaders);
app.use('/api/posts', postsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', userRoutes);
app.use(unHandledRoutes);
app.use(errorHandler);

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log('Server working + connected to database');
  })
  .catch((err: Error) => console.log(err));
