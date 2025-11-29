const router = require("express").Router();
const studentsController = require("../controllers/students");

// ============================================
// GET routes
// ============================================
// get all students
router.get("/", /* #swagger.tags = ['Students'] */ studentsController.getAll);

// // get student by studentId
router.get("/:studentId", /* #swagger.tags = ['Students'] */ studentsController.getByStudentId);

// // ============================================
// // POST route
// // ============================================
// // add student
router.post("/", /* #swagger.tags = ['Students'] */ studentsController.insertStudent);

// ============================================
// PUT route
// ============================================
// update student by studentId
router.put("/:studentId", /* #swagger.tags = ['Students'] */ studentsController.updateStudent);

// // ============================================
// // DELETE route
// // ============================================
// // delete student by studentId
router.delete("/:studentId", /* #swagger.tags = ['Students'] */ studentsController.deleteByStudentId);

module.exports = router;
