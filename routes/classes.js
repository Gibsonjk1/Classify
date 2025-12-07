const router = require("express").Router();
const classesController = require("../controllers/classes");
const utils = require("../utilities");
const validator = require("../utilities/validate");

// ============================================
// GET routes
// ============================================
// get all classes
router.get(
  "/",
  /* #swagger.tags = ['Classes'] */ utils.handleErrors(
    classesController.getAllClasses
  )
);

// // get class classId
router.get(
  "/:classId",
  /* #swagger.tags = ['Classes'] */ utils.handleErrors(
    classesController.getByClassId
  )
);

// // ============================================
// // POST route
// // ============================================
// // add class
router.post(
  "/",
  /* #swagger.tags = ['Classes'] */
  validator.classRules(),
  validator.checkData,
  /* #swagger.description = 'add class by classId'
    #swagger.parameters['classId'] = {
      in: 'body',
      description: 'Class ID obejct',
      required: true,
      schema: {
        classId: 'MECH360',
        title: 'Automotive Restoration',
        credits: 3,
        description: 'The restoration of vintage vehicles...'
      }
    } */
  utils.handleErrors(classesController.insertClass)
);

// ============================================
// PUT route
// ============================================
// update class by courseCode
router.put(
  "/:classId",
  /* #swagger.tags = ['Classes'] */
  validator.classRules(),
  validator.checkData,
  /* #swagger.description = 'update class by classId'
    #swagger.parameters['classId'] = {
      in: 'body',
      description: 'Class ID obejct',
      required: true,
      schema: {
        classId: 'MECH360',
        title: 'Automotive Restoration',
        credits: 3,
        description: 'The restoration of vintage vehicles...'
      }
    } */
  utils.handleErrors(classesController.updateClassById)
);

// // ============================================
// // DELETE route
// // ============================================
// // delete class by courseCode
router.delete(
  "/:classId",
  /* #swagger.tags = ['Classes'] */ utils.handleErrors(
    classesController.deleteByClassId
  )
);

module.exports = router;
