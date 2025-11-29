// imports
const mongoDb = require("../db/connection");
const studentsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all students
studentsUtils.getAll = async (req, res, next) => {
  const result = mongoDb
    .getDb()
    .db("Classify")
    .collection("students")
    .find();
  const students = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(students);
};

// get student by id
studentsUtils.getById = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const result = mongoDb
      .getDb()
      .db("Classify")
      .collection("students")
      .find({ studentId: studentId });
    const student = await result.toArray();
    if (!student.length > 0) {
      const error = new Error("No data found with that student id.");
      error.name = "blank id";
      throw error;
    }
    res.setHeader("content-type", "application/json");
    res.status(200).json(student[0]);
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else if (error.name == "blank id") {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message || "An error occured while retrieving the student id."
        );
    }
  }
};

// ==============================================
// POST logic
// ==============================================
// add student
studentsUtils.insertStudents = async (req, res) => {
  // insertStudents logic
};

// ==============================================
// PUT logic
// ==============================================
// update student by id
studentsUtils.updateStudents = async (req, res) => {
  // updateStudents logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete student by id
studentsUtils.deleteStudents = async (req, res) => {
  // deleteStudents logic
};

module.exports = studentsUtils;
