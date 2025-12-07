// imports
const mongoDb = require("../db/connection");

const classSectionsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all class sections
classSectionsUtils.getAllCourseSections = async (req, res, next) => {
  try {
    const result = mongoDb
      .getDb()
      .db("Classify")
      .collection("class-sections")
      .find();
    const classSections = await result.toArray();
    res.setHeader("content-type", "application/json");
    res.status(200);
    res.json(classSections);
  } catch (error) {
    res
      .status(500)
      .json(
        error.message || "An error occured while retrieving the class sections."
      );
  }
};

// get class section by sectionId
classSectionsUtils.getBySectionId = async (req, res, next) => {
  try {
    const sectionId = req.params.sectionId;
    const result = mongoDb
      .getDb()
      .db("Classify")
      .collection("class-sections")
      .find({ sectionId: sectionId });
    const classSection = await result.toArray();
    if (!classSection.length > 0) {
      const error = new Error("No data found with that section id.");
      error.name = "blank id";
      throw error;
    }
    res.setHeader("content-type", "application/json");
    res.status(200).json(classSection[0]);
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else if (error.name == "blank id") {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message ||
          "An error occured while retrieving the section id."
        );
    }
  }
};

// ==============================================
// POST logic
// ==============================================
// add class section
classSectionsUtils.insertClassSection = async (req, res) => {
  try {
    const classSection = {
      sectionId: req.body.sectionId,
      classId: req.body.classId,
      semesterId: req.body.semesterId,
      teacherId: req.body.teacherId,
      classroomId: req.body.classroomId,
      meetingTimes: req.body.meetingTimes,
      capacity: req.body.capacity,
    };
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("class-sections")
      .insertOne(classSection);
    // validation function goes here
    if (response.acknowledged) {
      res.status(201).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json(
        error.message || "Some error occured while inserting the class section."
      );
  }
};

// ==============================================
// PUT logic
// ==============================================
// update class section by sectionNumber
classSectionsUtils.updateClassSection = async (req, res) => {
  try {
    const sectionId = req.params.sectionId;
    const updateData = {
      sectionId: req.body.sectionId,
      classId: req.body.classId,
      semesterId: req.body.semesterId,
      teacherId: req.body.teacherId,
      classroomId: req.body.classroomId,
      meetingTimes: req.body.meetingTimes,
      capacity: req.body.capacity,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key =>
      updateData[key] === undefined && delete updateData[key]
    );

    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("class-sections")
      .updateOne({ sectionId: sectionId }, { $set: updateData });

    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("Section id does not exist");
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
          error.message || "Some error occurred while updating the section id."
        );
    }
  }
};

// ==============================================
// DELETE logic
// ==============================================
// delete class section by sectionId
classSectionsUtils.deleteBySectionId = async (req, res) => {
  try {
    const sectionId = req.params.sectionId;
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("class-sections")
      .deleteOne({ sectionId: sectionId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("section id does not exist");
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
          error.message || "Some error occured while deleting the section."
        );
    }
  }
};

module.exports = classSectionsUtils;
