const router = require("express").Router();
const classroomsController = require("../controllers/classrooms");

// ============================================
// GET routes
// ============================================
// get all classrooms
router.get("/", classroomsController.getAll);

// // get classroom by room number
router.get("/:roomNumber", classroomsController.getById);

// // ============================================
// // POST route
// // ============================================
// // add classroom
// router.post("/", classroomsController.insertClassSection);

// // ============================================
// // PUT route
// // ============================================
// // update classroom by id
// router.put(":/id", classroomsController.updateClassSection);

// // ============================================
// // DELETE route
// // ============================================
// // delete classroom by room number
router.delete("/:roomNumber", classroomsController.deleteById);

module.exports = router;
