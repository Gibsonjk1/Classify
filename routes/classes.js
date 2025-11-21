const router = require("express").Router();
const classesController = require("../controllers/classes");

// ============================================
// GET routes
// ============================================
router.get("/", classesController.getAll);
router.get("/:id", classesController.getById);

// ============================================
// POST route
// ============================================
router.post("/", classesController.insertClassSection);

// ============================================
// PUT route
// ============================================
router.put(":/id", classesController.updateClassSection);

// ============================================
// DELETE route
// ============================================
router.delete("/:id", classesController.deleteClassSection);