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

// get class section by sectionNumber
classSectionsUtils.getBySectionNumber = async (req, res, next) => {
  try {
    const sectionNumber = req.params.sectionNumber;
    const result = mongoDb
      .getDb()
      .db("Classify")
      .collection("class-sections")
      .find({ sectionNumber: sectionNumber });
    const classSection = await result.toArray();
    if (!classSection.length > 0) {
      const error = new Error("No data found with that section number.");
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
            "An error occured while retrieving the section number."
        );
    }
  }
};

// ==============================================
// POST logic
// ==============================================
// add class section
classSectionsUtils.insertClassSection = async (req, res) => {
  // insertClassSection logic
};

// ==============================================
// PUT logic
// ==============================================
// update class section by id
classSectionsUtils.updateClassSection = async (req, res) => {
  // updateClassSection logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete class section by sectionNumber
classSectionsUtils.deleteBySectionNumber = async (req, res) => {
  try {
    const sectionNumber = req.params.sectionNumber;
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("class-sections")
      .deleteOne({ sectionNumber: sectionNumber }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("section number does not exist");
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
