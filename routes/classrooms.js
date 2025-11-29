const router = require("express").Router();
const classroomsController = require("../controllers/classrooms");

// ============================================
// GET routes
// ============================================
// get all classrooms
router.get("/", classroomsController.getAllClassrooms);

// // get classroom by roomNumber
router.get("/:roomNumber", classroomsController.getByRoomNumber);

// // ============================================
// // POST route
// // ============================================
// // add classroom
router.post("/", classroomsController.insertClassroom);

// // ============================================
// // PUT route
// // ============================================
// // update classroom by id
// router.put(":/id", classroomsController.updateClassSection);

// // ============================================
// // DELETE route
// // ============================================
// // delete classroom by roomNumber
router.delete("/:roomNumber", classroomsController.deleteByRoomNumber);

module.exports = router;
