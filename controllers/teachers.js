// imports
const mongoDb = require("../db/connection");
const teachersUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all teachers
teachersUtils.getAllTeachers = async (req, res, next) => {
  const result = mongoDb.getDb().db("Classify").collection("teachers").find();
  const teachers = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(teachers);
};

// get teacher by teacherId
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
teachersUtils.insertTeacher = async (req, res) => {
  try {
    const teacher = {
      teacherId: req.body.teacherId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      departments: req.body.departments,
    };
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("teachers")
      .insertOne(teacher);
    // validation function goes here
    if (response.acknowledged) {
      res.status(201).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json(error.message || "Some error occured while inserting the teacher.");
  }
};

// ==============================================
// PUT logic
// ==============================================
// update teacher by teacherId
teachersUtils.updateTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const updateData = {
      teacherId: req.body.teacherId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      departments: req.body.departments,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("teachers")
      .updateOne({ teacherId: teacherId }, { $set: updateData });

    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("Teacher id does not exist");
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
          error.message || "Some error occurred while updating the teacher."
        );
    }
  }
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
      const error = new Error("Teacher id does not exist");
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
          error.message || "Some error occured while deleting the teacher."
        );
    }
  }
};

module.exports = teachersUtils;
