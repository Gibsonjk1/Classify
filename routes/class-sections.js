const router = require("express").Router();
const classSectionController = require("../controllers/class-sections");

// ============================================
// GET routes
// ============================================
router.get("/", classSectionController.getAll);
router.get("/:id", classSectionController.getById);

// ============================================
// POST route
// ============================================
router.post("/", classSectionController.insertClassSection);

// ============================================
// PUT route
// ============================================
router.put(":/id", classSectionController.updateClassSection);

// ============================================
// DELETE route
// ============================================
router.delete("/:id", classSectionController.deleteClassSection);
