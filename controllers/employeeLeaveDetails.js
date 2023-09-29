const EmployeeLeaveDetails = require("../model/employeeLeaveDetails")
const { Op } = require("sequelize");
const Profile = require("../model/profile");
const WorkInfo = require("../model/workInfo");
const generalInfoId = require("../model/generalInfo");
const moment = require('moment');
const createEmployeeLeaveRequest = async (req, res) => {
    const { fromDate, toDate, reasonRequest, leaveType, duration, leaveStatus } = req.body

    let existingEmployeeLeaveRequest;
    try {
        let existingEmployeeLeaveCount = await Profile.findOne({
            where: { generalInfoId: req.user.id }, include: [
                {
                    model: WorkInfo,
                    as: 'workInfo'
                }

            ]
        })

        let doj = existingEmployeeLeaveCount.workInfo.empcurrent.dojString;


        // }
        let fromDateTs = moment(fromDate, 'DD-MM-YYYY').set('hour', 0).set('minute', 0).unix();
        let toDateTs = moment(toDate, "DD-MM-YYYY").set('hour', 23).set('minute', 59).unix();
        existingEmployeeLeaveRequest = await EmployeeLeaveDetails.findOne({ where: { dateTs: { [Op.gte]: fromDateTs, [Op.lte]: toDateTs } } })

        if (existingEmployeeLeaveRequest) {

            return res.status(400).json({ response: { success: false, message: "Employee leave already exist" } })
        }

        if (fromDate === "" || fromDate === "undefined") {
            return res.status(400).json({ response: { success: false, message: "From Date is  required" } })
        }
        if (toDate === "" || toDate === "undefined") {
            return res.status(400).json({ response: { success: false, message: "To Date is  required" } })
        }
        if (leaveType === "" || leaveType === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Leave Type  is  required" } })
        }
        if (reasonRequest === "" || reasonRequest === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Reason  is  required" } })
        }
        const repPerson = await Profile.findOne({
            where: { generalInfoId: req.user.id }, include: [{
                model: generalInfoId,
                as: 'generalInfo'
            },
            {
                model: WorkInfo,
                as: 'workInfo'
            }]
        })

        let employeeName = `${repPerson.generalInfo.personalInfo.fname} ${repPerson.generalInfo.personalInfo.lname}`

        let repPersonId = repPerson.workInfo.empcurrent.reportingPerson

        function reverseDate(date) {
            let strArr = String(date).split("-");
            return `${strArr[2]}-${strArr[1]}-${strArr[0]}`
        }


        var getDaysArray = function (start, end) {
            for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
                arr.push({ ...req.body, date: moment(dt).format("DD-MM-YYYY"), dateTs: moment(dt, 'DD-MM-YYYY').unix(), employeeName: employeeName, leaveStatus, duration, fromDateTs: moment(fromDate, 'DD-MM-YYYY').unix(), toDateTs: moment(toDate, 'DD-MM-YYYY').unix(), reportingPerson: repPersonId, user: req.user.id });
            }
            return arr;
        };

        let a = moment();
        var daylist = getDaysArray(new Date(reverseDate(fromDate)), new Date(reverseDate(toDate)));
        let date1 = daylist.map((x) => x.date)
        let invalidDate = [];

        for (let index = 0; index < date1.length; index++) {
            const element = date1[index];
            let leaveDays = moment(element, "DD/MM/YYYY");
            let dateofJoining = moment(doj, "DD/MM/YYYY");
            let diffDays = leaveDays.diff(dateofJoining, 'years');
            let diffDayN = a.diff(dateofJoining, 'years');
            let diffDayD = leaveDays.diff(a, 'days');

            console.log(diffDayD);
            if (diffDayD < 1) {
                
                invalidDate.push(element);
            }
            else if (diffDayN === 0) {
                if (diffDays !== 0) {
                  
                    invalidDate.push(element);
                }
            } else {
                if (a.year() !== leaveDays.year()) {
                    console.log("works");
                    invalidDate.push(element);
                }
            }
        }
        if (invalidDate.length > 0) {
            return res.status(400).json({ response: { success: false, message: "leave not available in your bucket" } })
        }

        const leavereq = await EmployeeLeaveDetails.bulkCreate(daylist);
        return res.status(200).json({ response: { success: true, message: "leave request created  successfully", employeeLeaveRequest: leavereq } })
    } catch (error) {
        return res.status(500).json({ response: { success: false, message: error } })
    }
}
//Get all emergency leave requests 
const createEmergencyLeaveRequest = async (req, res) => {
    const { fromDate, toDate, reasonRequest, leaveType, duration, date, employeeId } = req.body
    let existingEmployeeLeaveRequest;
    let fromDateTs = moment(fromDate, 'DD-MM-YYYY').set('hour', 0).set('minute', 0).unix();
    let toDateTs = moment(toDate, "DD-MM-YYYY").set('hour', 23).set('minute', 59).unix();
    existingEmployeeLeaveRequest = await EmployeeLeaveDetails.findOne({ where: { dateTs: { [Op.gte]: fromDateTs, [Op.lte]: toDateTs }, employeeId: employeeId } })
    console.log(fromDateTs, toDateTs, "exis")
    if (existingEmployeeLeaveRequest) {

        return res.status(400).json({ response: { success: false, message: "Employee leave already exist" } })
    }

    if (employeeId === "" || employeeId === "undefined") {
        return res.status(400).json({ response: { success: false, message: "EmployeeId is  required" } })
    }
    if (fromDate === "" || fromDate === "undefined") {
        return res.status(400).json({ response: { success: false, message: "From Date is  required" } })
    }
    if (toDate === "" || toDate === "undefined") {
        return res.status(400).json({ response: { success: false, message: "To Date is  required" } })
    }
    if (leaveType === "" || leaveType === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Leave Type  is  required" } })
    }
    if (reasonRequest === "" || reasonRequest === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Reason  is  required" } })
    }
    const repPerson = await Profile.findOne({
        where: { generalInfoId: req.user.id }, include: [{
            model: generalInfoId,
            as: 'generalInfo'
        },
        {
            model: WorkInfo,
            as: 'workInfo'
        }]
    })
    let employeeName = `${repPerson.generalInfo.personalInfo.fname} ${repPerson.generalInfo.personalInfo.lname}`

    let repPersonId = repPerson.workInfo.empcurrent.reportingPerson


    function reverseDate(date) {
        let strArr = String(date).split("-");
        return `${strArr[2]}-${strArr[1]}-${strArr[0]}`
    }

    var getDaysArray = function (start, end) {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            arr.push({ ...req.body, date: moment(dt).format("DD-MM-YYYY"), dateTs: moment(dt, 'DD-MM-YYYY').unix(), employeeName: employeeName, duration, leaveStatus: "APPROVED", fromDateTs: moment(fromDate, 'DD-MM-YYYY').unix(), toDateTs: moment(toDate, 'DD-MM-YYYY').unix(), reportingPerson: repPersonId, user: employeeId });
        }
        return arr;
    };

    var daylist = getDaysArray(new Date(reverseDate(fromDate)), new Date(reverseDate(toDate)));
    const leavereq = await EmployeeLeaveDetails.bulkCreate(daylist);
    if (!leavereq) {
        return res.status(400).json({ response: { success: false, message: "leave request doesn\'t created. Try again!" } })
    }
    return res.status(200).json({ response: { success: true, message: "leave request created  successfully", employeeLeaveRequest: leavereq } })
}
//UPDATE all employeeleaverequest
const updateEmployeeRequest = async (req, res) => {
    const { leaveStatus, reasonResponse } = req.body;
    const requestId = req.params.id

    let updateRequest;
    try {
        updateRequest = await EmployeeLeaveDetails.update({ leaveStatus, reasonResponse }, { where: { id: requestId } })
        console.log(updateRequest, "sokjdoj")
        if (!updateRequest) {
            return res.status(404).json({ success: false, message: "LeaveDetails not found" })
        }
        return res.status(200).json({ success: true, message: "Leave status updated successfully!", updateRequest: updateRequest })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Unable To Approved The Employee Request" })
    }

}




// Get all employeeleaverequest
const getAllEmployeeLeaveRequest = async (req, res) => {
    let existingEmployeeLeaveDetails
    try {
        existingEmployeeLeaveDetails = await EmployeeLeaveDetails.findAll();

        if (existingEmployeeLeaveDetails.length === 0) {
            return res.status(404).json({ message: "No leav request found" });
        }

        return res.status(200).json({ success: true, leaveRequests: existingEmployeeLeaveDetails });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
//Get all reportingto leaverequests
const getReportingLeaveRequest = async (req, res) => {
    let existingEmployeeLeaveRequest;

    existingEmployeeLeaveRequest = await EmployeeLeaveDetails.findAll({ where: { reportingPerson: req.user.id } })
    if (!existingEmployeeLeaveRequest) {
        return res.status(400).json({ message: "No employeeLeave Request Found" })
    }
    return res.status(200).json({ response: { success: true, employeeLeaveRequest: existingEmployeeLeaveRequest } })
}

//Get all own leaverequests
const getOwnLeaveRequest = async (req, res) => {
    let existingEmployeeLeaveRequest;

    existingEmployeeLeaveRequest = await EmployeeLeaveDetails.findAll({ where: { user: req.user.id } })
    if (!existingEmployeeLeaveRequest) {
        return res.status(400).json({ message: "No employeeLeave Request Found" })
    }
    return res.status(200).json({ response: { success: true, employeeLeaveRequest: existingEmployeeLeaveRequest } })
}
module.exports = { createEmployeeLeaveRequest, getAllEmployeeLeaveRequest, getReportingLeaveRequest, getOwnLeaveRequest, createEmergencyLeaveRequest, updateEmployeeRequest }