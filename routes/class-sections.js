const router = require("express").Router();
const classSectionController = require("../controllers/class-sections");

// ============================================
// GET routes
// ============================================
// get all class sections
router.get("/", /* #swagger.tags = ['Class Sections'] */ classSectionController.getAllCourseSections);

// // get class section by sectionNumber
router.get("/:sectionNumber", /* #swagger.tags = ['Class Sections'] */ classSectionController.getBySectionNumber);

// // ============================================
// // POST route
// // ============================================
// // add class section
router.post("/", /* #swagger.tags = ['Class Sections'] */ classSectionController.insertClassSection);

// ============================================
// PUT route
// ============================================
// update class section by sectionNumber
router.put("/:sectionNumber", /* #swagger.tags = ['Class Sections'] */ classSectionController.updateClassSection);

// // ============================================
// // DELETE route
// // ============================================
// // delete class section by sectionNumber
router.delete("/:sectionNumber", /* #swagger.tags = ['Class Sections'] */ classSectionController.deleteBySectionNumber);

module.exports = router;
