const supertest = require('supertest');
const app = require('./index');
const http = require('http');
const jwt = require('jsonwebtoken');
const { User, Hospital, Score } = require('./db/models');

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
});

describe('/hospitals', () => {
  const endpoint = '/hospitals';
  let hospital = {};

  beforeAll(async () => {
    await Hospital.destroy({ where: {}, truncate: true, cascade: true });
  });

  describe('GET', () => {
    beforeEach(async () => {
      hospital = await createHospital();
    });

    afterEach(async () => {
      await hospital.destroy();
    });

    it('should respond to the GET method', async () => {
      const res = await request.get(endpoint);

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toEqual({
        address: 'Lolipop street',
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
      address: 'Lolipop street',
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

    describe('user is authenticated', () => {
      it('should create a new hospital when user is authenticated', async () => {
        const accessToken = await generateAccessToken();
        const res = await request
          .post(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(payload);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
          address: 'Lolipop street',
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
        const accessToken = await generateAccessToken();

        await request
          .post(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(payload);

        expect(findCoordinates).toHaveBeenCalled();
      });
    });

    describe('user is NOT authenticated', () => {
      it('should create a new hospital when user is authenticated', async () => {
        const res = await request.post(endpoint).send(payload);

        expect(res.statusCode).toEqual(403);
        expect(res.body).toEqual('Not allowed');
      });

      it('should call findCoordinates', async () => {
        await request.post(endpoint).send(payload);

        expect(findCoordinates).not.toHaveBeenCalled();
      });
    });
  });
});

describe('/login', () => {
  const endpoint = '/login';
  let user = {};

  beforeAll(async () => {
    user = await createUser();
  });

  describe('POST', () => {
    it('should return a token in the response body', async () => {
      const payload = {
        email: 'martacolombas@gmail.com',
        password: 'pass',
      };
      const res = await request.post(endpoint).send(payload);

      expect(res.statusCode).toEqual(202);
      expect(res.body).toMatchObject({
        name: 'Marta Colombas',
        email: 'martacolombas@gmail.com',
        role: 'Celadora',
        token: expect.any(String),
      });
    });
  });
});

describe('/score', () => {
  const endpoint = '/score';

  describe('POST', () => {
    beforeEach(async () => {
      await Score.destroy({ where: {}, truncate: true, cascade: true });

      jest.resetAllMocks();
    });

    afterEach(async () => {
      await Score.destroy({ where: {}, truncate: true, cascade: true });
    });

    describe('user is authenticated', () => {
      it('should create a new score', async () => {
        const hospital = await createHospital();
        const user = await createUser();
        const accessToken = await generateAccessToken();
        const payload = {
          userId: user.id,
          hospitalId: hospital.id,
          score: 5,
        };
        const res = await request
          .post(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(payload);
        await hospital.reload();

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
          createdAt: expect.any(String),
          hospitalId: payload.hospitalId,
          score: payload.score,
          id: expect.any(Number),
          updatedAt: expect.any(String),
          userId: payload.userId,
        });
        expect(hospital.status).toBe(5);
      });
    });

    describe('user is NOT authenticated', () => {
      it('should NOT allow to create a hospital', async () => {
        const hospital = await createHospital();
        const user = await createUser();
        const payload = {
          userId: user.id,
          hospitalId: hospital.id,
          score: 1,
        };
        const res = await request.post(endpoint).send(payload);

        expect(res.statusCode).toEqual(403);
        expect(res.body).toEqual('Not allowed');
      });
    });
  });
});

async function generateAccessToken() {
  const user = await createUser();
  return jwt.sign({ email: user.email }, process.env.ACCESSTOKEN);
}

async function createHospital() {
  const findings = await Hospital.findOrCreate({
    where: {
      name: 'Plural Engine Hospital',
      address: 'Lolipop street',
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
      geometryLat: '1234',
      geometryLng: '1234',
    },
  });
  return findings[0];
}

async function createUser() {
  const hospital = await createHospital();
  const user = await User.findOne({
    where: {
      name: 'Marta Colombas',
      email: 'martacolombas@gmail.com',
      role: 'Celadora',
      HospitalId: hospital.id,
    },
  });

  return (
    user ||
    (await User.create({
      name: 'Marta Colombas',
      email: 'martacolombas@gmail.com',
      role: 'Celadora',
      password: 'pass',
      HospitalId: hospital.id,
    }))
  );
}
