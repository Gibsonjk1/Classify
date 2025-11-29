// imports
const mongoDb = require("../db/connection");
const studentsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all students
studentsUtils.getAll = async (req, res, next) => {
  const result = mongoDb.getDb().db("Classify").collection("students").find();
  const students = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(students);
};

// get student by studentId
studentsUtils.getByStudentId = async (req, res, next) => {
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
studentsUtils.insertStudent = async (req, res) => {
  try {
    const student = {
      _id: req.body._id,
      studentId: req.body.studentId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      major: req.body.major,
      createdAt: req.body.createdAt
    };
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("students")
      .insertOne(student);
    // validation function goes here
    if (response.acknowledged) {
      res.status(201).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json(
        error.message || "Some error occured while inserting the student."
      );
  }
};

// ==============================================
// PUT logic
// ==============================================
// update student by studentId
studentsUtils.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      major: req.body.major
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key =>
      updateData[key] === undefined && delete updateData[key]
    );

    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("students")
      .updateOne({ studentId: studentId }, { $set: updateData });

    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("Student id does not exist");
      error.name = "no such id";
      throw error;
    }
  } catch (error) {
    if (error.name === "no such id") {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message || "Some error occurred while updating the student."
        );
    }
  }
};

// ==============================================
// DELETE logic
// ==============================================
// delete student by studentId
studentsUtils.deleteByStudentId = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("students")
      .deleteOne({ studentId: studentId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("student id does not exist");
      error.name = "no such id";
      throw error;
    }
  } catch (error) {
    if ((error.name = "no such id")) {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message || "Some error occured while deleting the student."
        );
    }
  }
};

module.exports = studentsUtils;
