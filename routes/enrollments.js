const router = require("express").Router();
const enrollmentsController = require("../controllers/enrollments");

// ============================================
// GET routes
// ============================================
// get all enrollments
router.get("/", enrollmentsController.getAll);

// // get enrollment by id
router.get("/:_id", enrollmentsController.getById);

// // ============================================
// // POST route
// // ============================================
// // add enrollment
// router.post("/", enrollmentsController.insertClassSection);

// // ============================================
// // PUT route
// // ============================================
// // update enrollment by id
// router.put(":/id", enrollmentsController.updateClassSection);

// // ============================================
// // DELETE route
// // ============================================
// // delete enrollment by id
// router.delete("/:id", enrollmentsController.deleteClassSection);

module.exports = router;
