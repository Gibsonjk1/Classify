const router = require("express").Router();
const teachersController = require("../controllers/teachers");

// ============================================
// GET routes
// ============================================
// get all teachers
router.get("/", teachersController.getAll);

// // get teacher by id
router.get("/:teacherId", teachersController.getByTeacherId);

// // ============================================
// // POST route
// // ============================================
// // add teacher
// router.post("/", teachersController.insertClassSection);

// // ============================================
// // PUT route
// // ============================================
// // update teacher by id
// router.put(":/id", teachersController.updateClassSection);

// // ============================================
// // DELETE route
// // ============================================
// // delete teacher by teacherId
router.delete("/:teacherId", teachersController.deleteByTeacherId);

module.exports = router;
