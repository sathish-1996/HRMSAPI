const documentInfo = require("../model/documentInfo");
const profile = require("../model/profile");

const createDocumentInfo = async (req, res) => {

    const { employeeBasic, employeeBank, employeeSalary, emailid, empid } = req.body;

    let exisitingDocumentInfo;

    if (employeeBasic.passportno === "" || employeeBasic.passportno === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Passport No is  required" } })
    }
    if (employeeBasic.aadhaarno === "" || employeeBasic.aadhaarno === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Aadhar No is  required" } })
    }
    if (employeeBasic.vaccinateddate1 === "" || employeeBasic.vaccinateddate1 === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Vaccinatedate 1 is  required" } })
    }
    if (employeeBasic.vaccinateddate2 === "" || employeeBasic.vaccinateddate2 === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Vaccinatedate 2 is  required" } })
    }
    if (employeeBasic.booster === "" || employeeBasic.booster === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Booster is  required" } })
    }

    if (employeeBank.account === "" || employeeBank.account === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Account is  required" } })
    }
    if (employeeBank.ifsccode === "" || employeeBank.ifsccode === "undefined") {
        return res.status(400).json({ response: { success: false, message: "IFSC Code is  required" } })
    }
    if (employeeBank.branch === "" || employeeBank.branch === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Branch Name is  required" } })
    }
    if (employeeBank.bank === "" || employeeBank.bank === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Bank Name is  required" } })
    }
    if (employeeBank.accountantName === "" || employeeBank.accountantName === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Account Holder's Name is  required" } })
    }

    if (employeeSalary.panNo === "" || employeeSalary.panNo === "undefined") {
        return res.status(400).json({ response: { success: false, message: "PAN No is  required" } })
    }
    if (employeeSalary.uanNo === "" || employeeSalary.uanNo === "undefined") {
        return res.status(400).json({ response: { success: false, message: "UAN No is  required" } })
    }
    if (employeeSalary.pfNo === "" || employeeSalary.pfNo === "undefined") {
        return res.status(400).json({ response: { success: false, message: "PF No is  required" } })
    }

    if (emailid === "" || emailid === "undefined") {
        return res.status(400).json({ response: { success: false, message: "Email Id is  required" } })
    }

    // exisitingWorkInfo = await workInfo.findOne({ fname: workInfo.fname });

    // if (exisitingWorkInfo) {
    //     return res.status(400).json({ response: { success: false, message: "workInfo already  exists" } })
    // }

    const docInfo = new documentInfo({ employeeBasic, employeeBank, employeeSalary, emailid, empid: empid, user: req.user.id });

    let saveddocumentInfo = await docInfo.save();
    await profile.update({ DocumentInfo: saveddocumentInfo.id }, { where: { generalInfoId: req.body.empid } });
    if (!saveddocumentInfo) {
        return res.status(400).json({ response: { success: false, message: "documentInfo  doesn\'t created. Try again!" } })
    }

    return res.status(200).json({ response: { success: true, message: "documentInfo created  successfully", documentInfo: saveddocumentInfo } })

}


const getAllDocumentInfo = async (req, res, next) => {

    let exisitingDocumentInfo;
    exisitingDocumentInfo = await documentInfo.find()
    if (!exisitingDocumentInfo) {
        return res.status(400).json({ message: "No Document Info Found" })
    }
    return res.status(200).json({ response: { success: true, documentInfo: exisitingDocumentInfo } });
}

module.exports = {
    createDocumentInfo,
    getAllDocumentInfo
}