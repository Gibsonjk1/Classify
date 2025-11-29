const router = require("express").Router();
const classesController = require("../controllers/classes");

// ============================================
// GET routes
// ============================================
// get all classes
router.get("/", /* #swagger.tags = ['Classes'] */ classesController.getAllClasses);

// // get class courseCode
router.get("/:courseCode", /* #swagger.tags = ['Classes'] */ classesController.getByCourseCode);

// // ============================================
// // POST route
// // ============================================
// // add class
router.post("/", /* #swagger.tags = ['Classes'] */ classesController.insertClass);

// ============================================
// PUT route
// ============================================
// update class by courseCode
router.put("/:courseCode", /* #swagger.tags = ['Classes'] */ classesController.updateClass);

// // ============================================
// // DELETE route
// // ============================================
// // delete class by courseCode
router.delete("/:courseCode", /* #swagger.tags = ['Classes'] */ classesController.deleteByCourseCode);

module.exports = router;
