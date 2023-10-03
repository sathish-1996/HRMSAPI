// const documentInfo = require("../model/documentInfo");
// const educationInfo = require("../model/educationInfo");
// const workInfo = require("../model/workInfo");
const DocumentInfo = require("../model/documentInfo");
const EducationInfo = require("../model/educationInfo");
const generalInfoId = require("../model/generalInfo");
const profile = require("../model/profile");
const WorkInfo = require("../model/workInfo");

const getProfile = async (req, res) => {

    let existingGetProfile = { generalInfoId, EducationInfo, WorkInfo, DocumentInfo };
    existingGetProfile.generalInfoId = await profile.findOne({ where: { user: req.user.id } }).populate(['generalInfoId', 'educationInfo', 'workInfo', 'documentInfo']);

    if (!existingGetProfile) {
        return res.status(400).json({ response: { success: false, message: "No Profile Found" } })
    }

    return res.status(200).json({ response: { success: true, profile: existingGetProfile } })
}
const getAllProfile = async (req, res) => {
    let existingGetProfile = { generalInfoId, EducationInfo, WorkInfo, DocumentInfo };
    existingGetProfile.generalInfoId = await profile.findOne({ where: { user: req.user.id } })

    if (!existingGetProfile) {
        return res.status(400).json({ response: { success: false, message: "No Profile Found" } })
    }
    let val = await profile.findAll({
        where: { user: req.user.id },attributes:['id'], include: [{
            model: generalInfoId,
            as: 'generalInfo'
        }, {
            model: EducationInfo,
            as: 'educationInfo'
        }, 
        {
            model: WorkInfo,
            as: 'workInfo'
        },
        {
            model: DocumentInfo,
            as: 'documentInfo'
        }
    ]
    })

    if (!val) {
        return res.status(400).json({ response: { success: false, message: "No Profile Found" } })
    }

    return res.status(200).json({ response: { success: true, profile: val } })
}

module.exports = {
    getProfile,
    getAllProfile
}