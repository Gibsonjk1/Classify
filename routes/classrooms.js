const router = require("express").Router();
const classroomsController = require("../controllers/classrooms");

// ============================================
// GET routes
// ============================================
// get all classrooms
router.get("/", classroomsController.getAll);

// // get classroom by id
// router.get("/:id", classroomsController.getById);

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
// // delete classroom by id
// router.delete("/:id", classroomsController.deleteClassSection);

module.exports = router;
