const router = require("express").Router();
const studentsController = require("../controllers/students");

// ============================================
// GET routes
// ============================================
// get all students
router.get("/", studentsController.getAll);

// // get student by id
// router.get("/:id", studentsController.getById);

// // ============================================
// // POST route
// // ============================================
// // add student
// router.post("/", studentsController.insertClassSection);

// // ============================================
// // PUT route
// // ============================================
// // update student by id
// router.put(":/id", studentsController.updateClassSection);

// // ============================================
// // DELETE route
// // ============================================
// // delete student by id
// router.delete("/:id", studentsController.deleteClassSection);

module.exports = router;
