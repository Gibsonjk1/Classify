require("dotenv").config();
const request = require("supertest");
const mongodb = require("../db/connection");
const { app } = require("../server");
const { json } = require("express");

jest.setTimeout(30000); // Set timeout to 30 seconds for DB operations

describe("Classes API Endpoints", () => {
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

  // return all class sections
  test("should return all class sections for GET /class-sections", async () => {
    const res = await request(app).get("/classes").expect(200);
    expect(res.body).not.toBe(null);
  });

  // create new class section
  test("should create new class-section", async () => {
    const newClassSection = {
      sectionId: "MATH367-001",
      classId: "MATH367",
      semesterId: "winter2029",
      teacherId: "T13356",
      classroomId: "MATHB333",
      meetingTimes: [
        {
          day: "Mon",
          start: "07:30",
          end: "09:30",
        },
        {
          day: "Wed",
          start: "07:30",
          end: "09:30",
        },
        {
          day: "Fri",
          start: "07:30",
          end: "09:30",
        },
      ],
      capacity: 85,
    };

    const res = await request(app)
      .post("/class-sections/")
      .send(newClassSection)
      .expect(201);
  });

  // get class section by sectionId
  test("should return created class section", async () => {
    const res = await request(app)
      .get("/class-sections/MATH367-001")
      .expect(200);
    expect(res.body).not.toBe(null);
    expect(res.body.sectionId).toBe("MATH367-001");
    expect(res.body.classId).toBe("MATH367");
    expect(res.body.semesterId).toBe("winter2029");
    expect(res.body.teacherId).toBe("T13356");
    expect(res.body.classroomId).toBe("MATHB333");
    expect(res.body.meetingTimes).toBeInstanceOf(Object);
    expect(res.body.meetingTimes[0].day).toBe("Mon");
    expect(res.body.meetingTimes[0].start).toBe("07:30");
    expect(res.body.meetingTimes[0].end).toBe("09:30");
    expect(res.body.meetingTimes[1].day).toBe("Wed");
    expect(res.body.meetingTimes[1].start).toBe("07:30");
    expect(res.body.meetingTimes[1].end).toBe("09:30");
    expect(res.body.meetingTimes[2].day).toBe("Fri");
    expect(res.body.meetingTimes[2].start).toBe("07:30");
    expect(res.body.meetingTimes[2].end).toBe("09:30");
    expect(res.body).toBeInstanceOf(Object);
  });

  // update class section by sectionId
  test("should edit created class section", async () => {
    const newClassSection = {
      sectionId: "MATH367-001",
      classId: "MATH367",
      semesterId: "winter2029",
      teacherId: "T12889",
      classroomId: "MATHB250",
      meetingTimes: [
        {
          day: "Mon",
          start: "07:30",
          end: "09:30",
        },
        {
          day: "Wed",
          start: "07:30",
          end: "09:30",
        },
        {
          day: "Fri",
          start: "07:30",
          end: "09:30",
        },
      ],
      capacity: 85,
    };

    const res = await request(app)
      .put("/class-sections/MATH367-001")
      .send(newClassSection)
      .expect(204);
  });

  // get updated class section by sectionId
  test("should return updated class section", async () => {
    const res = await request(app)
      .get("/class-sections/MATH367-001")
      .expect(200);
    expect(res.body).not.toBe(null);
    expect(res.body.sectionId).toBe("MATH367-001");
    expect(res.body.classId).toBe("MATH367");
    expect(res.body.semesterId).toBe("winter2029");
    expect(res.body.teacherId).toBe("T12889");
    expect(res.body.classroomId).toBe("MATHB250");
    expect(res.body.meetingTimes).toBeInstanceOf(Object);
    expect(res.body.meetingTimes[0].day).toBe("Mon");
    expect(res.body.meetingTimes[0].start).toBe("07:30");
    expect(res.body.meetingTimes[0].end).toBe("09:30");
    expect(res.body.meetingTimes[1].day).toBe("Wed");
    expect(res.body.meetingTimes[1].start).toBe("07:30");
    expect(res.body.meetingTimes[1].end).toBe("09:30");
    expect(res.body.meetingTimes[2].day).toBe("Fri");
    expect(res.body.meetingTimes[2].start).toBe("07:30");
    expect(res.body.meetingTimes[2].end).toBe("09:30");
    expect(res.body).toBeInstanceOf(Object);
  });

  // delete class section by sectionId
  test("should delete class section", async () => {
    const res = await request(app).delete("/class-sections/MATH367-001").expect(204);
  });

  // test 404 error message for no sectionId
  test("should return created 404 error message", async () => {
    const res = await request(app)
      .get("/class-sections/MATH367-001")
      .expect(404);
    expect(res.body).not.toBe(null);
    expect(res.body).toBe("No data found with that section id.");
  });
});
