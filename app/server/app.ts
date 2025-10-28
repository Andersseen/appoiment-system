import cors from 'cors';
import {
  colorRoute,
  sectionRoute,
  eventRoute,
  clientRoute,
  markRoute,
} from './routes';
import { ACTION, MessageFromMain, PORT } from '../global';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

export class expressServer {
  public app;
  public server;

  constructor() {
    this.app = express();
  }

  run() {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
    //COLORS
    this.app.use('/colors', colorRoute);
    //SECTIONS
    this.app.use('/sections', sectionRoute);
    //EVENTS
    this.app.use('/events', eventRoute);
    //CLIENTS
    this.app.use('/clients', clientRoute);
    //MARKS
    this.app.use('/marks', markRoute);

    const port = Number(process.env.PORT || PORT || 1224);
    const host = '0.0.0.0';
    this.server = this.app.listen(port, host, () => {
      console.log(`✅ Server running on http://${host}:${port}`);
    });
  }

  close() {
    this.server.close((err: any) => {
      if (err) console.log(err);
    });
  }
}

// process.on('message', (message: MessageFromMain) => {
//   const server = new expressServer();
//   console.log(message.action);
//   if (message.action === ACTION.start) {
//     server.run();
//   }
//   if (message.action === ACTION.close) {
//     server.close();
//   }
// });
