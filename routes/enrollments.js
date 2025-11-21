const router = require("express").Router();
const enrollmentsController = require("../controllers/enrollments");

// ============================================
// GET routes
// ============================================
router.get("/", enrollmentsController.getAll);
router.get("/:id", enrollmentsController.getById);

// ============================================
// POST route
// ============================================
router.post("/", enrollmentsController.insertClassSection);

// ============================================
// PUT route
// ============================================
router.put(":/id", enrollmentsController.updateClassSection);

// ============================================
// DELETE route
// ============================================
router.delete("/:id", enrollmentsController.deleteClassSection);