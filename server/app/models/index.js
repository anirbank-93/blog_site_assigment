import Sequelize from 'sequelize';

import config from '../config/db.config.js';

import userModel from './user.model.js';
import refreshTokenModel from './refreshToken.model.js';
import postModel from './post.model.js';
import commentModel from './comment.mdel.js';

const SEQUELIZE = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  // operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = SEQUELIZE;

db.user = userModel(SEQUELIZE, Sequelize);
db.refreshToken = refreshTokenModel(SEQUELIZE, Sequelize);
db.post = postModel(SEQUELIZE, Sequelize);
db.comments = commentModel(SEQUELIZE, Sequelize);

db.refreshToken.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id' });
db.user.hasOne(db.refreshToken, { foreignKey: 'userId', targetKey: 'id' });

db.post.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id' });
db.user.hasMany(db.post, { foreignKey: 'userId', targetKey: 'id' });

db.comments.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id' });
db.post.hasMany(db.comments, { foreignKey: 'postId', targetKey: 'id' });

export default db;
