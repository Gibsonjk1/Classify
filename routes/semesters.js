const router = require("express").Router();
const semestersController = require("../controllers/semesters");
const utils = require("../utilities");
const validator = require("../utilities/validate");

// ============================================
// GET routes
// ============================================
// get all semesters
router.get(
  "/",
  /* #swagger.tags = ['Semesters'] */ utils.handleErrors(
    semestersController.getAllSemesters
  )
);

// get semester by semesterId
router.get(
  "/:semesterId",
  /* #swagger.tags = ['Semesters'] */ utils.handleErrors(
    semestersController.getSemesterById
  )
);

// // ============================================
// // POST route
// // ============================================
// // add semester
router.post(
  "/",
  /* #swagger.tags = ['Semesters'] */
  // validator.semesterRules(),
  // validator.checkData,
  /* #swagger.description = 'add semester by semesterId'
    #swagger.parameters['semesterId'] = {
      in: 'body',
      description: 'Semester ID obejct',
      required: true,
      schema: {
        semesterId: 'fall2025',
        year: 2025,
        term: 'Fall',
        startDate: '2025-08-26',
        endDate: '2025-12-13',
        active: true,
      }
    } */
  utils.handleErrors(semestersController.insertSemester)
);

// ============================================
// PUT route
// ============================================
// update semester by semesterId
router.put(
  "/:semesterId",
  /* #swagger.tags = ['Semesters'] */
  // validator.semesterRules(),
  // validator.checkData,
  /* #swagger.description = 'update semester by semesterId'
    #swagger.parameters['semesterId'] = {
      in: 'body',
      description: 'Semester ID obejct',
      required: true,
      schema: {
        semesterId: 'fall2025',
        year: 2025,
        term: 'Fall',
        startDate: '2025-08-26',
        endDate: '2025-12-13',
        active: true,
      }
    } */
  utils.handleErrors(semestersController.updateSemesterById)
);

// // ============================================
// // DELETE route
// // ============================================
// // delete semester by semesterId
router.delete(
  "/:semesterId",
  /* #swagger.tags = ['Semesters'] */ utils.handleErrors(
    semestersController.deleteSemesterById
  )
);

module.exports = router;
