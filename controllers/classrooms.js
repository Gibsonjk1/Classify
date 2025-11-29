// imports
const mongoDb = require("../db/connection");
const ObejctId = require("mongodb").ObjectId;
const classroomsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all classrooms
classroomsUtils.getAll = async (req, res, next) => {
  const result = mongoDb.getDb().db("Classify").collection("classrooms").find();
  const classrooms = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(classrooms);
};

// get classroom by id
classroomsUtils.getById = async (req, res, next) => {
  try {
    const roomNumber = req.params.roomNumber;
    const result = mongoDb
      .getDb()
      .db("Classify")
      .collection("classrooms")
      .find({ roomNumber: roomNumber });
    const classroom = await result.toArray();
    if (!classroom.length > 0) {
      const error = new Error("No data found with that room number.");
      error.name = "blank id";
      throw error;
    }
    res.setHeader("content-type", "application/json");
    res.status(200).json(classroom[0]);
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else if (error.name == "blank id") {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message || "An error occured while retrieving the room number."
        );
    }
  }
};

// ==============================================
// POST logic
// ==============================================
// add classroom
classroomsUtils.insertClassrooms = async (req, res) => {
  // insertClassrooms logic
};

// ==============================================
// PUT logic
// ==============================================
// update classroom by id
classroomsUtils.updateClassrooms = async (req, res) => {
  // updateClassrooms logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete classroom by id
classroomsUtils.deleteClassrooms = async (req, res) => {
  // deleteClassrooms logic
};

module.exports = classroomsUtils;
