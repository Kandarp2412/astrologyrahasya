module.exports = (sequelize, Sequelize) => {
  const user_profile = sequelize.define(
    "user_profile",
    {
      name: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      // time: {
      //   type: Sequelize.INTEGER,
      // },
      birthplace: {
        type: Sequelize.TEXT,
      },
      moon_sign: {
        type: Sequelize.TEXT,
      },
    },
    { timestamps: true }
  );
  return user_profile;
};
