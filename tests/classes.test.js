require("dotenv").config();
const request = require('supertest');
const mongodb = require("../db/connection");
const { app } = require("../server");

jest.setTimeout(30000); // Set timeout to 30 seconds for DB operations

describe('Classes API Endpoints', () => {
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

  test('should return all classes for GET /classes', async () => {
    const res = await request(app)
      .get('/classes')
      .expect(200);
    expect(res.body).not.toBe(null);
  });

  test('should create new class', async () => {
    
    const newClass = {
    classId: "UBW101",
    title: "Intro to Underwater Basket Weaving",
    credits: 3,
    description: "What's better than basket weaving? Basket weaving... under water!",
    };

    const res = await request(app)
      .post('/classes/')
      .send(newClass)
      .expect(201);
  });

  test('should return created class', async () => {
    const res = await request(app)
      .get('/classes/UBW101')
      .expect(200);
    expect(res.body).not.toBe(null);
    expect (res.body.classId).toBe('UBW101');
    expect (res.body.title).toBe('Intro to Underwater Basket Weaving');
    expect (res.body.credits).toBe('3');
    expect (res.body).toBeInstanceOf(Object);
  });

  test('should edit created class', async () => {
    
    const newClass = {
    classId: "UBW101",
    title: "Intro to Underlava Basket Weaving",
    credits: 2,
    description: "Try to focus while holding your breath... and on fire!",
    };

    const res = await request(app)
      .put('/classes/UBW101')
      .send(newClass)
      .expect(204);
  });

  test('should return updated class', async () => {
    const res = await request(app)
      .get('/classes/UBW101')
      .expect(200);
     expect(res.body).not.toBe(null);
    expect (res.body.classId).toBe('UBW101');
    expect (res.body.title).toBe("Intro to Underlava Basket Weaving");
    expect (res.body.credits).toBe('2');
    expect (res.body).toBeInstanceOf(Object);
  });

  test('should delete class', async () => {
    const res = await request(app)
      .delete('/classes/UBW101')
      .expect(204);
  });
});