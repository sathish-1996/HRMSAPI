const ITSupport = require("../model/IT-Support")
const { Op } = require("sequelize");


const createITSupport = async (req, res) => {
    const { supportType, supportDesc } = req.body;
    //const userUid = uuidv4//(req.user.username);

    try {


        if (supportType === "" || supportType === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Department name is required" } });
        }

        if (supportDesc === "" || supportDesc === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Department code is required" } });
        }


        const supportName = await ITSupport.findOne({ where: { supportType: supportType } });
        const supportCode = await ITSupport.findOne({ where: { supportDesc: supportDesc } });

        if (supportName) {
            return res.status(400).json({ success: false, message: "Support type already exist" });
        }
        if (supportCode) {
            return res.status(400).json({ success: false, message: "Issue type already exist" });
        }



        const newITSupoort = new ITSupport({
            supportType: supportType.trim(),
            supportDesc: supportDesc.trim(),
            user: req.user.id,
            // status: 1, // Assuming this is the default status
        });

        await newITSupoort.save();

        return res.status(200).json({ success: true, message: "IT Support created successfully", savedITSupport: newITSupoort });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
};

// Get all ITSupport
const getAllITSupport = async (req, res) => {
    let existingItSupport
    try {
        existingItSupport = await ITSupport.findAll();

        if (existingItSupport.length === 0) {
            return res.status(404).json({success:false, message: "No IT Support Found" });
        }

        return res.status(200).json({ success: true, list: existingItSupport });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get all ITSupport

const getSupportTypeById = async (req,res)=>{
    let id = req.params.id;
    let existingItSupport;
    try {
        existingItSupport = await ITSupport.findAll({where:{id:id}})
        if(!existingItSupport){
            return res.status(404).json({success:false, message: "No issue type found" });
        }
        
    } catch (error) {
        
    }

}
// Update a ITSupport
const updateITSupport = async (req, res) => {
    const { id, supportType, supportDesc } = req.body;

    let existingItSupport


    try {
        if (!supportType || !supportDesc) {
            return res.status(400).json({ success: false, message: "Support type and Issue Type are required" });
        }
        existingItSupport = await ITSupport.findByPk(id);
     
        if (!existingItSupport) {
            return res.status(404).json({ success: false, message: "ITSupport not found" });
        }
        if (existingItSupport.supportType === supportType && existingItSupport.supportDesc === supportDesc) {
            return res.status(404).json({ success: false, message: "Update something" });
        }

        const suppType = await ITSupport.findOne({ where: { supportType: supportType, [Op.not]: { id: id } } });
        const suppDes = await ITSupport.findOne({ where: { supportDesc: supportDesc, [Op.not]: { id: id } } });

        if (suppType) {
            return res.status(400).json({ success: false, message: "Support type already exist" });
        }
        if (suppDes) {
            return res.status(400).json({ success: false, message: "Issue type already exist" });
        }




        // Check for uniqueness of departmentName and departmentCode here
        existingItSupport.supportType = supportType.trim();
        existingItSupport.supportDesc = supportDesc.trim();
        // existingDepartment.updatedBy = userUid;
        existingItSupport.updatedDate = new Date();

        const updatedITSupport = await existingItSupport.save();

        return res.status(200).json({ success: true, message: "IT Support updated successfully", updatedITSupport });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Unable to update IT Support" });
    }
};

// Delete a ITSupport
const deleteITSupport = async (req, res) => {
    const itSupportIdToDelete = req.params.id;
   

    try {
        const deletedITSupport = await ITSupport.findByPk(itSupportIdToDelete);
       
        //console.log(deletedDepartment, "delete")
        if (!deletedITSupport) {
            return res.status(404).json({ success: false, message: "IT Support not found" });
        }
        const destroyITSupport = await ITSupport.destroy({ where: { id: deletedITSupport.id } });
        if (!destroyITSupport) {
            return res.status(404).json({ success: false, message: "Failed to delete the IT Support" });
        }
        return res.status(200).json({ success: true, message: " IT Support deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Unable to delete  IT Support" });
    }
};

module.exports = {
    createITSupport,
    getAllITSupport,
    updateITSupport,
    deleteITSupport,
    getSupportTypeById
}