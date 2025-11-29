const router = require("express").Router();
const enrollmentsController = require("../controllers/enrollments");

// ============================================
// GET routes
// ============================================
// get all enrollments
router.get("/", /* #swagger.tags = ['Enrollments'] */ enrollmentsController.getAll);

// // get enrollment by id
router.get("/:_id", /* #swagger.tags = ['Enrollments'] */ enrollmentsController.getById);

// // ============================================
// // POST route
// // ============================================
// // add enrollment
router.post("/", /* #swagger.tags = ['Enrollments'] */ enrollmentsController.insertEnrollment);

// ============================================
// PUT route
// ============================================
// update enrollment by id
router.put("/:_id", /* #swagger.tags = ['Enrollments'] */ enrollmentsController.updateEnrollment);

// // ============================================
// // DELETE route
// // ============================================
// // delete enrollment by id
router.delete("/:_id", /* #swagger.tags = ['Enrollments'] */ enrollmentsController.deleteById);

module.exports = router;
