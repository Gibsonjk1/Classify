const router = require("express").Router();
const enrollmentsController = require("../controllers/enrollments");
const utils = require("../utilities");
const validator = require("../utilities/validate");

// ============================================
// GET routes
// ============================================
// get all enrollments
router.get("/", /* #swagger.tags = ['Enrollments'] */ utils.handleErrors(enrollmentsController.getAll));

// // get enrollment by id
router.get("/:_id", /* #swagger.tags = ['Enrollments'] */ utils.handleErrors(enrollmentsController.getById));

// // ============================================
// // POST route
// // ============================================
// // add enrollment
router.post("/", /* #swagger.tags = ['Enrollments'] */ validator.enrollmentRules(), validator.checkData, utils.handleErrors(enrollmentsController.insertEnrollment));

// ============================================
// PUT route
// ============================================
// update enrollment by id
router.put("/:_id", /* #swagger.tags = ['Enrollments'] */ validator.enrollmentRules(), validator.checkData, utils.handleErrors(enrollmentsController.updateEnrollment));

// // ============================================
// // DELETE route
// // ============================================
// // delete enrollment by id
router.delete("/:_id", /* #swagger.tags = ['Enrollments'] */ utils.handleErrors(enrollmentsController.deleteById));

module.exports = router;
