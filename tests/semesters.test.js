require("dotenv").config();
const request = require('supertest');
const mongodb = require("../db/connection");
const { app } = require("../server");

jest.setTimeout(30000); // Set timeout to 30 seconds for DB operations

describe('Semesters API Endpoints', () => {
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

  test('should return all semesters for GET /semesters', async () => {
    const res = await request(app)
      .get('/semesters')
      .expect(200);
    expect(res.body).not.toBe(null);
  });

  test('should create new semesters', async () => {
    
    const semester = {
       semesterId: "Fall_2099",
        year: 2099,
        term: "Fall",
        startDate: "2099-08-26",
        endDate: "2099-12-13",
        active: false
    };

    const res = await request(app)
      .post('/semesters/')
      .send(semester)
      .expect(201);
  });

  test('should return created semester', async () => {
    const res = await request(app)
      .get('/semesters/Fall_2099')
      .expect(200);
    expect(res.body).not.toBe(null);
    expect (res.body.semesterId).toBe('Fall_2099');
    expect (res.body.year).toBe(2099);
    expect (res.body.term).toBe('Fall');
    expect (res.body).toBeInstanceOf(Object);
  });

  test('should edit created semester', async () => {
    
    const semester = {
       semesterId: "Fall_2099",
        year: 2098,
        term: "Fall",
        startDate: "2098-08-26",
        endDate: "2098-12-13",
        active: false
    };

    const res = await request(app)
      .put('/semesters/Fall_2099')
      .send(semester)
      .expect(204);
  });

  test('should return updated semester', async () => {
    const res = await request(app)
      .get('/semesters/Fall_2099')
      .expect(200);
    expect(res.body).not.toBe(null);
    expect (res.body.year).toBe(2098);
  });

  test('should delete semester', async () => {
    const res = await request(app)
      .delete('/semesters/Fall_2099')
      .expect(204);
  });
});