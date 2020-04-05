const request = require('supertest');
const app = require('./index');
const { User, Hospital } = require('./db/models');

describe('/users', () => {
  const endpoint = '/users';
  let user = {};
  let hospital = {};

  beforeAll(async () => {
    hospital = await Hospital.create({
      name: 'Plural Engine Hospital',
      address: 'C/ Pau Alsina 123',
      phonenum: 680178921,
      areas: 'Barcelona',
      provinces: 'Barcelona',
      regionsccaa: 'BARCELONA',
      postcode: '08024',
      bednum: 100,
      type: 'PSIQUIÁTRICO',
      type_of_dependency: 'COMUNIDAD AUTÓNOMA',
      func_dependency: 'SERVICIO VASCO DE SALUD-OSAKIDETZA',
      email: 'pluralengine@gmail.com',
    });
    user = await User.create({
      name: 'Marta Colombas',
      email: 'martacolombas@gmail.com',
      role: 'Celadora',
      password: 'pass',
      HospitalId: hospital.id,
    });
  });

  describe('POST', () => {
    it('should create a new user', async () => {
      const payload = {
        email: 'test@pluralengine.com',
        hospitalId: hospital.id,
        name: 'Plural Engine Engineer',
        password: 'pluralengine',
        role: 'Engineer',
      };

      const res = await request(app).post(endpoint).send(payload);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toMatchObject({
        email: 'test@pluralengine.com',
        HospitalId: hospital.id,
        name: 'Plural Engine Engineer',
        password: expect.any(String),
        role: 'Engineer',
      });
    });
  });

  describe('GET', () => {
    it('should respond to the GET method', async () => {
      const res = await request(app).get(endpoint);

      expect(res.statusCode).toBe(200);
    });
  });
});

describe('/hospitals', () => {
  const endpoint = '/hospitals';
  let hospital = {};

  beforeAll(async () => {
    await Hospital.destroy({ where: {}, truncate: true, cascade: true });
  });

  beforeEach(async () => {
    hospital = await Hospital.create({
      name: 'Plural Engine Hospital',
      address: 'C/ Pau Alsina 123',
      phonenum: 680178921,
      areas: 'Barcelona',
      provinces: 'Barcelona',
      regionsccaa: 'BARCELONA',
      postcode: '08024',
      bednum: 100,
      type: 'PSIQUIÁTRICO',
      type_of_dependency: 'COMUNIDAD AUTÓNOMA',
      func_dependency: 'SERVICIO VASCO DE SALUD-OSAKIDETZA',
      email: 'pluralengine@gmail.com',
    });
  });

  afterEach(async () => {
    await hospital.destroy();
  });

  describe('GET', () => {
    it('should respond to the GET method', async () => {
      const res = await request(app).get(endpoint);

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toBe({
        address: 'C/ Pau Alsina 123',
        areas: 'Barcelona',
        bedNum: 100,
        createdAt: expect.any(String),
        dependencyType: 'COMUNIDAD AUTÓNOMA',
        email: 'pluralengine@gmail.com',
        funcDependency: 'SERVICIO VASCO DE SALUD-OSAKIDETZA',
        geometryLat: null,
        geometryLng: null,
        id: expect.any(Number),
        name: 'Plural Engine Hospital',
        phoneNum: 680178921,
        postcode: 8024,
        provinces: 'Barcelona',
        regionsCcaa: 'BARCELONA',
        status: null,
        type: 'PSIQUIÁTRICO',
        updatedAt: expect.any(String),
      });
    });
  });

  xdescribe('POST', () => {
    it('should create a new hospital', async () => {
      const payload = {
        address: 'C/ Pau Alsina 123',
        areas: 'Barcelona',
        bedNum: 100,
        dependencyType: 'COMUNIDAD AUTÓNOMA',
        email: 'pluralengine@gmail.com',
        funcDependency: 'SERVICIO VASCO DE SALUD-OSAKIDETZA',
        name: 'Plural Engine Hospital',
        phoneNum: 680178921,
        postcode: 8024,
        provinces: 'Barcelona',
        regionsCcaa: 'BARCELONA',
        type: 'PSIQUIÁTRICO',
      };

      const res = await request(app).post(endpoint).send(payload);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toMatchObject({
        address: 'C/ Pau Alsina 123',
        areas: 'Barcelona',
        bedNum: 100,
        createdAt: expect.any(String),
        dependencyType: 'COMUNIDAD AUTÓNOMA',
        email: 'pluralengine@gmail.com',
        funcDependency: 'SERVICIO VASCO DE SALUD-OSAKIDETZA',
        geometryLat: null,
        geometryLng: null,
        id: expect.any(Number),
        name: 'Plural Engine Hospital',
        phoneNum: 680178921,
        postcode: 8024,
        provinces: 'Barcelona',
        regionsCcaa: 'BARCELONA',
        status: null,
        type: 'PSIQUIÁTRICO',
        updatedAt: expect.any(String),
      });
    });
  });
});
