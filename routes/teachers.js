const router = require("express").Router();
const teachersController = require("../controllers/teachers");
const utils = require("../utilities");
const validator = require("../utilities/validate");

// ============================================
// GET routes
// ============================================
// get all teachers
router.get(
  "/",
  /* #swagger.tags = ['Teachers'] */ utils.handleErrors(
    teachersController.getAllTeachers
  )
);

// // get teacher by teacherId
router.get(
  "/:teacherId",
  /* #swagger.tags = ['Teachers'] */ utils.handleErrors(
    teachersController.getByTeacherId
  )
);

// // ============================================
// // POST route
// // ============================================
// // add teacher
router.post(
  "/",
  /* #swagger.tags = ['Teachers'] */
  validator.teacherRules(),
  validator.checkData,
  /* #swagger.description = 'add teacher by teacherId'
    #swagger.parameters['teacherId'] = {
      in: 'body',
      description: 'Teacher ID obejct',
      required: true,
      schema: {
        teacherId: 'TAT01912',
        firstName: 'Alan',
        lastName: 'Turing',
        email: 'TAT01912@university.edu',
        departments: [
            'CS',
            'MATH'
        ]
      }
    } */
  utils.handleErrors(teachersController.insertTeacher)
);

// ============================================
// PUT route
// ============================================
// update teacher by teacherId
router.put(
  "/:teacherId",
  /* #swagger.tags = ['Teachers'] */
  validator.teacherRules(),
  validator.checkData,
  /* #swagger.description = 'add teacher by teacherId'
    #swagger.parameters['teacherId'] = {
      in: 'body',
      description: 'Teacher ID obejct',
      required: true,
      schema: {
        teacherId: 'TAT01912',
        firstName: 'Alan',
        lastName: 'Turing',
        email: 'TAT01912@university.edu',
        departments: [
            'CS',
            'MATH'
        ]
      }
    } */
  utils.handleErrors(teachersController.updateTeacherById)
);

// // ============================================
// // DELETE route
// // ============================================
// // delete teacher by teacherId
router.delete(
  "/:teacherId",
  /* #swagger.tags = ['Teachers'] */ utils.handleErrors(
    teachersController.deleteByTeacherId
  )
);

module.exports = router;
