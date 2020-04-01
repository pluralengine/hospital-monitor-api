module.exports = (sequelize, type) => {
  return sequelize.define(
    'hospital',
    {
      id: {
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
      typeofdependency: type.STRING,
      funcdependency: type.STRING,
      email: type.STRING,
      hospitalid: type.INTEGER,
      geometry_lat: type.STRING,
      geometry_lng: type.STRING,
      status: type.INTEGER,
    },
    {
      timestamps: false,
    }
  );
};
