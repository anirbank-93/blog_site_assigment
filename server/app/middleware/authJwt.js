import jwt from 'jsonwebtoken';

import config from '../config/auth.config.js';
import db from '../models/index.js';

const User = db.user;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: 'Unauthorized! Access Token was expired!' });
  }

  return res.status(401).send({ message: 'Unauthorized!' });
};

const verifyToken = async (req, res, next) => {
  let token = req.headers['x-access-token'].replace('Bearer', '').trim();

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.access_secret_key, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }

    req.userId = decoded.id;
    next();
  });
};

export { verifyToken, catchError };
