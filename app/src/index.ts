import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import dbConnection from './service/dbConnection.js';
import routes from './service/router.js';

// make environment variables available to all app
dotenv.config();

const app = express();

let db = await dbConnection();

app.use(cors({ origin: 'http://localhost:8081' }));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// no route selected
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'no entity selected' });
});

app.use(routes);
// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
