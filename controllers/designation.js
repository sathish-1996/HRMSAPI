const Designation = require("../model/designation");
const { Op } = require("sequelize");


const createdesignation = async (req, res) => {
  const { designationName, designationCode, department } = req.body;


 

 

  try {
    // let userUid = req.user.id;

    // const userDetails = req.user;
    // const username = userDetails.username.toString();
    // userUid = uuidFromString(username);
    // reqObj.updatedBy = userUid;

    // let desigV = null;
    // console.log(desigV,"newDesignation");
    // desigV = await Designation.findOne({
    //   departmentId: reqObj.department._id,
    //   designationName: reqObj.designationName,
    // });
    // console.log(desigV,"newDesignation");
    // if (desigV) {
    //   responses["Success"] = false;
    //   responses["reason"] = "Designation already Exists";
    //   return responses;
    // } 
    // const design = await Designation.findOne({ designationCode: reqObj.designationCode})

    //   if (design) {
    //     responses["Success"] = false;
    //     responses["reason"] = "Designation code already Exists";
    //     return responses;
    //   } else {
    //     reqObj.status = 1;
    //     reqObj.createdDate = new Date();
    //     reqObj.updatedDate = new Date();


    //   }
    if (designationName === "" || designationName === "undefined") {
      return res.status(400).json({ response: { success: false, message: "Designation name is required" } });
    }
  
    if (designationCode === "" || designationCode === "undefined") {
      return res.status(400).json({ response: { success: false, message: "Designation code is required" } });
    }
    if (department === "" || department === "undefined") {
      return res.status(400).json({ response: { success: false, message: "Designation code is required" } });
    }
    const desName = await Designation.findOne({ where: { designationName: designationName } });
    const desCode = await Designation.findOne({ where: { designationCode: designationCode } });

    if (desName) {
      return res.status(400).json({ success: false, message: "Designation name already exist" });
    }
    if (desCode) {
      return res.status(400).json({ success: false, message: "Designation code already exist" });
    }

    const newDesignation = new Designation({
      designationName: designationName.trim(),
      designationCode: designationCode.trim(),
      department: department
      // user: req.user._id,
      // status: 1, // Assuming this is the default status
    });

    await newDesignation.save();


    responses["Success"] = true;
    return res.status(200).json({ response: { success: true, message: "Designation created successfully", designation: newDesignation } });
  } catch (error) {
    responses["Success"] = false;
    responses["reason"] = "Unable to save designation";
    return res.status(500).json({ response: { success: false, message: "Unable to create designation" } });
  }
};

const getAlldesignation = async (req, res) => {

  let existingDesignation;
  existingDesignation = await Designation.findAll();

  if (existingDesignation.length === 0) {
    return res.status(400).json({ message: "No designations found" });
  }

  return res.status(200).json({ response: { success: true, designation: existingDesignation } });
};

const getDepartmentById = async (req, res) => {
  let depId = req.params.departmentId
  console.log(depId, 'exisoryss')
  let existingDesignation;
  existingDesignation = await Designation.findAll({ where: { department: depId } });
  console.log(existingDesignation, 'exisory')
  if (existingDesignation.length === 0) {
    return res.status(400).json({ message: "No designations found" });
  }

  return res.status(200).json({ response: { success: true, designation: existingDesignation } });
};

// const updatedesignation = async (req, res) => {
//   const map = {};
//   let userUid = req.user.id;

//   try {
//     const userDetails = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//     const username = userDetails.getUsername().toString();
//     userUid = uuidFromString(username);
//     reqObj.setUpdatedBy(userUid);
//   } catch (e) {
//     map["Success"] = false;
//     map["reason"] = "Authentication Failed";
//     return map;
//   }

//   if (
//     reqObj.designationCode != null &&
//     reqObj.designationName != null &&
//     reqObj.designationName.toString().trim().length !== 0 &&
//     reqObj.designationCode.toString().trim().length !== 0
//   ) {
//     // Your code for updating designation here...
//   } else {
//     map["Success"] = false;
//     map["reason"] = "Please Enter Designation Code and Designation Name";
//     return map;
//   }
//   function uuidFromString(str) {
//     // Implement uuidFromString function...
//   }
// };
const updatedesignation = async (req, res) => {
  const { id, designationName, designationCode, department } = req.body;

  // const userUid = uuidv4(req.user.username);
  let existingDesignation



  try {
    if (!designationName || !designationCode) {
      return res.status(400).json({ success: false, message: "Designation name and code are required" });
    }
    existingDesignation = await Designation.findByPk(id);
    if (!existingDesignation) {
      return res.status(404).json({ success: false, message: "Designation not found" });
    }
    if (existingDesignation.designationName === designationName && existingDesignation.designationCode === designationCode) {
      return res.status(404).json({ success: false, message: "Update something" });
    }
  
    const desName = await Designation.findOne({ where: { designationName: designationName, [Op.not]: { id: id } } });
    const desCode = await Designation.findOne({ where: { designationCode: designationCode, [Op.not]: { id: id } } });

    if (desName) {
      return res.status(400).json({ success: false, message: "Designation name already exist!" });
    }
    if (desCode) {
      return res.status(400).json({ success: false, message: "Designation code already exist!" });
    }
  

    // Check for uniqueness of departmentName and departmentCode here
    existingDesignation.designationName = designationName.trim();
    existingDesignation.designationCode = designationCode.trim();
    existingDesignation.department = department.trim();
    // existingDesignation.updatedBy = userUid;
    existingDesignation.updatedDate = new Date();

    const updatedDepartment = await existingDesignation.save();

    return res.status(200).json({ success: true, message: "Department updated successfully", updatedDepartment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
// const deletedesignation = async (req, res) => {
//   let userUid = req.user.id;
//   const { v4: uuidv4 } = require('uuid');
//   const designationRepo = require('./designationRepo');

//   const map = {};
//   const designationId = del.designationId.toString();
//   const userDetails = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//   const username = userDetails.getUsername().toString();
//   userUid = uuidFromString(username);
//   reqObj.setDeletedBy(userUid);

//   if (designationId && designationId.length !== 0) {
//     const uuid = uuidv4();
//     try {
//       await designationRepo.deleteById(uuid);

//       map["Success"] = true;
//     } catch (e) {
//       map["Success"] = false;
//       map["reason"] = "Unable to Remove Designation. May be Designation map to Employee";
//       return res.status(500).json({ success: false, message: "Error while deleting the Designation" });
//     }
//   } else {
//     map["Success"] = false;
//     map["reason"] = "Designation is not Valid";
//   }
//   return res.status(500).json({ success: false, message: "Error while Designation Id is not Valid" });
// };
// Delete a department
const deletedesignation = async (req, res) => {
  const designationIdToDelete = req.params.designationId;

  try {
    const deletedDesignation = await Designation.findByPk(designationIdToDelete);

    if (!deletedDesignation) {
      return res.status(404).json({ success: false, message: "Designation not found" });
    }
    const destroyDesignation = await Designation.destroy({ where: { id: deletedDesignation.id } });

    if (!destroyDesignation) {
      return res.status(404).json({ success: false, message: "Failed to delete the Designation" });
    }
    return res.status(200).json({ success: true, message: "Designation deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to delete designation" });
  }
};
module.exports = {
  createdesignation,
  getAlldesignation,
  getDepartmentById,
  updatedesignation,
  deletedesignation
}