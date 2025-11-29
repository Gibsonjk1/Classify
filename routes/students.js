const router = require("express").Router();
const studentsController = require("../controllers/students");

// ============================================
// GET routes
// ============================================
// get all students
router.get("/", studentsController.getAll);

// // get student by studentId
router.get("/:studentId", studentsController.getByStudentId);

// // ============================================
// // POST route
// // ============================================
// // add student
router.post("/", studentsController.insertStudent);

// // ============================================
// // PUT route
// // ============================================
// // update student by id
// router.put(":/id", studentsController.updateClassSection);

// // ============================================
// // DELETE route
// // ============================================
// // delete student by studentId
router.delete("/:studentId", studentsController.deleteByStudentId);

module.exports = router;
