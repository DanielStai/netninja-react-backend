const asyncHandler = require('express-async-handler')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')


// @desc Get all blogs
// @route /api/blogs/
// @access public
const getBlogs = asyncHandler(async(req, res) => {
    const blogs = await Blog.find({user:req.user.id})
    res.json(blogs)
})


// @desc Get single blog
// @route /api/blogs/{id}
// @access public
const getBlog = asyncHandler(async(req, res) => {

    const blog = await Blog.findById(req.params.id)

    if(!blog){
        res.status(400)
        throw new Error('Blog not found')
    }

    res.json(blog)

})


// @desc Post a blog
// @route /api/blogs/{id}
// @access public
const postBlog = asyncHandler(async(req, res) => {

    if (!req.body.title || !req.body.body || !req.body.author){
        res.status(400)
        throw new Error ('Please fill all the required fields')

    } else{
        const blog = await Blog.create({
            title: req.body.title,
            body: req.body.body,
            author: req.body.author,
            user: req.user.id
        })

        res.status(200).json(blog)
    }
})


// @desc Delete a blog
// @route /api/blogs/{id}
// @access public
const deleteBlog = asyncHandler(async(req, res) => {

    const blog = await Blog.findById(req.params.id)
    if(!blog){
        res.status(400)
        throw new Error('Blog not found')
    }

    //get logged in user
    const user = await User.findById(req.user.id)

    //check if such a user exists
    if(!user){
        res.status(401)
        throw new Error ('User not found')
    }

    //comparing logged in user and user blog owner
    if(blog.user.toString() !== user.id){
        res.status(401)
        throw new Error ('This user is not authorized')
    }

    await blog.remove()

    res.status(200).json({message:"blog deleted"})
})


module.exports = {
    getBlogs,
    getBlog,
    postBlog,
    deleteBlog
}