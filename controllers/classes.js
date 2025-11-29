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

// get class by courseCode
classesUtils.getByCourseCode = async (req, res, next) => {
  try {
    const courseCode = req.params.courseCode;
    const result = mongoDb
      .getDb()
      .db("Classify")
      .collection("classes")
      .find({ courseCode: courseCode });
    const _class = await result.toArray();
    if (!_class.length > 0) {
      const error = new Error("No data found with that course code.");
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
          error.message || "An error occured while retrieving the course code."
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
      _id: req.body._id,
      courseCode: req.body.courseCode,
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
// update class by courseCode
classesUtils.updateClass = async (req, res) => {
  try {
    const courseCode = req.params.courseCode;
    const updateData = {
      title: req.body.title,
      credits: req.body.credits,
      description: req.body.description
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key =>
      updateData[key] === undefined && delete updateData[key]
    );

    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("classes")
      .updateOne({ courseCode: courseCode }, { $set: updateData });

    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("Course code does not exist");
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
// delete class by courseCode
classesUtils.deleteByCourseCode = async (req, res) => {
  try {
    const courseCode = req.params.courseCode;
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("classes")
      .deleteOne({ courseCode: courseCode }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("class code does not exist");
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
