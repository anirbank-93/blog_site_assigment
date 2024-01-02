const commentModel = (sequelize, Sequelize) => {
    const comment = sequelize.define("comments", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return comment;
}

export default commentModel;