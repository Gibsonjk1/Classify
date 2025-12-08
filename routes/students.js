const router = require("express").Router();
const studentsController = require("../controllers/students");
const utils = require("../utilities");
const validator = require("../utilities/validate");

// ============================================
// GET routes
// ============================================
// get all students
router.get(
  "/",
  /* #swagger.tags = ['Students'] */ utils.handleErrors(
    studentsController.getAllStudents
  )
);

// // get student by studentId
router.get(
  "/:studentId",
  /* #swagger.tags = ['Students'] */ utils.handleErrors(
    studentsController.getByStudentId
  )
);

// // ============================================
// // POST route
// // ============================================
// // add student
router.post(
  "/",
  /* #swagger.tags = ['Students'] */
  validator.studentRules(),
  validator.checkData,
  /* #swagger.description = 'add student by studentId'
    #swagger.parameters['studentId'] = {
      in: 'body',
      description: 'Student ID obejct',
      required: true,
      schema: {
        studentId: 'SAL123456',
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'SAL123456@university.edu',
        major: 'CS',
        createdAt: '2025-11-14T00:00:00Z',
      }
    } */
  utils.handleErrors(studentsController.insertStudent)
);

// ============================================
// PUT route
// ============================================
// update student by studentId
router.put(
  "/:studentId",
  /* #swagger.tags = ['Students'] */
  validator.studentRules(),
  validator.checkData,
  /* #swagger.description = 'add student by studentId'
    #swagger.parameters['studentId'] = {
      in: 'body',
      description: 'Student ID obejct',
      required: true,
      schema: {
        studentId: 'SAL123456',
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'SAL123456@university.edu',
        major: 'CS',
        createdAt: '2025-11-14T00:00:00Z',
      }
    } */
  utils.handleErrors(studentsController.updateStudentById)
);

// // ============================================
// // DELETE route
// // ============================================
// // delete student by studentId
router.delete(
  "/:studentId",
  /* #swagger.tags = ['Students'] */ utils.handleErrors(
    studentsController.deleteByStudentId
  )
);

module.exports = router;
