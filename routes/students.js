const router = require("express").Router();
const studentsController = require("../controllers/students");
const utils = require("../utilities");
const validator = require("../utilities/validate");

// ============================================
// GET routes
// ============================================
// get all students
router.get("/", /* #swagger.tags = ['Students'] */ utils.handleErrors(studentsController.getAll));

// // get student by studentId
router.get("/:studentId", /* #swagger.tags = ['Students'] */ utils.handleErrors(studentsController.getByStudentId));

// // ============================================
// // POST route
// // ============================================
// // add student
router.post("/", /* #swagger.tags = ['Students'] */ validator.studentRules(), validator.checkData, utils.handleErrors(studentsController.insertStudent));

// ============================================
// PUT route
// ============================================
// update student by studentId
router.put("/:studentId", /* #swagger.tags = ['Students'] */ validator.studentRules(), validator.checkData, utils.handleErrors(studentsController.updateStudent));

// // ============================================
// // DELETE route
// // ============================================
// // delete student by studentId
router.delete("/:studentId", /* #swagger.tags = ['Students'] */ utils.handleErrors(studentsController.deleteByStudentId));

module.exports = router;
