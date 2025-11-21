const router = require("express").Router();
const teachersController = require("../controllers/teachers");

// ============================================
// GET routes
// ============================================
router.get("/", teachersController.getAll);
router.get("/:id", teachersController.getById);

// ============================================
// POST route
// ============================================
router.post("/", teachersController.insertClassSection);

// ============================================
// PUT route
// ============================================
router.put(":/id", teachersController.updateClassSection);

// ============================================
// DELETE route
// ============================================
router.delete("/:id", teachersController.deleteClassSection);