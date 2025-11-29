const router = require("express").Router();
const classroomsController = require("../controllers/classrooms");

// ============================================
// GET routes
// ============================================
// get all classrooms
router.get("/", /* #swagger.tags = ['Classrooms'] */ classroomsController.getAllClassrooms);

// // get classroom by roomNumber
router.get("/:roomNumber", /* #swagger.tags = ['Classrooms'] */ classroomsController.getByRoomNumber);

// // ============================================
// // POST route
// // ============================================
// // add classroom
router.post("/", /* #swagger.tags = ['Classrooms'] */ classroomsController.insertClassroom);

// ============================================
// PUT route
// ============================================
// update classroom by roomNumber
router.put("/:roomNumber", /* #swagger.tags = ['Classrooms'] */ classroomsController.updateClassroom);

// // ============================================
// // DELETE route
// // ============================================
// // delete classroom by roomNumber
router.delete("/:roomNumber", /* #swagger.tags = ['Classrooms'] */ classroomsController.deleteByRoomNumber);

module.exports = router;
