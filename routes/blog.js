const express = require('express');
const passport = require('passport');
const NeedAuth = passport.authenticate("jwt", { session: false })
const blogControllers = require('../controllers/blog');
const blogRouter = express.Router();







blogRouter.get("/", NeedAuth,blogControllers.getAllBlogs)
blogRouter.post("/add",blogControllers.addBlogs)
blogRouter.put("/update/:id",blogControllers.updateBlogs)
blogRouter.get("/:id",blogControllers.getById)
blogRouter.delete("/delete/:id",blogControllers.deleteBlog)
blogRouter.get("/user/:id",blogControllers.getByUserId)

module.exports = blogRouter;