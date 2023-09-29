//const profile = require("../model/profile");
const Profile = require("../model/profile");
const workInfo = require("../model/workInfo");

const createWorkInfo = async (req, res) => {

    const { empcurrent, empprevious,empid } = req.body;
   
console.log(req.user.id,"odisj")
    let exisitingWorkInfo;

    if (empcurrent.designation === "" || empcurrent.designation === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Designation is  required" } })
    }
    if (empcurrent.role === "" || empcurrent.role === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Role is  required" } })
    }
    if (empcurrent.reportingPerson === "" || empcurrent.reportingPerson === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Reporting Person is  required" } })
    }
    if (empcurrent.pfStatus === "" || empcurrent.pfStatus === "undefined") {
        return res.status(400).json({ response: { success: false, message: "PF Status is  required" } })
    }
    if (empcurrent.tdsStatus === "" || empcurrent.tdsStatus === "undefined") {
        return res.status(400).json({ response: { success: false, message: "TDS Status is  required" } })
    }

    if (empcurrent.salary === "" || empcurrent.salary === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Salary is  required" } })
    }
    if (empcurrent.dojString === "" || empcurrent.dojString === "undefined") {
        return res.status(400).json({ response: { success: false, message: "DOJ is  required" } })
    }
    if (empcurrent.empCode === "" || empcurrent.empCode === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Employee Code is  required" } })
    }


    empprevious.forEach(element => {
        if (element.designation === "" || element.designation === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Designation is  required" } })
        }
        if (element.servicefrom === "" || element.servicefrom === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Service From is  required" } })
        }
        if (element.serviceto === "" || element.serviceto === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Service To is  required" } })
        }
        if (element.experience === "" || element.experience === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Experince is  required" } })
        }
        if (element.jd === "" || element.jd === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Job Description is  required" } })
        }
        if (element.ctc === "" || element.ctc === "undefined") {
            return res.status(400).json({ response: { success: false, message: "CTC is  required" } })
        }
    })
    // exisitingWorkInfo = await workInfo.findOne({where:{ fname: workInfo.fname }});

    // if (exisitingWorkInfo) {
    //     return res.status(400).json({ response: { success: false, message: "workInfo already  exists" } })
    // }

    const wrkInfo = new workInfo({ empcurrent, empprevious,empid, user: req.user.id });

    let savedworkInfo = await wrkInfo.save();
    await Profile.update({ WorkInfo: savedworkInfo.id }, { where: { generalInfoId: req.body.empid } });
    // if (!savedworkInfo) {
    //     return res.status(400).json({ response: { success: false, message: "workInfo  doesn\'t created. Try again!" } })
    // }
    //    profile.updateOne({"generalInfo":req.body.empid},{"$set": {"workInfo":savedworkInfo._id}});
    return res.status(200).json({ response: { success: true, message: "workInfo created  successfully", workInfo: savedworkInfo } })

}


const getAllWorkInfo = async (req, res, next) => {

    let exisitingWorkInfo;
    exisitingWorkInfo = await workInfo.findAll()
    if (!exisitingWorkInfo) {
        return res.status(400).json({ message: "No General Info Found" })
    }
    return res.status(200).json({ response: { success: true, workInfo: exisitingWorkInfo } });
}

module.exports = {
    createWorkInfo,
    getAllWorkInfo
}