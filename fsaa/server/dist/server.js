'use strict';
import express from 'express';
import path from 'path';
import request from 'request';
const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];
class Server {
  app;
  port = process.env.PORT || 3000;
  static bootstrap() {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({
        limit: '50mb',
        extended: true
    }));
    this.app.use((req, res, next) => {
      res.set({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization'
      });
      // intercept OPTIONS method
      if (req.method === 'OPTIONS') {
          res.sendStatus(200);
      }
      else {
          next();
      }
    });
    this.app.get('/api/data', (req, res) => {
      request('https://storage.googleapis.com/static.aoni.io/demo/user.json',
      (error, response, body) =>{
         res.send(body)
      });  
    });
    this.app.get('*', (req, res) => {
      if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`./public/dist/${req.url}`));
      }
      else {
        res.sendFile(path.resolve('./public/dist/index.html'));
      }
    });
    // Start the server on the provided port
    const serverInstance = this.app.listen(this.port, () => {
      console.log(`http is started ${this.port}`);
    });
    // Catch errors
    this.app.on('error', (error) => {
      console.error( 'ERROR', error);
    });

    process.on('uncaughtException', (error) => {
      console.log( error);
    });
    // const end: bigint = process.hrtime.bigint();
    // console.log(`Constructor took ${end - start} nanoseconds`);
  }
}
// Bootstrap the server, so it is actually started
const server = Server.bootstrap();
export default server.app;