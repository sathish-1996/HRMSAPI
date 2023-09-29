const generalInfo = require("../model/generalInfo");
const uuidV1 = require('uuid');
const bcrypt = require("bcryptjs");
const GeneralInfo = require("../model/generalInfo");
//const Profile = require("../model/profile");

const createGeneralInfo = async (req, res) => {
    const { personalInfo, empfamily } = req.body;
    let emailid, phoneno;
let exisitingGeneralInfo;
// console.log(req.user.id,"sghd  bcjbjcbjs jsjbjsb")
const map = {};
     let  val =uuidV1 ;
    try {
         val = await uuidV1.v1();
       
        if (personalInfo.fname === "" || personalInfo.fname === "undefined") {
           
            return res.status(400).json({ response: { success: false, message: "First name is  required" } })
        }
       
        if (personalInfo.lname === "" || personalInfo.lname === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Last name is  required" } })
        }
       
        if (personalInfo.dob === "" || personalInfo.dob === "undefined") {
            return res.status(400).json({ response: { success: false, message: "DOB is  required" } })
        }

        if (personalInfo.emailid === "" || personalInfo.emailid === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Email Id is  required" } })
        }
        if (personalInfo.emailid.length < 6 && personalInfo.emailid.length > 150){ 
            return res.status(400).json({ response: { success: false, message: " Email Id is  required && Email Id should be between 6 and 150 characters && Email Id Already Exists" } });
        }
        if (personalInfo.phoneno === "" || personalInfo.phoneno === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Phone Number is  required" } })
        }
        if (personalInfo.phoneno.length < 10) {
            return res.status(400).json({ response: { success: false, message: "Phone Number is 10 digit  required" } })
        }
             existingemailid = await GeneralInfo.findAll({ where: { emailid: personalInfo.emailid } });
            if (existingemailid.length !== 0) {
              return res.status(400).json({ success: false, message: "Email Id Already Exists" });
          }
          existingphoneno = await GeneralInfo.findAll({ where: { phoneno: personalInfo.phoneno} });
            if (existingphoneno.length !== 0) {
              return res.status(400).json({ success: false, message: "Phone Number Already Exists" });
          }
          emailid = personalInfo.emailid;
          phoneno = personalInfo.phoneno;
        if (personalInfo.gender === "" || personalInfo.gender === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Gender is  required" } })
        }
        if (personalInfo.bloodgroup === "" || personalInfo.bloodgroup === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Blood Group is  required" } })
        }
        if (personalInfo.maritalStatus === "" || personalInfo.maritalStatus === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Marital Status is  required" } })
        }
        if (personalInfo.address1 === "" || personalInfo.address1 === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Address 1 is  required" } })
        }
        if (personalInfo.address2 === "" || personalInfo.address2 === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Address 2 is  required" } })
        }
        if (personalInfo.country === "" || personalInfo.country === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Country is  required" } })
        }
        if (personalInfo.state === "" || personalInfo.state === "undefined") {
            return res.status(400).json({ response: { success: false, message: "State is  required" } })
        }
        if (personalInfo.city === "" || personalInfo.city === "undefined") {
            return res.status(400).json({ response: { success: false, message: "City is  required" } })
        }
        if (personalInfo.postalcode === "" || personalInfo.postalcode === "undefined") {
            return res.status(400).json({ response: { success: false, message: "Postal Code is  required" } })
        }
        if (!(empfamily.length > 0)) {
            map.Success = false;
            map.Reason = 'Unable to create Employee Basic Information';
        }
        empfamily.forEach(element => {

            if (element.name === "" || element.name === "undefined") {
                map.Success = false;
                map.Reason = "Name is  required";
            }
            else if (!(element.name.length > 3)) {
                map.Success = false;
                map.Reason = 'Name minimum 3 character required';
            }
            
            if (element.relation === "" || element.relation === "undefined") {
                map.Success = false;
                map.Reason = "Relation is  required";
            }
            else if (!(element.relation.length > 3)) {
                map.Success = false;
                map.Reason = 'Relation name minimum 3 character required';
            }
            if (element.occupation === "" || element.occupation === "undefined") {
                map.Success = false;
                map.Reason = "Occupation is  required";
            }
            else if (!(element.occupation.length > 3)) {
                map.Success = false;
                map.Reason = 'Occupation minimum 3 character required';
            }

            if (!(element.aadhaarNumber.length !== 12)) {
                map.Success = false;
                map.Reason = 'Adhar Number minimum 12 character required';
            }
            if (element.emargencyContact === "" || element.emargencyContact === "undefined") {
                map.success = false;
                map.Reason = "EmergencyConatct is  required";
            }
            else if (!(element.emargencyContact.length !== 10)) {
                map.Success = false;
                map.Reason = 'Please enter 10 digit mobile number';
            }
           
        })


        let userName = personalInfo.fname + '@codiis.com'
        let password = personalInfo.fname.substr(0, 3) + '@123'

        const hashedPassword = bcrypt.hashSync(password)
        
        if (map.Success === false) {
            return res.status(400).json({ response: { success: false, message: map.Reason } })
        }
        const gnrlInfo = new generalInfo({ 
            personalInfo, 
            empfamily, 
            userName,
            emailid,
            phoneno,
            password: hashedPassword
        });
        let savedGeneralInfo = await gnrlInfo.save();
      
        if (!savedGeneralInfo) {
            return res.status(400).json({ response: { success: false, message: "GeneralInfo  doesn\'t created. Try again!" } })
        }
         //createEmpProfile = await Profile.create({ generalInfo: savedGeneralInfo._id, user: req.user._id });
        return res.status(200).json({ response: { success: true, message: "GeneralInfo created  successfully", generalInfo: savedGeneralInfo } })
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }

}


const getAllGeneralInfo = async (req, res, next) => {
    console.log(req.user);
    let exisitingGeneralInfo;
    exisitingGeneralInfo = await generalInfo.findAll()
    if (!exisitingGeneralInfo) {
        return res.status(400).json({ message: "No General Info Found" })
    }
    return res.status(200).json({ response: { success: true, generalInfo: exisitingGeneralInfo } });
}

const getById = async(req,res) =>{
    let exisitingGeneralInfo;
    const id = req.params.id || req.body.id;
    exisitingGeneralInfo = await generalInfo.findByPk(id);
    if (!exisitingGeneralInfo) {
        return res.status(400).json({ message: "No General Info Found" })
    }
    return res.status(200).json({ response: { success: true, generalInfo: exisitingGeneralInfo } });
}

const updateGeneralInfo = async (req, res) =>{
   
    const {id, personalInfo, empfamily } = req.body;
    // existingGeneralInfo.personalInfo = personalInfo;
    // existingGeneralInfo.empfamily = empfamily;
    let existingGeneralInfo ;

    try {
        existingGeneralInfo = await generalInfo.findByPk(id)
        if (!existingGeneralInfo) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
      
        if (!personalInfo || !empfamily  ) {
            return res.status(400).json({ success: false, message: "PersonalInfo and empfamily are required" });
        }
        if (!existingGeneralInfo) {
            return res.status(404).json({ success: false, message: "GeneralInfo not found" });
          }
      
          if (personalInfo.emailid) {
            existingGeneralInfo.personalInfo.emailid = personalInfo.emailid;
          }
      
          if (personalInfo.phoneno) {
            existingGeneralInfo.personalInfo.phoneno = personalInfo.phoneno;
          }

        if(personalInfo.emailid){
            const existingemailid = await GeneralInfo.findAll({ where: { emailid: personalInfo.emailid } });
            if (existingemailid.length !== 0) {
              return res.status(400).json({ success: false, message: "Email Id Already Exists && update something" });
            }
            existingGeneralInfo.emailid = personalInfo.emailid;
            existingGeneralInfo.personalInfo.emailid = personalInfo.emailid;
        }

        if(personalInfo.phoneno){
            const existingphoneno = await GeneralInfo.findAll({ where: { phoneno: personalInfo.phoneno }});
            if (existingphoneno.length !==0) {
              return res.status(400).json({ success: false, message: "Phone number Already Exists && update something" });
            }
            existingGeneralInfo.phoneno = personalInfo.phoneno;
            existingGeneralInfo.personalInfo.phoneno = personalInfo.phoneno;
        }

        
        if (personalInfo) {
            existingGeneralInfo.personalInfo = personalInfo;
        }

        if (empfamily) {
            existingGeneralInfo.empfamily = empfamily;
        }
        // if (personalInfo) {
        //     // Update individual properties
        //     if (personalInfo.fname) {
        //         existingGeneralInfo.personalInfo.fname = personalInfo.fname;
        //     }
        //     if (existingGeneralInfo.personalInfo.fname.length === 0) {
        //         return res.status(400).json({ success: false, message: "update something" });
        //     }
    
        //     if (personalInfo.lname) {
        //         existingGeneralInfo.personalInfo.lname = personalInfo.lname;
        //     }
        //     if (personalInfo.dob) {
        //         existingGeneralInfo.personalInfo.dob = personalInfo.dob;
        //     }
        //     if (personalInfo.gender) {
        //         existingGeneralInfo.personalInfo.gender = personalInfo.gender;
        //     }
        //     if (personalInfo.bloodgroup) {
        //         existingGeneralInfo.personalInfo.bloodgroup = personalInfo.bloodgroup;
        //     }
        //     if (personalInfo.maritalStatus) {
        //         existingGeneralInfo.personalInfo.maritalStatus = personalInfo.maritalStatus;
        //     }
        //     if (personalInfo.address1) {
        //         existingGeneralInfo.personalInfo.address1 = personalInfo.address1;
        //     }
        //     if (personalInfo.address2) {
        //         existingGeneralInfo.personalInfo.address1 = personalInfo.address2;
        //     }
        //     if (personalInfo.country) {
        //         existingGeneralInfo.personalInfo.country = personalInfo.country;
        //     }
        //     if (personalInfo.state) {
        //         existingGeneralInfo.personalInfo.state = personalInfo.state;
        //     }
        //     if (personalInfo.city) {
        //         existingGeneralInfo.personalInfo.city = personalInfo.city;
        //     }
        //     if (personalInfo.postalcode) {
        //         existingGeneralInfo.personalInfo.postalcode = personalInfo.postalcode;
        //     }
           
        // }
        // if (empfamily) {
            
        //     existingGeneralInfo.empfamily = empfamily;
        // }
        // // Check if any changes were made
        // const changesMade = existingGeneralInfo.changed();
        // if (changesMade.length === 0) {
        //     return res.status(400).json({ success: false, message: "update something" });
        // }
        const updatedGeneralInfo = await existingGeneralInfo.save();

        return res.status(200).json({ success: true, message: 'General information updated successfully', updatedGeneralInfo });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to update general information' });

    }
}
module.exports = {
    createGeneralInfo,
    getAllGeneralInfo,
    updateGeneralInfo,
    getById
}