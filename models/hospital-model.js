module.exports = (sequelize, type) => {
  return sequelize.define(
    'hospital',
    {
      hospitalid: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING,
      address: type.STRING,
      phonenum: type.STRING,
      areas: type.STRING,
      provinces: type.STRING,
      regionsccaa: type.STRING,
      postcode: type.INTEGER,
      bednum: type.INTEGER,
      type: type.STRING,
      type_of_dependency: type.STRING,
      func_dependency: type.STRING,
      email: type.STRING,
      geometry_lat: type.STRING,
      geometry_lng: type.STRING,
      status: type.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
};
