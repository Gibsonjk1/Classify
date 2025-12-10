const router = require("express").Router();
const enrollmentsController = require("../controllers/enrollments");
const utils = require("../utilities");
const validator = require("../utilities/validate");

// ============================================
// GET routes
// ============================================
// get all enrollments
router.get(
  "/",
  /* #swagger.tags = ['Enrollments'] */ utils.handleErrors(
    enrollmentsController.getAllEnrollments
  )
);

// // get enrollment by enrollmentId
router.get(
  "/:enrollmentId",
  /* #swagger.tags = ['Enrollments'] */ utils.handleErrors(
    enrollmentsController.getEnrollmentById
  )
);

// // ============================================
// // POST route
// // ============================================
// // add enrollment
router.post(
  "/",
  /* #swagger.tags = ['Enrollments'] */
  validator.enrollmentRules(),
  validator.checkData,
  /* #swagger.description = 'add enrollment'
    #swagger.parameters['enrollment'] = {
      in: 'body',
      description: 'Enrollment object',
      required: true,
      schema: {
        enrollmentId: 'MS0825SAL123456',
        studentId: 'SAL123456',
        departmentId: 'MATH',
        status: 'enrolled',
        enrolledAt: '2025-08-20T12:00:00Z',
        gpa: 3.3,
      }
    } */
  utils.handleErrors(enrollmentsController.insertEnrollment)
);

// ============================================
// PUT route
// ============================================
// update enrollment by enrollmentId
router.put(
  "/:enrollmentId",
  /* #swagger.tags = ['Enrollments'] */ 
  validator.enrollmentRules(),
  validator.checkData,
  /* #swagger.description = 'update enrollment by enrollmentId'
    #swagger.parameters['enrollmentId'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'Enrollment ID'
    }
    #swagger.parameters['enrollment'] = {
      in: 'body',
      description: 'Enrollment object',
      required: true,
      schema: {
        enrollmentId: 'MS0825SAL123456',
        studentId: 'SAL123456',
        departmentId: 'MATH',
        status: 'enrolled',
        enrolledAt: '2025-08-20T12:00:00Z',
        gpa: 3.3,
      }
    } */
  utils.handleErrors(enrollmentsController.updateEnrollmentById)
);

// // ============================================
// // DELETE route
// // ============================================
// // delete enrollment by enrollmentId
router.delete(
  "/:enrollmentId",
  /* #swagger.tags = ['Enrollments'] */ utils.handleErrors(
    enrollmentsController.deleteEnrollmentById
  )
);

module.exports = router;
