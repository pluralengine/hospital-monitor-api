const supertest = require('supertest');
const app = require('./index');
const http = require('http');
const { User, Hospital } = require('./db/models');

jest.mock('./controllers/utils');
const { findCoordinates } = require('./controllers/utils');

let server;
let request;

beforeEach(done => {
  server = http.createServer(app);
  server.listen(done);
  request = supertest(server);
});

afterEach(done => {
  server.close(done);
});

describe('/users', () => {
  const endpoint = '/users';
  let user = {};
  let hospital = {};

  beforeAll(async () => {
    hospital = await Hospital.create({
      name: 'Plural Engine Hospital',
      address: 'Lolipop street',
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

      const res = await request.post(endpoint).send(payload);

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
      const res = await request.get(endpoint);

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

  describe('GET', () => {
    beforeEach(async () => {
      hospital = await Hospital.create({
        name: 'Plural Engine Hospital',
        address: 'C/ Pau Alsina 123',
        phoneNum: '680178921',
        areas: 'Barcelona',
        provinces: 'Barcelona',
        regionsCcaa: 'BARCELONA',
        postcode: '08024',
        bedNum: 100,
        type: 'PSIQUIÁTRICO',
        dependencyType: 'COMUNIDAD AUTÓNOMA',
        funcDependency: 'SERVICIO VASCO DE SALUD-OSAKIDETZA',
        email: 'pluralengine@gmail.com',
        geometryLat: 1234,
        geometryLng: 1234,
      });
    });

    afterEach(async () => {
      await hospital.destroy();
    });

    it('should respond to the GET method', async () => {
      const res = await request.get(endpoint);

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toEqual({
        address: 'C/ Pau Alsina 123',
        areas: 'Barcelona',
        bedNum: 100,
        createdAt: expect.any(String),
        dependencyType: 'COMUNIDAD AUTÓNOMA',
        email: 'pluralengine@gmail.com',
        funcDependency: 'SERVICIO VASCO DE SALUD-OSAKIDETZA',
        geometryLat: '1234',
        geometryLng: '1234',
        id: expect.any(Number),
        name: 'Plural Engine Hospital',
        phoneNum: '680178921',
        postcode: 8024,
        provinces: 'Barcelona',
        regionsCcaa: 'BARCELONA',
        status: null,
        type: 'PSIQUIÁTRICO',
        updatedAt: expect.any(String),
      });
    });
  });

  describe('POST', () => {
    beforeEach(async () => {
      await Hospital.destroy({ where: {}, truncate: true, cascade: true });
      jest.resetAllMocks();
      findCoordinates.mockResolvedValue(
        Promise.resolve({ lat: 1234, lng: 1234 })
      );
    });

    afterEach(async () => {
      await Hospital.destroy({ where: {}, truncate: true, cascade: true });
    });

    const payload = {
      address: 'C/ Pau Alsina 123',
      areas: 'Barcelona',
      bedNum: 100,
      dependencyType: 'COMUNIDAD AUTÓNOMA',
      email: 'pluralengine@gmail.com',
      funcDependency: 'SERVICIO VASCO DE SALUD-OSAKIDETZA',
      name: 'Plural Engine Hospital',
      phoneNum: '680178921',
      postcode: 8024,
      provinces: 'Barcelona',
      regionsCcaa: 'BARCELONA',
      type: 'PSIQUIÁTRICO',
    };

    it('should create a new hospital', async () => {
      const res = await request.post(endpoint).send(payload);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({
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
        phoneNum: '680178921',
        postcode: 8024,
        provinces: 'Barcelona',
        regionsCcaa: 'BARCELONA',
        status: null,
        type: 'PSIQUIÁTRICO',
        updatedAt: expect.any(String),
      });
    });

    it('should call findCoordinates', async () => {
      await request.post(endpoint).send(payload);

      expect(findCoordinates).toHaveBeenCalled();
    });
  });
});
