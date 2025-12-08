const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};

// ==============================================
// student validation rules
// ==============================================
validate.studentRules = () => {
  return [
    //Student ID rules
    body("studentId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 9 })
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
    //major required rule
    body("major")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a major."),
    //createdAt required rule
    body("createdAt")
      .trim()
      .escape()
      .notEmpty()
      .isISO8601()
      .toDate()
      .withMessage("Please provide a last name."),
  ];
};

// ==============================================
// teacher validation rules
// ==============================================
validate.teacherRules = () => {
  return [
    //Teacher ID rules
    body("teacherId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 8 })
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

// ==============================================
// semester validation rules
// ==============================================
validate.semesterRules = () => {
  return [
    //semester rules
    //semesterId required rules
    body("semesterId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Semester ID is required."),
    //semester year required rule
    body("year")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .toInt()
      .isLength({ min: 4, max: 4 })
      .withMessage("Semester year is required."),
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
      .withMessage("Please provide a valid start date."),
    //valid end date rule
    body("endDate")
      .trim()
      .escape()
      .notEmpty()
      .isISO8601()
      .withMessage("Please provide a valid end date.")
      // end date is after start date
      .custom((value, { req }) => {
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

// ==============================================
// enrollment validation rules
// ==============================================
validate.enrollmentRules = () => {
  return [
    //enrollment ID rules
    body("enrollmentId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 15 })
      .withMessage("Enrollment ID is required."),
    //student ID rules
    body("studentId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Student ID is required."),
    //department ID rules
    body("departmentId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Department ID is required."),
    //status required rule
    body("status")
      .trim()
      .escape()
      .notEmpty()
      .isIn(["enrolled", "waitlisted", "dropped"])
      .withMessage("Please provide a valid enrollment status."),
    //enrolledAt required rule
    body("enrolledAt")
      .optional({ nullable: true })
      .trim()
      .escape()
      .isString()
      .toDate()
      .isISO8601()
      .withMessage("Must be a date formatted as ISO8601"),
    //gpa required rule
    body("gpa")
      .optional({ nullable: true })
      .trim()
      .escape()
      .matches(/^\P{L}*$/u)
      .isFloat()
      .withMessage("must be formatted as a numeric grade point average (gpa) ")
  ];
};

// ==============================================
// classroom validation rules
// ==============================================
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

// ==============================================
// class validation rules
// ==============================================
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

// ==============================================
// section validation rules
// ==============================================
validate.sectionRules = () => {
  return [
    //sectionId required rule
    body("sectionId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Section ID is required."),
    //classId required rule
    body("classId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Class ID is required."),
    //semesterId required rule
    body("semesterId")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
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
      .withMessage("Classroom ID is required."),
    //meetingTimes required rule
    body("meetingTimes")
      .notEmpty()
      .isArray()
      .withMessage("Meeting times are required."),
    body("meetingTimes[0].day")
      .exists()
      .trim()
      .escape()
      .isString()
      .isLength({ min: 3, max: 3 })
      .isIn(["Mon", "Tue", "Wed", "Thu", "Fri"]),
    body(
      "meetingTimes[1].day",
      "meetingTimes[2].day",
      "meetingTimes[3].day",
      "meetingTimes[4].day"
    )
      .optional()
      .trim()
      .escape()
      .isString()
      .isLength({ min: 3, max: 3 })
      .isIn(["Mon", "Tue", "Wed", "Thu", "Fri"])
      .withMessage(
        "Must be a weekday abbreviation using three-letter day code"
      ),
    body("meetingTimes[0].start", "meetingTimes[0].end")
      .exists()
      .trim()
      .escape()
      .notEmpty()
      .isString()
      .matches(/^\P{L}*$/u)
      .isLength({ min: 5, max: 5 })
      .withMessage("Time must be string formatted as 00:00"),
    body(
      "meetingTimes[1].start",
      "meetingTimes[1].end",
      "meetingTimes[2].start",
      "meetingTimes[2].end",
      "meetingTimes[3].start",
      "meetingTimes[3].end",
      "meetingTimes[4].start",
      "meetingTimes[4].end"
    )
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isString()
      .matches(/^\P{L}*$/u)
      .isLength({ min: 5, max: 5 })
      .withMessage("Time must be string formatted as 00:00"),
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
