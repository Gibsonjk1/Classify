const router = require("express").Router();
const teachersController = require("../controllers/teachers");
const utils = require("../utilities");
const validator = require("../utilities/validate");

// ============================================
// GET routes
// ============================================
// get all teachers
router.get("/", /* #swagger.tags = ['Teachers'] */ utils.handleErrors(teachersController.getAll));

// // get teacher by id
router.get("/:teacherId", /* #swagger.tags = ['Teachers'] */ utils.handleErrors(teachersController.getByTeacherId));

// // ============================================
// // POST route
// // ============================================
// // add teacher
router.post("/", /* #swagger.tags = ['Teachers'] */ validator.teacherRules(), validator.checkData, utils.handleErrors(teachersController.insertTeacher));

// ============================================
// PUT route
// ============================================
// update teacher by teacherId
router.put("/:teacherId", /* #swagger.tags = ['Teachers'] */ validator.teacherRules(), validator.checkData, utils.handleErrors(teachersController.updateTeacher));

// // ============================================
// // DELETE route
// // ============================================
// // delete teacher by teacherId
router.delete("/:teacherId", /* #swagger.tags = ['Teachers'] */ utils.handleErrors(teachersController.deleteByTeacherId));

module.exports = router;
