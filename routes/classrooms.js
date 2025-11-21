const router = require("express").Router();
const classroomsController = require("../controllers/classrooms");

// ============================================
// GET routes
// ============================================
router.get("/", classroomsController.getAll);
// router.get("/:id", classroomsController.getById);

// // ============================================
// // POST route
// // ============================================
// router.post("/", classroomsController.insertClassSection);

// // ============================================
// // PUT route
// // ============================================
// router.put(":/id", classroomsController.updateClassSection);

// // ============================================
// // DELETE route
// // ============================================
// router.delete("/:id", classroomsController.deleteClassSection);