// imports
const mongoDb = require("../db/connection");
const classesUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all classes
classesUtils.getAllClasses = async (req, res, next) => {
  const result = mongoDb.getDb().db("Classify").collection("classes").find();
  const classes = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(classes);
};

// get class by classId
classesUtils.getByClassId = async (req, res, next) => {
  try {
    const classId = req.params.classId;
    const result = mongoDb
      .getDb()
      .db("Classify")
      .collection("classes")
      .find({ classId: classId });
    const _class = await result.toArray();
    if (!_class.length > 0) {
      const error = new Error("No data found with that class id.");
      error.name = "blank id";
      throw error;
    }
    res.setHeader("content-type", "application/json");
    res.status(200).json(_class[0]);
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else if (error.name == "blank id") {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message || "An error occured while retrieving the class id."
        );
    }
  }
};

// ==============================================
// POST logic
// ==============================================
// add class
classesUtils.insertClass = async (req, res) => {
  try {
    const _class = {
      classId: req.body.classId,
      title: req.body.title,
      credits: req.body.credits,
      description: req.body.description,
    };
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("classes")
      .insertOne(_class);
    // validation function goes here
    if (response.acknowledged) {
      res.status(201).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json(
        error.message || "Some error occured while inserting the class."
      );
  }
};

// ==============================================
// PUT logic
// ==============================================
// update class by classId
classesUtils.updateClassById = async (req, res) => {
  try {
    const classId = req.params.classId;
    const updateData = {
      classId: req.body.classId,
      title: req.body.title,
      credits: req.body.credits,
      description: req.body.description,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key =>
      updateData[key] === undefined && delete updateData[key]
    );

    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("classes")
      .updateOne({ classId: classId }, { $set: updateData });

    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("Class ID does not exist");
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
          error.message || "Some error occurred while updating the class."
        );
    }
  }
};

// ==============================================
// DELETE logic
// ==============================================
// delete class by classId
classesUtils.deleteByClassId = async (req, res) => {
  try {
    const classId = req.params.classId;
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("classes")
      .deleteOne({ classId: classId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("class ID does not exist");
      error.name = "no such id";
      throw error;
    }
  } catch (error) {
    if ((error.name = "no such id")) {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(error.message || "Some error occured while deleting the class.");
    }
  }
};

module.exports = classesUtils;
