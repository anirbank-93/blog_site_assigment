import dotenv from 'dotenv';

dotenv.config();

const db_config = {
  HOST: process.env.HOST,
  DB_PORT: process.env.DB_PORT,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: process.env.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default db_config;
