const express = require("express");
const passport = require("passport");
const userControllers = require('../controllers/user');
const departmentControllers = require("../controllers/department");
const designationControllers = require("../controllers/designation");
const roleControllers = require("../controllers/role");
const workInfoControllers = require("../controllers/workInfo");
const itSupportControllers = require("../controllers/createITSupport");
const generalInfoControllers = require("../controllers/generalInfo");
const educationInfoControllers = require("../controllers/educationInfo");
const profileControllers = require("../controllers/profile");
const documentInfoControllers = require("../controllers/documentInfo");
const financeControllers = require("../controllers/form-16");
const leaveControllers = require("../controllers/employeeLeaveDetails");
const leaveDaysControllers = require("../controllers/employeeLeaveAvailableDays");

const router = express.Router();
const jwtAuth = require('../middleware/passport.js');
const NeedAuth = jwtAuth(passport).authenticate("jwt", { session: false })



const { v4: uuidv4 } = require('uuid');
const multer = require("multer")
// const storage = multer.memoryStorage();
const limits = { fileSize: 2000000 };
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    let destination = uuidv4()
    let splitName = String(file.originalname).split('.');
    let largepic = destination + `-large.${splitName[splitName.length - 1]}`;
    req.body.newPath = largepic;
    cb(null, largepic);
  },
})
const upload = multer({ storage: storage })


router.get('/', userControllers.getAllUser)
router.post('/signup', userControllers.signup)

router.post('/login', userControllers.login)

//department router
router.post('/createDepartment', departmentControllers.createDepartment);
router.get('/getAllDepartment', departmentControllers.getAllDepartment);
router.put('/updateDepartment', departmentControllers.updateDepartment);
router.delete('/deleteDepartment/:departmentId', departmentControllers.deleteDepartment);

//designation router
router.post('/createdesignation', designationControllers.createdesignation);
router.get('/getAlldesignation', designationControllers.getAlldesignation);
router.get('/getOneDepartment/:departmentId', designationControllers.getDepartmentById);
router.put('/updatedesignation', designationControllers.updatedesignation);
router.delete('/deletedesignation/:designationId', designationControllers.deletedesignation);

//role router
router.post('/createRole', roleControllers.createRole);
router.get('/getAllRole', roleControllers.getAllRole);
router.put('/updateRole', roleControllers.updateRole);
router.delete('/deleteRole/:roleId', roleControllers.deleteRole);

//generalInfo router
router.post('/createGeneralInfo', generalInfoControllers.createGeneralInfo);
router.put('/updateGeneralInfo', generalInfoControllers.updateGeneralInfo);
router.get('/getAllGeneralInfo', generalInfoControllers.getAllGeneralInfo);
router.get('/getById/:id', generalInfoControllers.getById)

//educationInfo router
router.post('/createEducationInfo', educationInfoControllers.createEducationInfo);
router.get('/getAllEducationInfo', educationInfoControllers.getAllEducationInfo);
router.get('/getById/:id', educationInfoControllers.getById);
router.put('/updateEducationInfo', educationInfoControllers.updateEducationInfo);


//profile router
router.get('/getAllProfile', profileControllers.getAllProfile);
router.get('/getProfile', profileControllers.getProfile);

//documentInfo router
router.post('/createDocumentInfo', NeedAuth, documentInfoControllers.createDocumentInfo);
router.get('/getAllDocumentInfo', NeedAuth, documentInfoControllers.getAllDocumentInfo);


//workInfo router
router.post('/createWorkInfo', NeedAuth, workInfoControllers.createWorkInfo);
router.get('/getAllWorkInfo', NeedAuth, workInfoControllers.getAllWorkInfo);

//employeeLeave Details router
router.post('/createEmployeeLeaveRequest', NeedAuth, leaveControllers.createEmployeeLeaveRequest);
router.post('/createEmergencyLeaveRequest', NeedAuth, leaveControllers.createEmergencyLeaveRequest);
router.put('/updateLeaveRequest/:id', NeedAuth, leaveControllers.updateEmployeeRequest);
router.get('/getAllEmployeeLeaveRequest', NeedAuth, leaveControllers.getAllEmployeeLeaveRequest);
router.get('/getOwnLeaveRequest', NeedAuth, leaveControllers.getOwnLeaveRequest);
router.get('/getReportingLeaveRequest', NeedAuth, leaveControllers.getReportingLeaveRequest);

//employeeLeaveAvailableDays router
router.get('/getEmployeeLeaveDays', NeedAuth, leaveDaysControllers.getEmployeeLeaveDays);


//documentUplaod router

router.post('/upload', NeedAuth, upload.single("avatar"), financeControllers.createUplaodDocument);
router.get('/doc', (req, res) => {
  res.download(`${req.query.path}`);
})
router.get('/getAlluploadDocument', NeedAuth, financeControllers.getAllUplaodDocument);
router.post('/createDocumentInfo', documentInfoControllers.createDocumentInfo);
router.get('/getAllDocumentInfo', documentInfoControllers.getAllDocumentInfo);


//ITSupport router
router.post('/createITSupport', NeedAuth, itSupportControllers.createITSupport);
router.get('/getAllIT-Support', NeedAuth, itSupportControllers.getAllITSupport);
router.get('/getSupportTypeById/:id', NeedAuth, itSupportControllers.getSupportTypeById);
router.put('/updateITSupport', NeedAuth, itSupportControllers.updateITSupport);
router.delete('/delteITSupport/:id', NeedAuth, itSupportControllers.deleteITSupport);

module.exports = router;