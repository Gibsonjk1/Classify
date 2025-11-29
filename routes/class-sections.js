const router = require("express").Router();
const classSectionController = require("../controllers/class-sections");

// ============================================
// GET routes
// ============================================
// get all class sections
router.get("/", classSectionController.getAll);

// // get class section by section number
router.get("/:sectionNumber", classSectionController.getById);

// // ============================================
// // POST route
// // ============================================
// // add class section
// router.post("/", classSectionController.insertClassSection);

// // ============================================
// // PUT route
// // ============================================
// // update class section by id
// router.put("/:id", classSectionController.updateClassSection);

// // ============================================
// // DELETE route
// // ============================================
// // delete class section by section number
router.delete("/:sectionNumber", classSectionController.deleteById);

module.exports = router;
