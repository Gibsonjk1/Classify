const mongoDb = require("../../db/connection");

const getAllStudents = async () => {
  const result = mongoDb.getDb().db("Classify").collection("students").find();
  const students = await result.toArray();
  return students;
};

const getStudentById = async (studentId) => {
  const result = mongoDb
    .getDb()
    .db("Classify")
    .collection("students")
    .find({ studentId: studentId });
  const student = await result.toArray();
  return student[0];
};

module.exports = {
  getAllStudents,
  getStudentById,
};