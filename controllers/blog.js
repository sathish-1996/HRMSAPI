const Blog = require("../model/blog.js");
const User = require("../model/user.js");
const Sequelize = require('../util/database');


const getAllBlogs = async (req, res, next) => {

    const user = req.user;

    try {
        const blogs = await Blog.findAll({
      where: {
        userId: user.id, 
      },
      attributes: [
        ['id', 'topic'],
        'title',
      ],
    });

    if (blogs.length === 0) {
      return res.status(404).json({ message: 'No Blogs Found' });
    }

    return res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
const addBlogs = async (req, res, next) => {
    const { title, description, image, user } = req.body
    let existingUser;
    try {
        existingUser = await User.findByPk(user)
    } catch (error) {
        console.log(error)
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable To Find The User By Id" })
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
        const Session = await mongoose.startSession();
        Session.startTransaction();
        await blog.save({ Session });
        existingUser.blogs.push(blog);
        await existingUser.save({ Session });
        await Session.commitTransaction()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
    return res.status(200).json({ blog })
}
const updateBlogs = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;

    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        });
    } catch (error) {
        return console.log(error)
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable To Update The Blog" })
    }
    return res.status(200).json({ blog })
}
const getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id)
    } catch (error) {
        return console.log(error)
    }
    if (!blog) {
        return res.status(404).json({ message: "No Blog Found" })
    }
    return res.status(200).json({ blog })
}
const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
        console.log(userBlogs, "pop")
    } catch (error) {
        return console.log(error);
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ blog: userBlogs })
}
const deleteBlog = async (req, res, next) => {
    const id = req.params.id;

    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate('user');

        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Delete" });
}

module.exports = {
    getAllBlogs,
    addBlogs,
    updateBlogs,
    getById,
    getByUserId,
    deleteBlog
}