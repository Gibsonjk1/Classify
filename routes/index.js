const router = require("express").Router();
const swagger = require("./swagger");

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

router.use("/", swagger);
router.use("/class-sections", require("./class-sections"));
router.use("/classes", require("./classes"));
router.use("/classrooms", require("./classrooms"));
router.use("/teachers", require("./teachers"));
router.use("/students", require("./students"));
router.use("/enrollments", require("./enrollments"));
router.use("/semesters", require("./semesters"));

module.exports = router;
