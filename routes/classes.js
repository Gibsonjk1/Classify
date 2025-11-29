const router = require("express").Router();
const classesController = require("../controllers/classes");

// ============================================
// GET routes
// ============================================
// get all classes
router.get("/", classesController.getAll);

// // get class by id
router.get("/:courseCode", classesController.getById);

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
// // delete class by id
// router.delete("/:id", classesController.deleteClassSection);

module.exports = router;
