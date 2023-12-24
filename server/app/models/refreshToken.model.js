import config from '../config/auth.config.js';
import { v4 } from 'uuid';

const refreshTokenModel = (sequelize, Sequelize) => {
  const RefreshToken = sequelize.define('refresh_tokens', {
    token: {
      type: Sequelize.STRING,
    },
    expiryDate: {
      type: Sequelize.DATE,
    },
  });

  RefreshToken.createToken = async function (user) {
    const EXPIRED_AT = new Date();

    EXPIRED_AT.setSeconds(
      EXPIRED_AT.getSeconds() + config.jwtRefreshExpiration
    );

    let _token = v4();

    let refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: EXPIRED_AT.getTime(),
    });

    return refreshToken.token;
  };

  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };

  return RefreshToken;
};

export default refreshTokenModel;
