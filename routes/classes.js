const router = require("express").Router();
const classesController = require("../controllers/classes");

// ============================================
// GET routes
// ============================================
// get all classes
router.get("/", classesController.getAllClasses);

// // get class courseCode
router.get("/:courseCode", classesController.getByCourseCode);

// // ============================================
// // POST route
// // ============================================
// // add class
// router.post("/", classesController.insertClassSection);

// // ============================================
// // PUT route
// // ============================================
// // update class by id
// router.put(":/id", classesController.updateClassSection);

// // ============================================
// // DELETE route
// // ============================================
// // delete class by courseCode
router.delete("/:courseCode", classesController.deleteByCourseCode);

module.exports = router;
