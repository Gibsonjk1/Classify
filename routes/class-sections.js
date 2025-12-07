const router = require("express").Router();
const classSectionController = require("../controllers/class-sections");
const utils = require("../utilities");
const validator = require("../utilities/validate");

// ============================================
// GET routes
// ============================================
// get all class sections
router.get(
  "/",
  /* #swagger.tags = ['Class Sections'] */ utils.handleErrors(
    classSectionController.getAllCourseSections
  )
);

// // get class section by sectionId
router.get(
  "/:sectionId",
  /* #swagger.tags = ['Class Sections'] */ utils.handleErrors(
    classSectionController.getBySectionId
  )
);

// // ============================================
// // POST route
// // ============================================
// // add class section
router.post(
  "/",
  /* #swagger.tags = ['Class Sections'] */
  validator.sectionRules(),
  validator.checkData,
  /* #swagger.description = 'add class section by sectionId'
    #swagger.parameters['classSection'] = {
        in: 'body',
        description: 'Class section obejct',
        required: true,
        schema: {
            sectionId: 'CSE212-001',
            classId: 'CSE212',
            semesterId: 'fall2025',
            teacherId: 'T12345',
            classroomId: 'CSB201',
            meetingTimes: [
            { "day": "Mon", "start": "10:00", "end": "11:15" },
            { "day": "Wed", "start": "10:00", "end": "11:15" }
            ],
            capacity: 40
        }
    } */
  utils.handleErrors(classSectionController.insertClassSection)
);

// ============================================
// PUT route
// ============================================
// update class section by sectionId
router.put(
  "/:sectionId",
  /* #swagger.tags = ['Class Sections'] */
  validator.sectionRules(),
  validator.checkData,
  /* #swagger.description = 'update class section by sectionId'
    #swagger.parameters['classSection'] = {
        in: 'body',
        description: 'Class section obejct',
        required: true,
        schema: {
            sectionId: 'CSE212-001',
            classId: 'CSE212',
            semesterId: 'fall2025',
            teacherId: 'T12345',
            classroomId: 'CSB201',
            meetingTimes: [
            { "day": "Mon", "start": "10:00", "end": "11:15" },
            { "day": "Wed", "start": "10:00", "end": "11:15" }
            ],
            capacity: 40
        }
    } */
  utils.handleErrors(classSectionController.updateClassSection)
);

// // ============================================
// // DELETE route
// // ============================================
// // delete class section by sectionId
router.delete(
  "/:sectionId",
  /* #swagger.tags = ['Class Sections'] */ utils.handleErrors(
    classSectionController.deleteBySectionId
  )
);

module.exports = router;
