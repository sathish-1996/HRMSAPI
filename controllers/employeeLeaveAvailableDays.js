const EmployeeLeaveDetails = require("../model/employeeLeaveDetails");
const leaveInfoSchema = require("../model/leaveAvailabeDays")
const profile = require("../model/profile");;
const moment = require('moment');
const { Op } = require("sequelize");
const WorkInfo = require("../model/workInfo");
const getEmployeeLeaveDays = async (req, res) => {
    let existingEmployeeLeaveCount, totalLeave = 36;
    existingEmployeeLeaveCount = await profile.findOne({
        where: { generalInfoId: req.user.id }, include: [
            {
                model: WorkInfo,
                as: 'workInfo'
            }

        ]
    })
    let doj = existingEmployeeLeaveCount.workInfo.empcurrent.dojString;

    var a = moment("16/05/2021", "DD/MM/YYYY");
    var b = moment();



    let diffDays = b.diff(a, 'years');
    console.log(diffDays, "mso nsdbsb jsbdjsb")

    if (diffDays === 0) {

        const date = new Date(a);

        date.setFullYear(date.getFullYear() + 1);

        let val23 = moment(date).format("DD-MM-YYYY")

        let dfays = moment(a, "DD-MM-YYYY").unix()
        let dfays1 = moment(val23, "DD-MM-YYYY").unix()
        let err;
        let getLeave = await EmployeeLeaveDetails.findAll({ where: { fromDateTs: { [Op.gte]: dfays, [Op.lte]: dfays1 } }, user: req.user.id });
        console.log(getLeave, "sgetLeave")
       
        let countDays = await leaveInfoSchema.findOne({ where: { limit: { [Op.lte]: diffDays } } });

        
        let val = []
        const casualLeave = getLeave.filter((x) => x?.leaveStatus === "APPROVED" && x.leaveType === "CasualLeave")
        console.log(casualLeave,"sdsmd")
        const sickLeave = getLeave.filter((x) => x?.leaveStatus === "APPROVED" && x.leaveType === "SickLeave")
        console.log(sickLeave, "sgetLeave")
        const earnedLeave = getLeave.filter((x) => x?.leaveStatus === "APPROVED" && x.leaveType === "EarnedLeave")
        const   casualLeaveCount = casualLeave?.length;
        const sickLeaveCount = sickLeave?.length
        const earnedLeaveCount = earnedLeave?.length;
        var obj = {};
        var obj1 = {};

        obj["casualLeave"] = countDays?.casualleave?.length >= 0 ? 0 : countDays?.casualleave - casualLeaveCount;
        obj["sickLeave"] = countDays?.sickleave?.length >= 0 ? 0 : countDays?.sickleave- sickLeaveCount;
        obj["earnedLeave"] = countDays?.earnedleave?.length >= 0 ? 0 : countDays?.earnedleave - earnedLeaveCount;
        obj["name"] = obj["casualLeave"] + obj["sickLeave"] + obj["earnedLeave"];

        obj1["casualLeave"] = casualLeaveCount;
        obj1["sickLeave"] = sickLeaveCount;
        obj1["earnedLeave"] = earnedLeaveCount;
        obj1["name"] = obj1["casualLeave"] + obj1["sickLeave"] + obj1["earnedLeave"];
        val.push({ "TotalLeave": countDays, "AvailableLeave": obj, "UsedLeave": obj1 });
        if (!existingEmployeeLeaveCount) {
            return res.status(400).json({ message: "No employeeLeave Request Found" })
        }
        return res.status(200).json({ response: { success: true, employeeLeaveCount: val } })
            ;
    }
    else if (diffDays === 1) {
        var pastYear = a.year() + 1, before = 24, after = 36;

        a.year(pastYear);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let getDate = new Date(a)
        let month = getDate.getMonth();
        if (a.date() > 15) {
            month = month + 1;
        }
        console.log(doj, req.user.id, "user    iddddd")
        var useDate = getDate.getFullYear()

        const remaining = months.slice(month).length;
        let dfays = moment(getDate, "DD-MM-YYYY").unix()
        let dfays1 = moment(`31-12-${useDate}`, "DD-MM-YYYY").unix()

        let getLeave = await EmployeeLeaveDetails.findAll({ where: { fromDateTs: { [Op.gte]: dfays, [Op.lte]: dfays1 } }, user: req.user.id });

        totalLeave = ((remaining * (after / 12)));
        let arrLeaveDays = totalLeave / 3

        let val = []
     
        if (getLeave._doc) {
            getLeave = getLeave._doc;
        }
        let countDays = await leaveInfoSchema.findOne({ where: { limit: { [Op.lte]: diffDays } } });

        // if (errS) {
        //     return ReE(res, errS, 500);
        // }
        // if (countDays._doc) {
        //     countDays = countDays._doc;
        // }
        const countDay = await EmployeeLeaveDetails.findOne({ where: { user: req.user.id } })
        const casualLeave = getLeave.filter((x) => x?.leaveStatus === "APPROVED" && x.leaveType === "CasualLeave")
        const sickLeave = getLeave.filter((x) => x?.leaveStatus === "APPROVED" && x.leaveType === "SickLeave")
        const earnedLeave = getLeave.filter((x) => x?.leaveStatus === "APPROVED" && x.leaveType === "EarnedLeave")
        const casualLeaveCount = casualLeave.length;
        const sickLeaveCount = sickLeave.length
        const earnedLeaveCount = earnedLeave.length;
        var obj = {};
        var obj1 = {};
        var obj2 = {}

        obj["casualLeave"] = arrLeaveDays - casualLeaveCount;
        obj["sickLeave"] = arrLeaveDays - sickLeaveCount;
        obj["earnedLeave"] = arrLeaveDays - earnedLeaveCount;
        obj["name"] = obj["casualLeave"] + obj["sickLeave"] + obj["earnedLeave"];

        obj1["casualLeave"] = casualLeaveCount;
        obj1["sickLeave"] = sickLeaveCount;
        obj1["earnedLeave"] = earnedLeaveCount;
        obj1["name"] = obj1["casualLeave"] + obj1["sickLeave"] + obj1["earnedLeave"];

        obj2["casualLeave"] = arrLeaveDays;
        obj2["sickLeave"] = arrLeaveDays;
        obj2["earnedLeave"] = arrLeaveDays;
        obj2["name"] = obj2["casualLeave"] + obj2["sickLeave"] + obj2["earnedLeave"];



        val.push({ "TotalLeave": obj2, "AvailableLeave": obj, "UsedLeave": obj1 });
        if (!existingEmployeeLeaveCount) {
            return res.status(400).json({ message: "No employeeLeave Request Found" })
        }
        return res.status(200).json({ response: { success: true, employeeLeaveCount: val } })

    } else {


        var useDate = new Date().getFullYear()

        let dfays = moment(`01-01-${useDate}`, "DD-MM-YYYY").unix()
        let dfays1 = moment(`31-12-${useDate}`, "DD-MM-YYYY").unix()

        let getLeave = await EmployeeLeaveDetails.findAll({ where: { fromDateTs: { [Op.gte]: dfays, [Op.lte]: dfays1 }, user: req.user.id } });

        let val = []
        let err;
        if (err) {
            return ReE(res, err, 500);
        }
        if (getLeave._doc) {
            getLeave = getLeave._doc;
        }

        let countDays = await leaveInfoSchema.findOne({ where: { limit: 1 } });

        console.log(countDays.casualleave, "opsndnsn msndsnd")
        // if (countDays._doc) {
        //     countDays = countDays._doc;
        // }

        const countDay = await EmployeeLeaveDetails.findOne({ where: { user: req.user.id } })
        const casualLeave = getLeave.filter((x) => x?.leaveStatus === "APPROVED" && x.leaveType === "CasualLeave")

        const sickLeave = getLeave.filter((x) => x?.leaveStatus === "APPROVED" && x.leaveType === "SickLeave")
        const earnedLeave = getLeave.filter((x) => x?.leaveStatus === "APPROVED" && x.leaveType === "EarnedLeave")
        const casualLeaveCount = casualLeave.length;

        const sickLeaveCount = sickLeave.length
        const earnedLeaveCount = earnedLeave.length;
        var obj = {};
        var obj1 = {};

        obj["casualLeave"] = countDays?.casualleave?.length >= 0 ? 0 : countDays?.casualleave - casualLeaveCount;
        obj["sickLeave"] = countDays?.sickleave?.length >= 0 ? 0 : countDays?.sickleave - sickLeaveCount;
        obj["earnedLeave"] = countDays?.earnedleave?.length >= 0 ? 0 : countDays?.earnedleave - earnedLeaveCount;
        obj["name"] = obj["casualLeave"] + obj["sickLeave"] + obj["earnedLeave"];

        obj1["casualLeave"] = casualLeaveCount;
        obj1["sickLeave"] = sickLeaveCount;
        obj1["earnedLeave"] = earnedLeaveCount;
        obj1["name"] = obj1["casualLeave"] + obj1["sickLeave"] + obj1["earnedLeave"];
        val.push({ "TotalLeave": countDays, "AvailableLeave": obj, "UsedLeave": obj1 });
        if (!existingEmployeeLeaveCount) {
            return res.status(400).json({ message: "No employeeLeave Request Found" })
        }
        return res.status(200).json({ response: { success: true, employeeLeaveCount: val } })
    }
}

module.exports = { getEmployeeLeaveDays }