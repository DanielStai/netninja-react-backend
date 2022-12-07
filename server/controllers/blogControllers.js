const asyncHandler = require('express-async-handler')
const Blog = require('../models/blogModel')


// @desc Get all blogs
// @route /api/blogs/
// @access public
const getBlogs = asyncHandler(async(req, res) => {
    const blogs = await Blog.find()
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
            author: req.body.author
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

    await blog.remove()

    res.status(200).json({message:"blog deleted"})
})


module.exports = {
    getBlogs,
    getBlog,
    postBlog,
    deleteBlog
}