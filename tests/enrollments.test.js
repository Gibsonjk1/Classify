require("dotenv").config();
const request = require('supertest');
const mongodb = require("../db/connection");
const { app } = require("../server");

jest.setTimeout(30000); // Set timeout to 30 seconds for DB operations

describe('Enrollment API Endpoints', () => {
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

  test('should return all Enrollments for GET /enrollments', async () => {
    const res = await request(app)
      .get('/enrollments')
      .expect(200);
    expect(res.body).not.toBe(null);
  });

  test('should create new enrollment', async () => {
    
    const enrollment = {
      enrollment_id: "0987654321",
        studentId: "6740f1a5c9e6f9a1b1234567",
        sectionId: "6740f1a5c9e6f9a1b3333333",
        status: "enrolled",
        enrolledAt: "2025-08-20T12:00:00Z",
        grade: "B-"
    };

    const res = await request(app)
      .post('/enrollments/')
      .send(enrollment)
      .expect(201);
  });

  test('should return created enrollment', async () => {
    const res = await request(app)
      .get('/enrollments/0987654321')
      .expect(200);
    expect(res.body).not.toBe(null);
    expect (res.body.studentId).toBe('6740f1a5c9e6f9a1b1234567');
    expect (res.body.sectionId).toBe('6740f1a5c9e6f9a1b3333333');
    expect (res.body.grade).toBe('B-');
    expect (res.body).toBeInstanceOf(Object);
  });

  test('should edit created enrollment', async () => {
    
    const enrollment = {
        enrollment_id: "0987654321",
        studentId: "6740f1a5c9e6f9a1b1234567",
        sectionId: "6740f1a5c9e6f9a1b3333333",
        status: "enrolled",
        enrolledAt: "2025-08-20T12:00:00Z",
        grade: "A+"
    };

    const res = await request(app)
      .put('/enrollments/0987654321')
      .send(enrollment)
      .expect(204);
  });

  test('should return updated enrollment', async () => {
    const res = await request(app)
      .get('/enrollments/0987654321')
      .expect(200);
    expect(res.body).not.toBe(null);
    expect (res.body.enrollment_id).toBe("0987654321");
    expect (res.body.grade).toBe('A+');
    expect (res.body).toBeInstanceOf(Object);
  });

  test('should delete enrollment', async () => {
    const res = await request(app)
      .delete('/enrollments/0987654321')
      .expect(204);
  });
});