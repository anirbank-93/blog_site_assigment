import { verifyToken, catchError } from '../middleware/authJwt.js';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} from '../controllers/post.controller.js';

import dotenv from 'dotenv';

dotenv.config();

export default function (app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Access'
    );
    next();
  });

  app.post('/api/posts', [verifyToken], createPost);
  app.get('/api/posts', [verifyToken], getAllPosts);
  app.get('/api/posts/:id', [verifyToken], getPostById);
  app.put('/api/posts/:id', [verifyToken], updatePost);
  app.delete('/api/posts/:id', [verifyToken], deletePost);
}
