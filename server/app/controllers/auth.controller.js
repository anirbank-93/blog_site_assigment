import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import db from '../models/index.js';
import config from '../config/auth.config.js';

const { user: User, refreshToken: RefreshToken } = db;

const Op = db.Sequelize.Op;

export const signup = (req, res) => {
  try {
    // Save User to database
    User.create({
      name: req.body.name,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.pwd, 8),
    });

    res.status(200).send({ message: 'User was registered successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      var passwordIsValid = bcrypt.compareSync(req.body.pwd, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      const token = jwt.sign(user.toJSON(), config.access_secret_key, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);

      res.status(200).json({
        status: true,
        accessToken: token,
        refreshToken: refreshToken,
        data: user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    });
};

export const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (refreshToken == null) {
    return res.status(403).send({ message: 'Refresh Token is required!' });
  }

  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });

    console.log(refreshToken);

    if (!refreshToken) {
      res.status(403).send({ message: 'Refresh token is not in database!' });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).send({
        message: 'Refresh token was expired. Please make a new signin request',
      });
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign(user.toJSON(), config.refresh_secret_key, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
