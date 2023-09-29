const uploadDocument = require("../model/form-16.js");
const { Op } = require("sequelize");
const multer = require("multer")
const storage = multer.memoryStorage();
const { v4: uuidv4 } = require('uuid');
const DocumentUpload = require("../model/form-16.js");

const createUplaodDocument = async (req, res) => {
    let file = req.file
    let existionDocument
    try {
        global.__dirname = __dirname
        let body = req.body;
        let destination = "uploads/"+body.newPath;
        console.log(destination, "destination")
        existionDocument =  await DocumentUpload.findOne({where:{name: file.originalname}})
        if(existionDocument){
          return res.status(400).json({ success: false, message: "Document already exist" });
        }
        let uploadDoc = await DocumentUpload.create({
            uuid: String(destination).split("-large")[0],
            path: destination,
            name: file.originalname,
            user:req.user.id
        })
        return res.status(200).json({ success: true, message: "Document  uploaded successfully", savedDocument: uploadDoc })
    } catch (error) {

        return res.status(500).json({ message: error })
    }




}

const getAllUplaodDocument = async (req, res) => {
    try {
        const documentUplaod = await DocumentUpload.findAll();
    
        if (documentUplaod.length === 0) {
          return res.status(404).json({ message: "No Documents Found" });
        }
    
        return res.status(200).json({ success: true, documentUplaod });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

module.exports = { createUplaodDocument, getAllUplaodDocument }