const router = require("express").Router();
const classesController = require("../controllers/classes");
const utils = require("../utilities");
const validator = require("../utilities/validate");

// ============================================
// GET routes
// ============================================
// get all classes
router.get("/", /* #swagger.tags = ['Classes'] */ utils.handleErrors(classesController.getAllClasses));

// // get class courseCode
router.get("/:courseCode", /* #swagger.tags = ['Classes'] */ utils.handleErrors(classesController.getByCourseCode));

// // ============================================
// // POST route
// // ============================================
// // add class
router.post("/", /* #swagger.tags = ['Classes'] */ validator.classRules(), validator.checkData, utils.handleErrors(classesController.insertClass));

// ============================================
// PUT route
// ============================================
// update class by courseCode
router.put("/:courseCode", /* #swagger.tags = ['Classes'] */ validator.classRules(), validator.checkData, utils.handleErrors(classesController.updateClass));

// // ============================================
// // DELETE route
// // ============================================
// // delete class by courseCode
router.delete("/:courseCode", /* #swagger.tags = ['Classes'] */ utils.handleErrors(classesController.deleteByCourseCode));

module.exports = router;
