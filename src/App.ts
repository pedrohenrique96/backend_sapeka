import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './app/routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import './database';

const App = (): express.Express => {
  const server = express();

  server.use(express.json());
  server.use(routes);
  server.use(cors());
  server.use('/files', express.static(uploadConfig.directory));

  server.use(
    (err: Error, request: Request, response: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return response
          .status(err.statusCode)
          .json({ status: 'error', message: err.message });
      }

      console.error(err);

      return response
        .status(500)
        .json({ status: 'error', message: 'Internal server error' });
    },
  );

  return server;
};

export default App;
