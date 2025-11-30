const router = require("express").Router();
const classSectionController = require("../controllers/class-sections");
const utils = require("../utilities");
const validator = require("../utilities/validate");

// ============================================
// GET routes
// ============================================
// get all class sections
router.get("/", /* #swagger.tags = ['Class Sections'] */ utils.handleErrors(classSectionController.getAllCourseSections));

// // get class section by sectionNumber
router.get("/:sectionNumber", /* #swagger.tags = ['Class Sections'] */ utils.handleErrors(classSectionController.getBySectionNumber));

// // ============================================
// // POST route
// // ============================================
// // add class section
router.post("/", /* #swagger.tags = ['Class Sections'] */ validator.sectionRules(), validator.checkData, utils.handleErrors(classSectionController.insertClassSection));

// ============================================
// PUT route
// ============================================
// update class section by sectionNumber
router.put("/:sectionNumber", /* #swagger.tags = ['Class Sections'] */ validator.sectionRules(), validator.checkData, utils.handleErrors(classSectionController.updateClassSection));

// // ============================================
// // DELETE route
// // ============================================
// // delete class section by sectionNumber
router.delete("/:sectionNumber", /* #swagger.tags = ['Class Sections'] */ utils.handleErrors(classSectionController.deleteBySectionNumber));

module.exports = router;
