const createUserModel = (sequelize, Sequelize) => {
  const USER = sequelize.define('users', {
    name: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  return USER;
};

export default createUserModel;
