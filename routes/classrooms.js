const router = require("express").Router();
const classroomsController = require("../controllers/classrooms");
const utils = require("../utilities");
const validator = require("../utilities/validate");

// ============================================
// GET routes
// ============================================
// get all classrooms
router.get(
  "/",
  /* #swagger.tags = ['Classrooms'] */ utils.handleErrors(
    classroomsController.getAllClassrooms
  )
);

// // get classroom by classroomId
router.get(
  "/:classroomId",
  /* #swagger.tags = ['Classrooms'] */ utils.handleErrors(
    classroomsController.getClassroomsById
  )
);

// // ============================================
// // POST route
// // ============================================
// // add classroom
router.post(
  "/",
  /* #swagger.tags = ['Classrooms'] */
  validator.classroomRules(),
  validator.checkData,
  /* #swagger.description = 'add classroom'
    #swagger.parameters['classroom'] = {
      in: 'body',
      description: 'Classroom object',
      required: true,
      schema: {
        classroomId: 'MECHB360',
        roomNumber: '360',
        buildingId: 'MECHB',
        buidlingName: 'Mechanical Engineering',
        capacity: 40
      }
    } */
  utils.handleErrors(classroomsController.insertClassroom)
);

// ============================================
// PUT route
// ============================================
// update classroom by classroomId
router.put(
  "/:classroomId",
  /* #swagger.tags = ['Classrooms'] */
  validator.classroomRules(),
  validator.checkData,
  /* #swagger.description = 'update classroom by classroomId'
    #swagger.parameters['classroomId'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'Classroom ID'
    }
    #swagger.parameters['classroom'] = {
      in: 'body',
      description: 'Classroom object',
      required: true,
      schema: {
        classroomId: 'MECHB360',
        roomNumber: '360',
        buildingId: 'MECHB',
        buidlingName: 'Mechanical Engineering',
        capacity: 40
      }
    } */
  utils.handleErrors(classroomsController.updateClassroomById)
);

// // ============================================
// // DELETE route
// // ============================================
// // delete classroom by classroomId
router.delete(
  "/:classroomId",
  /* #swagger.tags = ['Classrooms'] */ utils.handleErrors(
    classroomsController.deleteByClassroomId
  )
);

module.exports = router;
