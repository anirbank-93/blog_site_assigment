const createPostModel = (sequelize, Sequelize) => {
  const POST = sequelize.define('posts', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return POST;
};

export default createPostModel;
