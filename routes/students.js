const router = require("express").Router();
const studentsController = require("../controllers/students");
const utils = require("../utilities");
const validator = require("../utilities/validate");
const { requireAuth } = require("../middleware/auth");

// ============================================
// GET routes
// ============================================
// get all students
router.get(
  "/",
  requireAuth,
  /* #swagger.tags = ['Students'] */
  /* #swagger.security = [{
      "googleOAuth": []
  }] */
  utils.handleErrors(studentsController.getAllStudents)
);

// // get student by studentId
router.get(
  "/:studentId",
  requireAuth,
  /* #swagger.tags = ['Students'] */
  /* #swagger.security = [{
      "googleOAuth": []
  }] */
  utils.handleErrors(studentsController.getByStudentId)
);

// // ============================================
// // POST route
// // ============================================
// // add student
router.post(
  "/",
  requireAuth,
  /* #swagger.tags = ['Students'] */
  /* #swagger.security = [{
      "googleOAuth": []
  }] */
  validator.studentRules(),
  validator.checkData,
  /* #swagger.description = 'add student'
    #swagger.parameters['student'] = {
      in: 'body',
      description: 'Student object',
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
  requireAuth,
  /* #swagger.tags = ['Students'] */
  /* #swagger.security = [{
      "googleOAuth": []
  }] */
  validator.studentRules(),
  validator.checkData,
  /* #swagger.description = 'update student by studentId'
    #swagger.parameters['studentId'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'Student ID'
    }
    #swagger.parameters['student'] = {
      in: 'body',
      description: 'Student object',
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
  requireAuth,
  /* #swagger.tags = ['Students'] */
  /* #swagger.security = [{
      "googleOAuth": []
  }] */
  utils.handleErrors(studentsController.deleteByStudentId)
);

module.exports = router;
