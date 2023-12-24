import { verifyToken, catchError } from '../middleware/authJwt.js';
import { allAccess, userBoard } from '../controllers/user.controller.js';
import { uploadOneImg, getImg } from '../controllers/image.controller.js';

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default function (app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/test/all', allAccess);

  app.get('/api/test/user', [verifyToken], userBoard);

  app.post(
    '/api/file/upload',
    [verifyToken],
    upload.single('file'),
    uploadOneImg
  );

  // app.get('/uploads/:path/:file', getImg);
}
