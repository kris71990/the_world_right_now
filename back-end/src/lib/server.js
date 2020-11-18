'use strict';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
// import cors from 'cors';
import HttpError from 'http-errors';

import countryTypeDefs from '../models/country-schema';
import systemTypeDefs from '../models/system-schema';
import resolvers from '../resolvers';
import CountryAPI from '../datasources/country';

import logger from './logger';
// import countryRouter from '../routes/country-router';
// import govSystemRouter from '../routes/gov-system-router';
// import rankingsRouter from '../routes/rankings-router';
// import photoRouter from '../routes/photo-router';
import errorMiddleware from './error-middleware';

mongoose.promise = bluebird;

const app = express();
let server = null;

// app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

// app.use(rankingsRouter);
// app.use(countryRouter);
// app.use(photoRouter);
// app.use(govSystemRouter);

app.all('*', (request, response) => {
  logger.log(logger.INFO, '404 - not found from catch-all');
  return response.sendStatus(404);
});

app.use(errorMiddleware);

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      server = new ApolloServer({ 
        introspection: true,
        playground: true,
        countryTypeDefs,
        systemTypeDefs,
        resolvers,
        dataSources: () => ({
          countryAPI: new CountryAPI(),
        }),
      });
      server.applyMiddleware({ app });
      app.listen({ port: process.env.PORT }, () => {
        logger.log(logger.INFO, `Server listening on port ${process.env.PORT}${server.graphqlPath}`);
      });
    })
    .catch(() => {
      logger.log(logger.ERROR, 'Server failed to start');
      throw new HttpError(400, 'Error starting server');
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'Server disconnected');
      });
    });
};

export { startServer, stopServer };
