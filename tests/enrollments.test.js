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
      enrollmentId: "098765432109876",
        studentId: "STU098765",
        departmentId: "Math",
        status: "enrolled",
        enrolledAt: "2025-08-20T12:00:00Z",
        gpa: "3.2"
    };

    const res = await request(app)
      .post('/enrollments/')
      .send(enrollment)
      .expect(201);
  });

  test('should return created enrollment', async () => {
    const res = await request(app)
      .get('/enrollments/098765432109876')
      .expect(200);
    expect(res.body).not.toBe(null);
    expect (res.body.studentId).toBe('STU098765');
    expect (res.body.departmentId).toBe('Math');
    expect (res.body.gpa).toBe('3.2');
    expect (res.body).toBeInstanceOf(Object);
  });

  test('should edit created enrollment', async () => {
    
    const enrollment = {
        enrollmentId: "098765432109876",
        studentId: "STU098765",
        departmentId: "English",
        status: "enrolled",
        enrolledAt: "2025-08-20T12:00:00Z",
        gpa: "3.5"
    };

    const res = await request(app)
      .put('/enrollments/098765432109876')
      .send(enrollment)
      .expect(204);
  });

  test('should return updated enrollment', async () => {
    const res = await request(app)
      .get('/enrollments/098765432109876')
      .expect(200);
    expect(res.body).not.toBe(null);
    expect (res.body.enrollmentId).toBe("098765432109876");
    expect (res.body.gpa).toBe('3.5');
    expect (res.body.departmentId).toBe('English');
    expect (res.body).toBeInstanceOf(Object);
  });

  test('should delete enrollment', async () => {
    const res = await request(app)
      .delete('/enrollments/098765432109876')
      .expect(204);
  });
});