const router = require("express").Router();
const semestersController = require("../controllers/semesters");

// ============================================
// GET routes
// ============================================
// get all semesters
router.get("/", /* #swagger.tags = ['Semesters'] */ semestersController.getAll);

// get semester by id
router.get("/:_id", /* #swagger.tags = ['Semesters'] */ semestersController.getById);

// // ============================================
// // POST route
// // ============================================
// // add semester
router.post("/", /* #swagger.tags = ['Semesters'] */ semestersController.insertSemester);

// ============================================
// PUT route
// ============================================
// update semester by id
router.put("/:_id", /* #swagger.tags = ['Semesters'] */ semestersController.updateSemester);

// // ============================================
// // DELETE route
// // ============================================
// // delete semester by id
router.delete("/:_id", /* #swagger.tags = ['Semesters'] */ semestersController.deleteById);

module.exports = router;
