require("dotenv").config();
const request = require('supertest');
const mongodb = require("../db/connection");
const passport = require('passport');
require('../config/passport');
jest.mock('passport', () => ({
  initialize: jest.fn(() => (req, res, next) => next()),
  session: jest.fn(() => (req, res, next) => {
    req.isAuthenticated = () => !!req.user;
    req.logout = (cb) => { req.user = undefined; cb && cb(); };
    next();
  }),
  authenticate: jest.fn(() => (req, res, next) => next()),
  serializeUser: jest.fn(),
  deserializeUser: jest.fn(),
  use: jest.fn(),
}));
const { app } = require("../server");

jest.setTimeout(30000); // Set timeout to 30 seconds for DB operations

describe('Student API Endpoints', () => {
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

describe('GET /auth/google', () => {
  test('should redirect on successful authentication', async () => {
   
    passport.authenticate.mockImplementation((strategy, options, callback) => (req, res, next) => {
      const mockUser = { username: 'tester@test.com', password: 'BigFatTest123!' };
      req.user = mockUser; 
     
      next();
    });

    
    const response = await request(app)
      .get('/auth/google/callback') 
      .expect(302); 

    expect(passport.authenticate).toHaveBeenCalledWith('google', {'scope': ['profile', 'email']});
   
  });
});

  test('should return all students for GET /students', async () => {
    const res = await request(app)
      .get('/students')
      .set('Authorization', 'Bearer test-token')
      .expect(200);
    expect(res.body).not.toBe(null);
  });

  test('should create new student', async () => {
    
    const student = {
      studentId: "STU543210",
      firstName: "Kevin",
      lastName: "McCallister",
      email: "HomeAlone@Imallalone.com",
      major: "CS",
      createdAt: "2025-01-01T00:00:00.000Z"
    };

    const res = await request(app)
      .post('/students/')
      .set('Authorization', 'Bearer test-token')
      .send(student)
      .expect(201);
  });

  test('should return created student', async () => {
    const res = await request(app)
      .get('/students/STU543210')
      .set('Authorization', 'Bearer test-token')
      .expect(200);
    expect(res.body).not.toBe(null);
    expect (res.body.studentId).toBe('STU543210');
    expect (res.body.firstName).toBe('Kevin');
    expect (res.body.lastName).toBe('McCallister');
    expect (res.body).toBeInstanceOf(Object);
  });

  test('should edit created student', async () => {
    
    const student = {
      studentId: "STU543210",
      firstName: "Buzz",
      lastName: "McCallister",
      email: "StillHomeAlone@Imallalone.com",
      major: "CS",
      createdAt: "2025-01-01T00:00:00.000Z"
    };

    const res = await request(app)
      .put('/students/STU543210')
      .set('Authorization', 'Bearer test-token')
      .send(student)
      .expect(204);
  });

  test('should return updated student', async () => {
    const res = await request(app)
      .get('/students/STU543210')
      .set('Authorization', 'Bearer test-token')
      .expect(200);
    expect(res.body).not.toBe(null);
    expect (res.body.studentId).toBe('STU543210');
    expect (res.body.firstName).toBe('Buzz');
    expect (res.body.lastName).toBe('McCallister');
    expect (res.body).toBeInstanceOf(Object);
  });

  test('should delete student', async () => {
    const res = await request(app)
      .delete('/students/STU543210')
      .set('Authorization', 'Bearer test-token')
      .expect(204);
  });
});