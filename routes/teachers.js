const router = require("express").Router();
const teachersController = require("../controllers/teachers");

// ============================================
// GET routes
// ============================================
// get all teachers
router.get("/", /* #swagger.tags = ['Teachers'] */ teachersController.getAll);

// // get teacher by id
router.get("/:teacherId", /* #swagger.tags = ['Teachers'] */ teachersController.getByTeacherId);

// // ============================================
// // POST route
// // ============================================
// // add teacher
router.post("/", /* #swagger.tags = ['Teachers'] */ teachersController.insertTeacher);

// ============================================
// PUT route
// ============================================
// update teacher by teacherId
router.put("/:teacherId", /* #swagger.tags = ['Teachers'] */ teachersController.updateTeacher);

// // ============================================
// // DELETE route
// // ============================================
// // delete teacher by teacherId
router.delete("/:teacherId", /* #swagger.tags = ['Teachers'] */ teachersController.deleteByTeacherId);

module.exports = router;
