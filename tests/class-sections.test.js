require("dotenv").config();
const request = require("supertest");
const mongodb = require("../db/connection");
const { app } = require("../server");

jest.setTimeout(30000); // Set timeout to 30 seconds for DB operations

describe("Class Section API Endpoints", () => {
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

  // GET all sections
  test("should return all sections for GET /class-sections", async () => {
    const res = await request(app).get("/class-sections").expect(200);
    expect(res.body).not.toBe(null);
  });

  // POST new section
  // test("should create new class section", async () => {
  //   const section = {
  //     classId: "6740f1a5c9e6f9a1b2328222",
  //     sectionNumber: "213",
  //     semester: "Winter 2029",
  //     teacherId: "6740f1a5c9e6f9a1b9875221",
  //     classroomId: "2690f1a5c9e6f9a1b1112311CS",
  //     meetingTimes: [
  //       {
  //         day: "Mon",
  //         start: "13:15",
  //         end: "14:45",
  //       },
  //       {
  //         day: "Wed",
  //         start: "13:15",
  //         end: "14:45",
  //       },
  //       {
  //         day: "Fri",
  //         start: "13:15",
  //         end: "14:45",
  //       },
  //     ],
  //     capacity: 35,
  //   };

  //   const res = await request(app)
  //     .post("/class-sections")
  //     .send(section)
  //     .expect(201);
  // });

  // GET by id
  test("should return created section", async () => {
    const res = await request(app).get("/class-sections/001").expect(200);
    expect(res.body).not.toBe(null);
    expect(res.body.classId).toBe("6740f1a5c9e6f9a1b2222222");
    expect(res.body.sectionNumber).toBe("001");
    expect(res.body.semester).toBe("Fall 2025");
    expect(res.body.teacherId).toBe("6740f1a5c9e6f9a1b7654321");
    expect(res.body.classroomId).toBe("6740f1a5c9e6f9a1b1111111");
    expect(res.body.meetingTimes).toMatchObject([
      {
        day: "Mon",
        start: "10:00",
        end: "11:15",
      },
      {
        day: "Wed",
        start: "10:00",
        end: "11:15",
      },
    ]);
    expect(res.body.capacity).toBe(40);
    // expect(res.body).toBeInstanceOf(Object);
  });
});

//   test("should edit created section", async () => {
//     const section = {
//       classId: "6740f1a5c9e6f9a1b2328222",
//       sectionNumber: "213",
//       semester: "Fall 2029",
//       teacherId: "9840f1a5c9e6f9a1b9875221",
//       classroomId: "9890f1a5c9e6f9a1b1112311CS",
//       meetingTimes: [
//         {
//           day: "Mon",
//           start: "13:15",
//           end: "14:45",
//         },
//         {
//           day: "Wed",
//           start: "13:15",
//           end: "14:45",
//         },
//         {
//           day: "Fri",
//           start: "13:15",
//           end: "14:45",
//         },
//       ],
//       capacity: 30,
//     };

//     const res = await request(app)
//       .put("/class-sections/213")
//       .send(section)
//       .expect(204);
//   });

//   test("should return updated section", async () => {
//     const res = await request(app).get("/students/S543210").expect(200);
//     expect(res.body).not.toBe(null);
//     expect(res.body.classId).toBe("6740f1a5c9e6f9a1b2328222");
//     expect(res.body.sectionNumber).toBe("213");
//     expect(res.body.semester).toBe("Fall 2029");
//     expect(res.body.teacherId).toBe("9840f1a5c9e6f9a1b9875221");
//     expect(res.body.classroomId).toBe("9890f1a5c9e6f9a1b1112311CS");
//     expect(res.body.meetingTimes).toBe([
//       {
//         day: "Mon",
//         start: "13:15",
//         end: "14:45",
//       },
//       {
//         day: "Wed",
//         start: "13:15",
//         end: "14:45",
//       },
//       {
//         day: "Fri",
//         start: "13:15",
//         end: "14:45",
//       },
//     ]);
//     expect(res.body.capacity).toBe(30);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   test("should delete section", async () => {
//     const res = await request(app).delete("/class-sections/213").expect(204);
//   });
// });

// test("should not deleted section", async () => {
//   const res = await request(app).get("/class-sections/213").expect(200);
//   expect(res.body).toBe("section number does not exist");
//   expect(res.body).toBeInstanceOf(String);
// });
