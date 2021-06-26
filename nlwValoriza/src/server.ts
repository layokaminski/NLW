import 'reflect-metadata';
import express, { Request, Response, NextFunction } from "express";
import { router } from './routes';

import './database';

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

});

app.listen(3000, () => console.log('Server is running'));
