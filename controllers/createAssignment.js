const CreateAssignment = require('../model/createAssignment');


exports.getAllAssigments = async (req, res, next) => {
    let assignments
    try {
        assignments = await CreateAssignment.find()
    } catch (error) {
        return console.log(error)
    }
    if (!assignments) {
        return res.status(404).json({ message: "No Assigments Found" })
    }
    return res.status(200).json({ assignments })
}

exports.CreateAssignment = async (req, res, next) => {
    const {question, option, correctAnswer,_id} = req.body
    
    let existingAssignment;
    try {
        existingAssignment = await CreateAssignment.findOne({question})
       
    } catch (error) {                                                                                                                                                                                                                               
        console.log(error)
    }
    if(existingAssignment){
        return res.status(400).json({sucess:false, message:"Question Already Exist !"})
    }
    const createAssigmnet = new CreateAssignment({
        question,
        option,
        correctAnswer 
    })
    try {
        await createAssigmnet.save()
    } catch (error) {
        console.log(error)
    }
    return res.status(200).json({createAssigmnet})
}