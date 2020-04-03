module.exports = (sequelize, type) => {
  return sequelize.define(
    'user',
    {
      userid: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING,
      email: type.STRING,
      hospital: type.STRING,
      role: type.STRING,
    },
    {
      timestamps: true,
    }
  );
};
