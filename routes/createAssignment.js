const express = require('express');
const createAssignmentControllers = require('../controllers/createAssignment');

const assignmentsRouter = express.Router();

assignmentsRouter.get("/",createAssignmentControllers.getAllAssigments)
assignmentsRouter.post("/CreateAssignment",createAssignmentControllers.CreateAssignment)

module.exports = assignmentsRouter