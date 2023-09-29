const educationInfo = require("../model/educationInfo");
//const Profile = require("../model/profile");
const createEducationInfo = async (req, res) => {
    const { schoolInfo, highSchoolInfo, dipInfo, ugInfo, pgInfo, masterInfo, empid } = req.body
    
    const map = {};
    try {
        const userDetails = req.user._id; 
        const username = userDetails.username.toString();
        userUid = UUID.fromString(username);
      } catch (e) {
        map['Sucess'] = false;
        map['reason'] = 'Authorization Failed, Please Login';
        return map;
      }
      
      try {
        for (const emp of reqObj) {
          if (emp.id) {
            if (emp.courseDepartment.includes('-')) {
              const qualification = emp.courseDepartment.split('-');
              emp.qualification = qualification[0].trim();
              emp.specialization = qualification[1].trim();
            } else {
              emp.qualification = emp.courseDepartment;
            }
      
            empEducationDetailsRepository.updateEmpEducationDet(
              emp.qualification,
              emp.university,
              emp.yearPassing,
              emp.specialization,
              emp.percentage,
              emp.instituteName,
              userUid,
              emp.id
            );
          } else {
            if (emp.instituteName && emp.instituteName.length) {
              const empExists = empEducationDetailsRepository.getByEmpid_IdAndType(emp.empid.id, emp.type);
      
              if (empExists) {
                if (emp.courseDepartment.includes('-')) {
                  const qualification = emp.courseDepartment.split('-');
                  emp.qualification = qualification[0].trim();
                  emp.specialization = qualification[1].trim();
                } else {
                  emp.qualification = emp.courseDepartment;
                }
      
                emp.updatedDate = new Date();
                emp.updatedBy = userUid;
                empEducationDetailsRepository.updateEmpEducationDet(
                  emp.qualification,
                  emp.university,
                  emp.yearPassing,
                  emp.specialization,
                  emp.percentage,
                  emp.instituteName,
                  userUid,
                  emp.id
                );
              } else {
                if (emp.courseDepartment.includes('-')) {
                  const qualification = emp.courseDepartment.split('-');
                  emp.qualification = qualification[0].trim();
                  emp.specialization = qualification[1].trim();
                } else {
                  emp.qualification = emp.courseDepartment;
                }
      
                emp.updatedBy = emp.createdBy;
                emp.status = 1;
                emp.createdDate = new Date();
                emp.updatedDate = new Date();
                emp.createdBy = userUid;
                emp.updatedBy = userUid;
                empEducationDetailsRepository.save(emp);
              }
            }
          }
        }
         existingEducationInfo;
    const educationInfo = new educationInfo({ empid: empid, schoolInfo, highSchoolInfo, dipInfo, ugInfo, pgInfo, masterInfo, user: req.user._id });

    let savedEducationInfo = await educationInfo .save()
    // await Profile.updateOne({"generalInfo":req.body.empid},{"$set": {"educationInfo":savedEducationInfo.id}});
       
        map['Sucess'] = true;
        map['reason'] = 'Education info was successfully saved';
        return res.status(200).json({ response: { success: true, message: "EducationInfo created  successfully", educationInfo: savedEducationInfo } })
      } catch (e) {
        map['Sucess'] = false;
        map['reason'] = 'Unable to Save';
        return res.status(400).json({ response: { success: false, message: "EducationInfo  doesn\'t created. Try again!" } })
      }
    //if (!savedEducationInfo) {
      //  return res.status(400).json({ response: { success: false, message: "EducationInfo  doesn\'t created. Try again!" } })
  //  }
    
//    await Profile.updateOne({"generalInfo":req.body.empid},{"$set": {"educationInfo":savedEducationInfo._id}});
//     //  Profile.findOne({generalInfo:req.body.empid});
 
  }

  

const getAllEducationInfo = async (req, res) => {
  let existingEducationInfo;
  existingEducationInfo = await educationInfo.findAll()
  if (!existingEducationInfo) {
    return res.status(400).json({ response: { success: false, message: "No educationinfo found" } })
  }
  return res.status(200).json({ response: { success: true, educationInfo: existingEducationInfo } })
}

const getById = async(req,res) =>{
  let existingEducationInfo;
  const id = req.params.id || req.body.id;
  existingEducationInfo = await educationInfo.findByPk(id)
  if (!existingEducationInfo) {
    return res.status(400).json({ response: { success: false, message: "No educationinfo found" } })
  }
  return res.status(200).json({ response: { success: true, educationInfo: existingEducationInfo } })
}

const updateEducationInfo = async(req,res) => {
  try {
    
    const { educationId, updatedFields } = req.body;

    const updatedEducationInfo = await educationInfo.findOneAndUpdate(
        { _id: educationId },
        { $set: updatedFields },
        { new: true }
    );

    if (!updatedEducationInfo) {
        return res.status(404).json({ response: { success: false, message: "EducationInfo not found" } });
    }

    return res.status(200).json({ response: { success: true, message: "EducationInfo updated successfully", educationInfo: updatedEducationInfo } });
} catch (error) {
    return res.status(500).json({ response: { success: false, message: "Error updating education info" } });
}
}


module.exports = {
  createEducationInfo,
  getAllEducationInfo,
  updateEducationInfo,
  getById
}