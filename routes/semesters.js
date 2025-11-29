const router = require("express").Router();
const semestersController = require("../controllers/semesters");

// ============================================
// GET routes
// ============================================
// get all semesters
router.get("/", semestersController.getAll);

// // get semester by id
router.get("/:semesterId", semestersController.getById);

// // ============================================
// // POST route
// // ============================================
// // add semester
router.post("/", semestersController.insertSemester);

// // ============================================
// // PUT route
// // ============================================
// // update semester by id
// router.put(":/id", semestersController.updateClassSection);

// // ============================================
// // DELETE route
// // ============================================
// // delete semester by id
router.delete("/:_id", semestersController.deleteById);

module.exports = router;
