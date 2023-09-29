const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../model/user.js");
const generalInfo = require("../model/generalInfo.js");
const { Op } = require("sequelize");
const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await user.find()
    if (!users) {
      return res.status(400).json({ message: "No Users Found" })
    }
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const signup = async (req, res) => {

  const { name, userName, password } = req.body;
  let existingUser;
  try {
    existingUser = await user.findOne({ userName })
  } catch (error) {
    return console.log(error)
  }
  if (existingUser) {
    return res.status(400).json({ response: { success: false, message: "User Already  Exists ! Login Instead" } })
  }
  const hashedPassword = bcrypt.hashSync(password)

  const user = new User({
    name,
    userName,
    password: hashedPassword,
    blogs: []
  })

  try {
    await user.save()
    let token = jwt.sign(user.toJSON(), process.env.JWTPRIVATEKEY, {
      expiresIn: 604800 //1 WEEK
    });
    return res.status(201).json({ response: { success: true, user, token: token, } });
  } catch (error) {
    return console.log(error)
  }

}

const login = async (req, res, next) => {
  const { userName, password } = req.body
 
  const generateAuthToken = (val) => {
    
    const token = jwt.sign({ id: val.id }, process.env.JWTPRIVATEKEY, { expiresIn: 100000 });
  
    return token;
  };
  const hashedPassword = bcrypt.hashSync(password)
 
  try {
    // check if the user exists
    const user = await generalInfo.findOne({ where: {userName: userName } });
    console.log(user, "sdlmld mndns")
  
    if (!user) return res.status(400).json({ msg: "User not exist" })
    bcrypt.compare(password, user.password, (err, data) => {
      //if error than throw error
      if (err) throw err
      //if both match than you can do anything
      if (data) {
        return res.status(200).json({ response: { success: true, msg: "Login success", token: generateAuthToken(user) } })
      } else {
        return res.status(401).json({ msg: "Invalid credential" })
      }

    })
  } catch (error) {
    return res.status(400).json({ error });
  }

}

module.exports = {
  getAllUser,
  signup,
  login
}