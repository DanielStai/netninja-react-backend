let blogs = [
    {
      title: "My Blog",
      body: "Lorem ipsum",
      author: "mario",
      id: "1"
    },
    {
      title: "Stai",
      body: "Fgf",
      author: "mario",
      id: "2"
    }
  ]


const getBlogs = (req, res) => {
    res.json(blogs)
}

const getBlog = (req, res) => {
    const id = req.params.id 

    for (let blog of blogs){
        if (blog.id===id){
            res.json(blog)
            return
        }
    }
}

const postBlog = (req, res) => {
    const blog = req.body
    blogs.push(blog)

    res.send('New post has been added')

}

const deleteBlog = (req, res) => {
    const id = req.params.id

    blogs = blogs.filter(i => {
        if (i.id !== id){
            return true
        }
        return false
    })

    res.send('Blog has been deleted')
}

module.exports = {
    getBlogs,
    getBlog,
    postBlog,
    deleteBlog
}