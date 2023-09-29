const Department = require("../model/department")
const { Op } = require("sequelize");


const createDepartment = async (req, res) => {
  const { departmentName, departmentCode } = req.body;
  //const userUid = uuidv4//(req.user.username);

 
  try {

  
    if (departmentName === "" || departmentName === "undefined") {
      return res.status(400).json({ response: { success: false, message: "Department name is required" } });
    }
  
    if (departmentCode === "" || departmentCode === "undefined") {
      return res.status(400).json({ response: { success: false, message: "Department code is required" } });
    }
   
  
    const depName = await Department.findOne({ where: { departmentName: departmentName } });
    const depCode = await Department.findOne({ where: { departmentCode: departmentCode } });

    if (depName) {
      return res.status(400).json({ success: false, message: "Department name already exist" });
    }
    if (depCode) {
      return res.status(400).json({ success: false, message: "Department code already exist" });
    }


   
    const newDepartment = new Department({
      departmentName: departmentName.trim(),
      departmentCode: departmentCode.trim(),
      // user: req.user._id,
      // status: 1, // Assuming this is the default status
    });

    await newDepartment.save();

    return res.status(200).json({ success: true, message: "Department created successfully", savedDepartment: newDepartment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

// Get all departments
const getAllDepartment = async (req, res) => {
  try {
    const departments = await Department.findAll();

    if (departments.length === 0) {
      return res.status(404).json({ message: "No Departments Found" });
    }

    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a department
const updateDepartment = async (req, res) => {
  const { id, departmentName, departmentCode } = req.body;

  let existingDepartment


  try {
    if (!departmentName || !departmentCode) {
      return res.status(400).json({ success: false, message: "Department name and code are required" });
    }
    existingDepartment = await Department.findByPk(id);
    if (!existingDepartment) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }
    if (existingDepartment.departmentName === departmentName && existingDepartment.departmentCode === departmentCode) {
      return res.status(404).json({ success: false, message: "Update something" });
    }

    const depName = await Department.findOne({ where: { departmentName: departmentName, [Op.not]: { id: id } } });
    const depCode = await Department.findOne({ where: { departmentCode: departmentCode, [Op.not]: { id: id } } });

    if (depName) {
      return res.status(400).json({ success: false, message: "Department name already exist" });
    }
    if (depCode) {
      return res.status(400).json({ success: false, message: "Department code already exist" });
    }




    // Check for uniqueness of departmentName and departmentCode here
    existingDepartment.departmentName = departmentName.trim();
    existingDepartment.departmentCode = departmentCode.trim();
    // existingDepartment.updatedBy = userUid;
    existingDepartment.updatedDate = new Date();

    const updatedDepartment = await existingDepartment.save();

    return res.status(200).json({ success: true, message: "Department updated successfully", updatedDepartment });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to update department" });
  }
};

// Delete a department
const deleteDepartment = async (req, res) => {
  const departmentIdToDelete = req.params.departmentId;

  try {
    const deletedDepartment = await Department.findByPk(departmentIdToDelete);
    //console.log(deletedDepartment, "delete")
    if (!deletedDepartment) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }
    const destroyDeportment = await Department.destroy({ where: { id: deletedDepartment.id } });
    if (!destroyDeportment) {
      return res.status(404).json({ success: false, message: "Failed to delete the department" });
    }
    // const rowsDeleted = await Department.destroy({ where: { id: deletedDepartment.id } });

    // if (rowsDeleted === 0) {
    //   return res.status(404).json({ success: false, message: "Failed to delete the department" });
    // }
    return res.status(200).json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to delete department" });
  }
};

module.exports = {
  createDepartment,
  getAllDepartment,
  updateDepartment,
  deleteDepartment
}