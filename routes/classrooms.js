const router = require("express").Router();
const classroomsController = require("../controllers/classrooms");
const utils = require("../utilities");
const validator = require("../utilities/validate");

// ============================================
// GET routes
// ============================================
// get all classrooms
router.get("/", /* #swagger.tags = ['Classrooms'] */ utils.handleErrors(classroomsController.getAllClassrooms));

// // get classroom by roomNumber
router.get("/:roomNumber", /* #swagger.tags = ['Classrooms'] */ utils.handleErrors(classroomsController.getByRoomNumber));

// // ============================================
// // POST route
// // ============================================
// // add classroom
router.post("/", /* #swagger.tags = ['Classrooms'] */ validator.classroomRules(), validator.checkData, utils.handleErrors(classroomsController.insertClassroom));

// ============================================
// PUT route
// ============================================
// update classroom by roomNumber
router.put("/:roomNumber", /* #swagger.tags = ['Classrooms'] */ validator.classroomRules(), validator.checkData, utils.handleErrors(classroomsController.updateClassroom));

// // ============================================
// // DELETE route
// // ============================================
// // delete classroom by roomNumber
router.delete("/:roomNumber", /* #swagger.tags = ['Classrooms'] */ utils.handleErrors(classroomsController.deleteByRoomNumber));

module.exports = router;
