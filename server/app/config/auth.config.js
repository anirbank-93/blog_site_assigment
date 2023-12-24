import dotenv from 'dotenv';

dotenv.config();

const config = {
  access_secret_key: process.env.ACCESS_SECRET_KEY,
  refresh_secret_key: process.env.REFRESH_SECRET_KEY,
  jwtExpiration: 3600, // 60 mins
  jwtRefreshExpiration: 60, // 1 min
};

export default config;
