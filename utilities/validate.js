const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};

validate.studentRules = () => {
  return [
    //Student ID rules
    body("studentId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Student ID is required"),
    //firstname required rule
    body("firstName")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("first name is required."),
    //last name required rule
    body("lastName")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."),
    // valid email is required
    body("email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required."),
  ];
};

validate.teacherRules = () => {
  return [
    //Teacher ID rules
    body("teacherId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Teacher ID is required"),
    //firstname required rule
    body("firstName")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("first name is required."),
    //last name required rule
    body("lastName")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."),
    // valid email is required
    body("email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required."),
    // department required rule
    body("departments")
      .trim()
      .escape()
      .notEmpty()
      .isArray()
      .isLength({ min: 1 })
      .withMessage("Please provide a department."),
  ];
};

validate.semesterRules = () => {
  return [
    //semester rules
    body("semester_id")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Semester ID is required."),
    //semester name required rule
    body("name")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Semester name is required."),
    //semester year required rule
    body("year")
      .trim()
      .notEmpty()
      .withMessage("Year is required.")
      .isLength({ min: 4, max: 4 })
      .isNumeric()
      .withMessage("Please provide a valid year."),
    //semester term required rule
    body("term")
      .trim()
      .escape()
      .notEmpty()
      .isIn(["Spring", "Summer", "Fall", "Winter"])
      .withMessage("Please provide a valid term."),
    //valid start date rule
    body("startDate")
      .trim()
      .escape()
      .notEmpty()
      .isISO8601()
      .toDate()
      .withMessage("Please provide a valid start date."),
    //valid end date rule
    body("endDate")
      .trim()
      .escape()
      .notEmpty()
      .isISO8601()
      .toDate()
      .withMessage("Please provide a valid end date."),
    // end date is after start date
    body("endDate").custom((value, { req }) => {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(value);
      if (endDate <= startDate) {
        throw new Error("End date must be after start date.");
      }
      return true;
    }),
    // active status required rule
    body("active")
      .trim()
      .escape()
      .notEmpty()
      .isBoolean()
      .withMessage("Please provide a valid active status."),
  ];
};

validate.enrollmentRules = () => {
  return [
    //student ID rules
    body("studentId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Student ID is required."),
    //section ID rules
    body("sectionId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("section ID is required."),
    //status required rule
    body("status")
      .trim()
      .escape()
      .notEmpty()
      .isIn(["enrolled", "waitlisted", "dropped"])
      .withMessage("Please provide a valid enrollment status."),
  ];
  /*
    Did not include validation for grades as they can be null/empty initially
    Did not include validation for enrollment date as it can be set automatically to current date
    */
};

validate.classroomRules = () => {
  return [
    //classroomId required rule
    body("classroomId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("Classroom ID is required."),
    //room number required rule
    body("roomNumber")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Room number is required."),
    //building ID required rule
    body("buildingId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Building ID is required."),
    //building ID required rule
    body("buildingName")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Building name is required."),
    //capacity required rule
    body("capacity")
      .trim()
      .notEmpty()
      .withMessage("Capacity is required.")
      .isNumeric()
      .withMessage("Please provide a valid capacity number."),
  ];
};

validate.classRules = () => {
  return [
    //classId required rule
    body("classId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Class ID is required."),
    //Title required rule
    body("title")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("Course title is required."),
    //credits required rule
    body("credits")
      .trim()
      .notEmpty()
      .withMessage("Credits are required.")
      .isInt()
      .withMessage("Please provide a valid number of credits."),
    // description required rule
    body("description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 10 })
      .withMessage("Class description is required."),
  ];
};

validate.sectionRules = () => {
  return [
    //sectionId required rule
    body("sectionId")
      .trim()
      .escape()
      .notEmpty()
      // .isLength({ min: 1 })
      .withMessage("Section ID is required."),
    //classId required rule
    body("classId")
      .trim()
      .escape()
      .notEmpty()
      // .isLength({ min: 1 })
      .withMessage("Class ID is required."),
    //semesterId required rule
    body("semesterId")
      .trim()
      .escape()
      .notEmpty()
      // .isLength({ min: 1 })
      .withMessage("Semester ID is required."),
    //teacherId required rule
    body("teacherId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Teacher ID is required."),
    //classroomId required rule
    body("classroomId")
      .trim()
      .escape()
      .notEmpty()
      // .isLength({ min: 1 })
      .withMessage("Classroom ID is required."),
    //meetingTimes required rule
    // body("meetingTimes")
    //   .trim()
    //   .escape()
    //   .notEmpty()
    //   .isArray()
    //   .isLength({ min: 1 })
    //   .withMessage("Meeting times are required."),
    //capacity required rule
    body("capacity")
      .trim()
      .notEmpty()
      .withMessage("Capacity is required.")
      .isNumeric()
      .withMessage("Please provide a valid capacity number."),
  ];
};
/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
