// imports
const mongoDb = require("../db/connection");
const classesUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all classes
classesUtils.getAll = async (req, res, next) => {
  const result = mongoDb.getDb().db("Classify").collection("classes").find();
  const classes = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(classes);
};

// get class by id
classesUtils.getById = async (req, res, next) => {
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
classesUtils.insertClasses = async (req, res) => {
  // insertClasses logic
};

// ==============================================
// PUT logic
// ==============================================
// update class by id
classesUtils.updateClasses = async (req, res) => {
  // updateClasses logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete class by id
classesUtils.deleteClasses = async (req, res) => {
  // deleteClasses logic
};

module.exports = classesUtils;
