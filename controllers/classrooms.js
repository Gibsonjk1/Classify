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

// get classroom by classroomId
classroomsUtils.getClassroomsById = async (req, res, next) => {
  try {
    const classroomId = req.params.classroomId;
    const result = mongoDb
      .getDb()
      .db("Classify")
      .collection("classrooms")
      .find({ classroomId: classroomId });
    const classroom = await result.toArray();
    if (!classroom.length > 0) {
      const error = new Error("No data found with that classroom ID.");
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
          error.message || "An error occured while retrieving the classroom ID."
        );
    }
  }
};

// ==============================================
// POST logic
// ==============================================
// add classroom
classroomsUtils.insertClassroom = async (req, res) => {
  try {
    const classroom = {
      classroomId: req.body.classroomId,
      roomNumber: req.body.roomNumber,
      buildingId: req.body.buildingId,
      buildingName: req.body.buildingName,
      capacity: req.body.capacity,
    };
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("classrooms")
      .insertOne(classroom);
    // validation function goes here
    if (response.acknowledged) {
      res.status(201).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json(
        error.message || "Some error occured while inserting the classroom."
      );
  }
};

// ==============================================
// PUT logic
// ==============================================
// update classroom by classroomId
classroomsUtils.updateClassroomById = async (req, res) => {
  try {
    const classroomId = req.params.classroomId;
    const updateData = {
      classroomId: req.body.classroomId,
      roomNumber: req.body.roomNumber,
      buildingId: req.body.buildingId,
      buildingName: req.body.buildingName,
      capacity: req.body.capacity,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("classrooms")
      .updateOne({ classroomId: classroomId }, { $set: updateData });

    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("Classroom ID does not exist");
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
          error.message || "Some error occurred while updating the classroom ID."
        );
    }
  }
};

// ==============================================
// DELETE logic
// ==============================================
// delete classroom by classroomId
classroomsUtils.deleteByClassroomId = async (req, res) => {
  try {
    const classroomId = req.params.classroomId;
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("classrooms")
      .deleteOne({ classroomId: classroomId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("Classroom ID does not exist");
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
          error.message || "Some error occured while deleting the classroom ID."
        );
    }
  }
};

module.exports = classroomsUtils;
