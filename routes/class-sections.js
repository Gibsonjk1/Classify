const router = require("express").Router();
const classSectionController = require("../controllers/class-sections");

// ============================================
// GET routes
// ============================================
// get all class sections
router.get("/", classSectionController.getAllCourseSections);

// // get class section by sectionNumber
router.get("/:sectionNumber", classSectionController.getBySectionNumber);

// // ============================================
// // POST route
// // ============================================
// // add class section
router.post("/", classSectionController.insertClassSection);

// // ============================================
// // PUT route
// // ============================================
// // update class section by id
// router.put("/:id", classSectionController.updateClassSection);

// // ============================================
// // DELETE route
// // ============================================
// // delete class section by sectionNumber
router.delete("/:sectionNumber", classSectionController.deleteBySectionNumber);

module.exports = router;
