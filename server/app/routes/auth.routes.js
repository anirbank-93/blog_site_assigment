import checkDuplicateUsername from '../middleware/checkDuplicateUsername.js';
import {
  signup,
  signin,
  refreshToken,
} from '../controllers/auth.controller.js';

export default function (app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/auth/signup', [checkDuplicateUsername], signup);

  app.post('/api/auth/signin', signin);

  app.post('/api/auth/refreshtoken', refreshToken);
}
