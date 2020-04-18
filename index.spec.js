const supertest = require('supertest');
const app = require('./index');
const http = require('http');
const jwt = require('jsonwebtoken');
const { User, Hospital, Score, Pharmacy, Product } = require('./db/models');

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
    hospital = await createHospital();
    user = await createUser();
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
      expect(res.body).toEqual({
        id: expect.any(Number),
        email: 'test@pluralengine.com',
        name: 'Plural Engine Engineer',
        role: 'Engineer',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        HospitalId: hospital.id,
      });
      expect(res.body).not.toHaveProperty('password');
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
        expect(res.body).toEqual({ error: 'Not allowed' });
      });

      it('should call findCoordinates', async () => {
        await request.post(endpoint).send(payload);

        expect(findCoordinates).not.toHaveBeenCalled();
      });
    });
  });
});

describe('/hospitals/<id>', () => {
  const endpoint = '/hospitals';
  let hospital = {};

  beforeAll(async () => {
    await Hospital.destroy({ where: {}, truncate: true, cascade: true });
  });

  describe('GET', () => {
    beforeEach(async () => {
      hospital = await createHospital();
    });

    it('should respond to the GET method', async () => {
      const res = await request.get(`${endpoint}/${hospital.id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
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
      expect(res.body).toEqual({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        token: expect.any(String),
        hospitalId: user.HospitalId,
      });
      expect(res.body).not.toHaveProperty('password');
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
        expect(res.body).toEqual({ error: 'Not allowed' });
      });
    });
  });
});

describe('/pharmacies', () => {
  const endpoint = '/pharmacies';
  let pharmacy = {};

  beforeAll(async () => {
    await Pharmacy.destroy({ where: {}, truncate: true, cascade: true });
  });

  describe('GET', () => {
    beforeEach(async () => {
      pharmacy = await createPharmacy();
    });

    afterEach(async () => {
      await pharmacy.destroy();
    });

    it('should respond to the GET method', async () => {
      const res = await request.get(endpoint);

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toEqual({
        id: pharmacy.id,
        name: 'Plural Engine Pharmacy',
        centerCode: '1234',
        address: 'Lolipop street',
        phoneNum: '680178921',
        areas: 'Barcelona',
        postcode: 8024,
        provinces: 'Barcelona',
        regionsCcaa: 'BARCELONA',
        email: 'pluralengine@gmail.com',
        geometryLat: '1234',
        geometryLng: '1234',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        UserId: pharmacy.UserId,
      });
    });
  });
});

describe('/pharmacies/<id>', () => {
  const endpoint = '/pharmacies';
  let pharmacy = {};
  let product = {};

  beforeAll(async () => {
    await Pharmacy.destroy({ where: {}, truncate: true, cascade: true });
  });

  describe('GET', () => {
    beforeEach(async () => {
      pharmacy = await createPharmacy();
      product = await createProduct();
    });

    afterEach(async () => {
      await pharmacy.destroy();
    });

    it('should retrieve all the pharmacy information by id', async () => {
      const res = await request.get(`${endpoint}/${pharmacy.id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        id: pharmacy.id,
        name: 'Plural Engine Pharmacy',
        centerCode: '1234',
        address: 'Lolipop street',
        phoneNum: '680178921',
        areas: 'Barcelona',
        postcode: 8024,
        provinces: 'Barcelona',
        regionsCcaa: 'BARCELONA',
        email: 'pluralengine@gmail.com',
        geometryLat: '1234',
        geometryLng: '1234',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        UserId: pharmacy.UserId,
        products: [],
      });
    });
    it('should fail when the pharmacy with id does not exist', async () => {
      const res = await request.get(`${endpoint}/123456789`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: 'The pharmacy with id 123456789 does not exist',
      });
    });
  });
});

describe('/user/pharmacy', () => {
  const endpoint = '/user/pharmacy';
  let pharmacy = {};
  let product = {};

  beforeAll(async () => {
    await Pharmacy.destroy({ where: {}, truncate: true, cascade: true });
  });

  describe('GET', () => {
    beforeEach(async () => {
      pharmacy = await createPharmacy();
      product = await createProduct();
    });

    afterEach(async () => {
      await pharmacy.destroy();
    });

    it("should return the user's pharmacy information", async () => {
      const accessToken = await generateAccessToken();
      await pharmacy.addProduct(product);
      const res = await request
        .get(endpoint)
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        id: pharmacy.id,
        name: 'Plural Engine Pharmacy',
        centerCode: '1234',
        address: 'Lolipop street',
        phoneNum: '680178921',
        areas: 'Barcelona',
        postcode: 8024,
        provinces: 'Barcelona',
        regionsCcaa: 'BARCELONA',
        email: 'pluralengine@gmail.com',
        geometryLat: '1234',
        geometryLng: '1234',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        UserId: pharmacy.UserId,
        products: [{ id: product.id, name: product.name }],
      });
    });
  });
});

describe('/user/pharmacy/stock', () => {
  const endpoint = '/user/pharmacy/stock';
  let pharmacy = {};
  let product = {};

  beforeAll(async () => {
    await Pharmacy.destroy({ where: {}, truncate: true, cascade: true });
  });

  describe('PUT', () => {
    beforeEach(async () => {
      pharmacy = await createPharmacy();
      product = await createProduct();
    });

    afterEach(async () => {
      await pharmacy.destroy();
    });

    it('should add a product to the pharmacy stock', async () => {
      const accessToken = await generateAccessToken();
      const payload = {
        productId: product.id,
        stock: true,
      };
      const res = await request
        .put(endpoint)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(payload);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        id: pharmacy.id,
        name: 'Plural Engine Pharmacy',
        centerCode: '1234',
        address: 'Lolipop street',
        phoneNum: '680178921',
        areas: 'Barcelona',
        postcode: 8024,
        provinces: 'Barcelona',
        regionsCcaa: 'BARCELONA',
        email: 'pluralengine@gmail.com',
        geometryLat: '1234',
        geometryLng: '1234',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        UserId: pharmacy.UserId,
        products: [{ id: product.id, name: product.name }],
      });
    });

    it('should remove a product from the pharmacy stock', async () => {
      const accessToken = await generateAccessToken();
      const payload = {
        productId: product.id,
        stock: false,
      };
      await pharmacy.addProduct(product);
      const res = await request
        .put(endpoint)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(payload);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        id: pharmacy.id,
        name: 'Plural Engine Pharmacy',
        centerCode: '1234',
        address: 'Lolipop street',
        phoneNum: '680178921',
        areas: 'Barcelona',
        postcode: 8024,
        provinces: 'Barcelona',
        regionsCcaa: 'BARCELONA',
        email: 'pluralengine@gmail.com',
        geometryLat: '1234',
        geometryLng: '1234',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        UserId: pharmacy.UserId,
        products: [],
      });
    });

    it('should fail if the product does not exist', async () => {
      const accessToken = await generateAccessToken();
      const payload = {
        productId: 50000,
        stock: true,
      };
      const res = await request
        .put(endpoint)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(payload);

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: 'The product with id 50000 does not exist',
      });
    });
  });
});

describe('/provinces', () => {
  const endpoint = '/provinces';
  const provinces = require('./mocks/provinces.js');

  it('should return the list of provinces for the pharmacies', async () => {
    const res = await request.get(endpoint);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(52);
    expect(res.body).toEqual(provinces);
  });
});

describe('/products', () => {
  const endpoint = '/products';
  let product = {};

  beforeAll(async () => {
    await Product.destroy({ where: {}, truncate: true, cascade: true });
  });

  describe('GET', () => {
    beforeEach(async () => {
      product = await createProduct();
    });

    afterEach(async () => {
      await product.destroy();
    });

    it('should retrieve all the products', async () => {
      const res = await request.get(endpoint);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        {
          id: product.id,
          name: 'Satisfier 3000',
          photo: 'some/photos.png',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]);
    });
  });
});

async function generateAccessToken() {
  const user = await createUser();
  return jwt.sign({ email: user.email }, process.env.ACCESSTOKEN);
}

async function createPharmacy() {
  const user = await createUser();
  const findings = await Pharmacy.findOrCreate({
    where: {
      name: 'Plural Engine Pharmacy',
      centerCode: '1234',
      address: 'Lolipop street',
      phoneNum: '680178921',
      areas: 'Barcelona',
      provinces: 'Barcelona',
      regionsCcaa: 'BARCELONA',
      postcode: '08024',
      email: 'pluralengine@gmail.com',
      geometryLat: '1234',
      geometryLng: '1234',
      UserId: user.id,
    },
  });
  return findings[0];
}

async function createProduct() {
  const findings = await Product.findOrCreate({
    where: {
      name: 'Satisfier 3000',
      photo: 'some/photos.png',
    },
  });
  return findings[0];
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
