const router = require("express").Router();
const studentsController = require("../controllers/students");

// ============================================
// GET routes
// ============================================
router.get("/", studentsController.getAll);
router.get("/:id", studentsController.getById);

// ============================================
// POST route
// ============================================
router.post("/", studentsController.insertClassSection);

// ============================================
// PUT route
// ============================================
router.put(":/id", studentsController.updateClassSection);

// ============================================
// DELETE route
// ============================================
router.delete("/:id", studentsController.deleteClassSection);