const {GraphQLResolveInfo} = require('graphql');
const {getStudentById, getAllStudents} = require('../services/students.service');

const studentsResolver = {
  Query: {
    getStudent: async (_, args, context, info) => {
      const { studentId } = args;
      return await getStudentById(studentId);
    },

    getAllStudents: async (_, args, context, info) => {
      return await getAllStudents();
    },
  },
};

module.exports = {
  studentsResolver,
};