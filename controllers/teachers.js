// imports
const mongoDb = require("../db/connection");
const teachersUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all teachers
teachersUtils.getAll = async (req, res, next) => {
  const result = mongoDb.getDb().db("Classify").collection("teachers").find();
  const teachers = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(teachers);
};

// get teacher by id
teachersUtils.getByTeacherId = async (req, res, next) => {
  try {
    const teacherId = req.params.teacherId;
    const result = mongoDb
      .getDb()
      .db("Classify")
      .collection("teachers")
      .find({ teacherId: teacherId });
    const teacher = await result.toArray();
    if (!teacher.length > 0) {
      const error = new Error("No data found with that teacher id.");
      error.name = "blank id";
      throw error;
    }
    res.setHeader("content-type", "application/json");
    res.status(200).json(teacher[0]);
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else if (error.name == "blank id") {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message || "An error occured while retrieving the teacher id."
        );
    }
  }
};

// ==============================================
// POST logic
// ==============================================
// add teacher
teachersUtils.insertTeachers = async (req, res) => {
  // insertTeachers logic
};

// ==============================================
// PUT logic
// ==============================================
// update teacher by id
teachersUtils.updateTeachers = async (req, res) => {
  // updateTeachers logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete teacher by teacherId
teachersUtils.deleteByTeacherId = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("teachers")
      .deleteOne({ teacherId: teacherId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("teacher id does not exist");
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
          error.message || "Some error occured while deleting the teacher."
        );
    }
  }
};

module.exports = teachersUtils;
