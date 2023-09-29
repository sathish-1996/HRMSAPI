
const role = require("../model/role");
const { Op } = require("sequelize");
const createRole = async (req, res) => {
  const { roleName, roleCode } = req.body;
  let existingRole


  try {

    if (roleName === "" || roleName === "undefined") {
      return res.status(400).json({ response: { success: false, message: "Role name is required" } });
    }

    if (roleCode === "" || roleCode === "undefined") {
      return res.status(400).json({ response: { success: false, message: "Role code is required" } });
    }

    const rolName = await role.findOne({ where: { roleName: roleName } });
    const rolCode = await role.findOne({ where: { roleCode: roleCode } });

    if (rolName) {
      return res.status(400).json({ success: false, message: "Role name already exist" });
    }
    if (rolCode) {
      return res.status(400).json({ success: false, message: "Role code already exist" });
    }
    // Check if a role with the same roleName already exists


    // Assuming you have a "Role" model and the necessary schema defined
    const newRole = new role({
      roleName: roleName,
      roleCode: roleCode,
      // You can set other properties here if needed
    });

    // Save the new role
    await newRole.save();

    return res.status(201).json({ success: true, message: "Role created successfully", role: newRole });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to create role" });
  }
};


const getAllRole = async (req, res, next) => {

  let existingRole;
  existingRole = await role.findAll()
  if (!existingRole) {
    return res.status(400).json({ message: "No roles Found" })
  }
  return res.status(200).json({ response: { success: true, role: existingRole } });
}


// const updateRole = async (req, res) => {
//     const map = {};
//     let userUid = req.user.id;

//     try {
//         const userDetails = req.user; 
//         const username = userDetails.username.toString();
//         userUid = uuidFromString(username); 
//         reqObj.updatedBy = userUid;
//     } catch (error) {
//         map["Success"] = false;
//         map["reason"] = "Authentication Failed";
//         return res.status(401).json(map);
//     }

//     if (
//         reqObj.roleName != null &&
//         reqObj.roleName.trim().length !== 0 &&
//         reqObj.roleCode != null &&
//         reqObj.roleCode.trim().length !== 0
//     ) {
//         const rolesCheck = await roleRepo.findByRoleCodeAndRoleNameAndId(
//             reqObj.roleCode.trim(),
//             reqObj.roleName.trim(),
//             reqObj.id
//         );

//         if (rolesCheck != null) {
//             map["Success"] = false;
//             map["reason"] = "No updation found";
//             return res.status(400).json(map);
//         } else {
//             const roles = await roleRepo.findByRoleNameIgnoreCaseAndIdNot(reqObj.roleName, reqObj.id);

//             if (roles != null) {
//                 map["Success"] = false;
//                 map["reason"] = "Role already exists";
//                 return res.status(400).json(map);
//             } else {
//                 let updateStatus = 0;

//                 try {
//                     updateStatus = await roleRepo.updateRoles(
//                         reqObj.id,
//                         reqObj.roleName.trim(),
//                         reqObj.roleCode.trim(),
//                         userUid,
//                         new Date()
//                     );
//                 } catch (e) {
//                     map["Success"] = false;
//                     map["reason"] = "Unable to Update Check the fields";
//                     return res.status(500).json(map);
//                 }

//                 if (updateStatus > 0) {
//                     map["Success"] = true;
//                     return res.status(200).json(map);
//                 } else {
//                     map["Success"] = false;
//                     map["reason"] = "Unable to Update Check the fields";
//                     return res.status(500).json(map);
//                 }
//             }
//         }
//     } else {
//         map["Success"] = false;
//         map["reason"] = "Please Enter all the fields";
//         return res.status(400).json(map);
//     }
// };

// function uuidFromString(str) {

// }

// const deleteRole = async (req, res) => {
//     console.log(req.user);
//     let userUid = req.user.id;

//     const userDetails = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//     const username = userDetails.getUsername().toString();
//     userUid = uuidFromString(username);
//     reqObj.setDeletedBy(userUid);

//     const map = {};
//     const roleId = del.roleId.toString();

//     if (roleId && roleId.length !== 0) {
//       const uuid = uuidv4();
//       try {
//         await roleRepo.deleteById(uuid);
//         map["Success"] = true;
//       } catch (e) {
//         map["Success"] = false;
//         map["reason"] = "Unable to remove the role name that may have been mapped to an Employee";
//         return res.status(500).json({ success: false, message: "Error while deleting the Role" });
//       }
//     } else {
//       map["Success"] = false;
//       map["reason"] = "Role Id is not Valid";
//       return res.status(500).json({ success: false, message: "Error: Role Id is not Valid" });
//     }
//   };
// Update a department
const updateRole = async (req, res) => {
  const { id, roleName, roleCode } = req.body;
  // const userUid = uuidv4(req.user.username);
  let existingRole


  try {
    if (!roleName || !roleCode) {
      return res.status(400).json({ success: false, message: "Role name and code are required" });
    }

    existingRole = await role.findByPk(id);
    if (!existingRole) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }
    if (existingRole.roleName === roleName && existingRole.roleCode === roleCode) {
      return res.status(404).json({ success: false, message: "Update something" });
    }

    const rolName = await role.findOne({ where: { roleName: roleName, [Op.not]: { id: id } } });
    const rolCode = await role.findOne({ where: { roleCode: roleCode, [Op.not]: { id: id } } });

    if (rolName) {
      return res.status(400).json({ success: false, message: "Role name already exist" });
    }
    if (rolCode) {
      return res.status(400).json({ success: false, message: "Role code already exist" });
    }






    // Check for uniqueness of roleName and roleCode here
    existingRole.roleName = roleName.trim();
    existingRole.roleCode = roleCode.trim();
    // existingRole.updatedBy = userUid;
    existingRole.updatedDate = new Date();

    const updatedRole = await existingRole.save();

    return res.status(200).json({ success: true, message: "Role updated successfully", updatedRole });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

// Delete a department
const deleteRole = async (req, res) => {
  const roleIdToDelete = req.params.roleId;

  try {
    const deletedRole = await role.findByPk(roleIdToDelete);
    console.log(deletedRole, "delete")
    if (!deletedRole) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }
    const destroyDeportment = await role.destroy({ where: { id: deletedRole.id } });
    if (!destroyDeportment) {
      return res.status(404).json({ success: false, message: "Failed to delete the role" });
    }
    return res.status(200).json({ success: true, message: "Role deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to delete role" });
  }
};
module.exports = {
  createRole,
  getAllRole,
  updateRole,
  deleteRole
}