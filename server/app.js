/** Only lines needed to start a nodejs server with express */
import express from 'express'; //** */
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath, URL, parse } from 'url';

import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';
import postRoutes from './app/routes/post.routes.js';

dotenv.config();

const app = express(); //** */

var corsOptions = {
  origin: 'http://localhost:5051',
};

app.use(cors());

app.use(logger('dev'));
// parse requests of content-type - application/json
// app.use(bodyParser.json({}));
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

import db from './app/models/index.js';
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Synced db');
  })
  .catch((err) => {
    console.log('Failed to sync db due to ', err.message);
  });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Express is working' });
});

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

/** ------------ API for getting images ------------ */
app.use(
  '/uploads',
  (req, res, next) => {
    console.log(req.originalUrl, 'request');
    var filePath = path.join(__dirname, `public${req.originalUrl}`);
    console.log(filePath, 'file path');

    var exists = fs.existsSync(filePath);

    console.log(exists);
    if (!exists) {
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.end('404 Not Found');
      return;
    }

    // Get file extension
    var ext = path.extname(req.originalUrl);
    console.log(ext, 'extension');
    var contentType = '';

    if (ext === '.png') {
      ext = ext.split('.')[1];
      contentType += `image/${ext}`;
    }
    if (ext === '.jpg' || ext === '.jpeg') {
      contentType += 'image/jpeg';
    }

    // res.sendFile(action.toString());
    // Setting the headers
    res.writeHead(200, {
      'Content-Type': contentType,
    });

    // Reading the file
    fs.readFile(filePath, function (err, content) {
      // Serving the image
      res.end(content);
    });
  }
  // express.static(path.join(__dirname + '/public'))
);
/** ------------ API for getting images ------------ */
// app.use('/uploads', express.static('public'));

authRoutes(app);
userRoutes(app);
postRoutes(app);

const PORT = process.env.PORT || 5000; //** */

//** */
app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});

export default app;
