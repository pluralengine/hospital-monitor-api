module.exports = (sequelize, type, ...args) => {
  return sequelize.define(
    'user',
    {
      userid: {
        type: type.UUIDV4,
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING,
      email: type.STRING,
      hospitalId: {
        type: type.INTEGER,
        references: {
          model: args.Hospital,
          key: 'hospitalid',
        },
      },
      role: type.STRING,
    },
    {
      timestamps: true,
    }
  );
};
