const router = require("express").Router();
const semestersController = require("../controllers/semesters");
const utils = require("../utilities");
const validator = require("../utilities/validate")

// ============================================
// GET routes
// ============================================
// get all semesters
router.get("/", /* #swagger.tags = ['Semesters'] */ utils.handleErrors(semestersController.getAll));

// get semester by id
router.get("/:_id", /* #swagger.tags = ['Semesters'] */ utils.handleErrors(semestersController.getById));

// // ============================================
// // POST route
// // ============================================
// // add semester
router.post("/", /* #swagger.tags = ['Semesters'] */ validator.semesterRules(), validator.checkData, utils.handleErrors(semestersController.insertSemester));

// ============================================
// PUT route
// ============================================
// update semester by id
router.put("/:_id", /* #swagger.tags = ['Semesters'] */ validator.semesterRules(), validator.checkData, utils.handleErrors(semestersController.updateSemester));

// // ============================================
// // DELETE route
// // ============================================
// // delete semester by id
router.delete("/:_id", /* #swagger.tags = ['Semesters'] */ utils.handleErrors(semestersController.deleteById));

module.exports = router;
