const router = require("express").Router();
const teachersController = require("../controllers/teachers");

// ============================================
// GET routes
// ============================================
// get all teachers
router.get("/", teachersController.getAll);

// // get teacher by id
// router.get("/:id", teachersController.getById);

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
// // delete teacher by id
// router.delete("/:id", teachersController.deleteClassSection);

module.exports = router;
