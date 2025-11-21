const router = require("express").Router();
const semestersController = require("../controllers/semesters");

// ============================================
// GET routes
// ============================================
router.get("/", semestersController.getAll);
router.get("/:id", semestersController.getById);

// ============================================
// POST route
// ============================================
router.post("/", semestersController.insertClassSection);

// ============================================
// PUT route
// ============================================
router.put(":/id", semestersController.updateClassSection);

// ============================================
// DELETE route
// ============================================
router.delete("/:id", semestersController.deleteClassSection);