// imports
const mongoDb = require("../db/connection");
const classroomsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all classrooms
classroomsUtils.getAllClassrooms = async (req, res, next) => {
  const result = mongoDb.getDb().db("Classify").collection("classrooms").find();
  const classrooms = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(classrooms);
};

// get classroom by roomNumber
classroomsUtils.getByRoomNumber = async (req, res, next) => {
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
// delete classroom by roomNumber
classroomsUtils.deleteByRoomNumber = async (req, res) => {
  try {
    const roomNumber = req.params.roomNumber;
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("classrooms")
      .deleteOne({ roomNumber: roomNumber }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("classroom code does not exist");
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
          error.message || "Some error occured while deleting the classroom."
        );
    }
  }
};

module.exports = classroomsUtils;
