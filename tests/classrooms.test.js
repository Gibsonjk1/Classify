require("dotenv").config();
const request = require('supertest');
const mongodb = require("../db/connection");
const { app } = require("../server");

jest.setTimeout(30000); // Set timeout to 30 seconds for DB operations

describe('classroom API Endpoints', () => {
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

  test('should return all classroom for GET /classrooms', async () => {
    const res = await request(app)
      .get('/classrooms')
      .expect(200);
    expect(res.body).not.toBe(null);
  });

  test('should create new classroom', async () => {
    
    const classroom = {
        classroomId: "Eng201",
        roomNumber: "201",
        buildingId: "ENG",
        buildingName: "Engineering",
        capacity: 40
    };

    const res = await request(app)
      .post('/classrooms/')
      .send(classroom)
      .expect(201);
  });

  test('should return created classroom', async () => {
    const res = await request(app)
      .get('/classrooms/Eng201')
      .expect(200);
    expect(res.body).not.toBe(null);
    expect (res.body.classroomId).toBe('Eng201');
    expect (res.body.buildingName).toBe('Engineering');
    expect (res.body.roomNumber).toBe('201');
    expect (res.body.capacity).toBe(40);
    expect (res.body).toBeInstanceOf(Object);
  });

  test('should edit created classroom', async () => {
    
    const classroom = {
        classroomId: "Eng201",
        roomNumber: "201",
        buildingId: "ENG",
        buildingName: "English",
        capacity: 42
    };

    const res = await request(app)
      .put('/classrooms/Eng201')
      .send(classroom)
      .expect(204);
  });

  test('should return updated classroom', async () => {
    const res = await request(app)
      .get('/classrooms/Eng201')
      .expect(200);
    expect(res.body).not.toBe(null);
    expect (res.body.classroomId).toBe('Eng201');
    expect (res.body.buildingName).toBe('English');
    expect (res.body.roomNumber).toBe('201');
    expect (res.body.capacity).toBe(42);
    expect (res.body).toBeInstanceOf(Object);
  });

  test('should delete Classroom', async () => {
    const res = await request(app)
      .delete('/classrooms/Eng201')
      .expect(204);
  });
});