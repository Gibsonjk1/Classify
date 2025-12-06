require("dotenv").config();
const request = require('supertest');
const mongodb = require("../db/connection");
const { app } = require("../server");

jest.setTimeout(30000); // Set timeout to 30 seconds for DB operations

describe('Teacher API Endpoints', () => {
  // Ensure DB connection before running tests
  beforeAll(async () => {
    await new Promise((resolve, reject) => {
      mongodb.initDb((err, db) => {
        if (err) return reject(err);
        resolve(db);
      });
    });
  });

  afterAll(async () => {
    // close the DB connection to allow Jest to exit cleanly
    if (mongodb.closeDb) {
      await mongodb.closeDb();
    }
  });

  test('should return all teachers for GET /Teachers', async () => {
    const res = await request(app)
      .get('/teachers')
      .expect(200);
    expect(res.body).not.toBe(null);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(1);
  });

  test('should create new teacher', async () => {
    
    const teacher = {
    teacherId: "T000",
    firstName: "Mr.",
    lastName: "Rogers",
    email: "MrRogers@neighborhood.edu",
    departments: [
        "Education",
        "Psychology"
    ]
    };

    const res = await request(app)
      .post('/teachers')
      .send(teacher)
      .expect(201);
  });

  test('should return created teacher', async () => {
    const res = await request(app)
      .get('/teachers/T000')
      .expect(200);
    expect(res.body).not.toBe(null);
    expect (res.body.teacherId).toBe('T000');
    expect (res.body.firstName).toBe('Mr.');
    expect (res.body.lastName).toBe('Rogers');
    expect (res.body.email).toBe('mrrogers@neighborhood.edu');
    expect (res.body.departments).toBeInstanceOf(Array);
    expect (res.body).toBeInstanceOf(Object);
  });

  test('should edit created teacher', async () => {
    
    const teacher = {
    teacherId: "T000",
    firstName: "Mrs.",
    lastName: "Rogers",
    email: "MrsRogers@neighborhood.edu",
    departments: [
        "Education",
        "Psychology"
    ]
    };

    const res = await request(app)
      .put('/teachers/T000')
      .send(teacher)
      .expect(204);
  });

  test('should return updated teacher', async () => {
    const res = await request(app)
      .get('/teachers/T000')
      .expect(200);
 expect(res.body).not.toBe(null);
    expect (res.body.teacherId).toBe('T000');
    expect (res.body.firstName).toBe('Mrs.');
    expect (res.body.lastName).toBe('Rogers');
    expect (res.body.email).toBe('mrsrogers@neighborhood.edu');
    expect (res.body.departments).toBeInstanceOf(Array);
    expect (res.body).toBeInstanceOf(Object);
  });

  test('should delete teacher', async () => {
    const res = await request(app)
      .delete('/teachers/T000')
      .expect(204);
  });
});