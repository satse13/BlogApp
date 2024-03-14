const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const {userExtractor} = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user',{username:1,name:1})
	response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {

	const blog = await Blog.findById(request.params.id)
	blog
		? response.json(blog)
		: response.status(404).end()
})

blogRouter.post('/', userExtractor,async (request, response) => {
	const {title,url,author,likes} = request.body
	
	const user = request.user

	if(!title || !url)
		return response.status(400).json({error: 'Missings fields in blog'})
	
	const blog = new Blog({
		title: title,
		author: author,
		url: url,
		likes: likes? likes : 0,
		user: user.id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)

})

blogRouter.delete('/:id', userExtractor,async (request, response) => {

	const blogID = request.params.id
	const user = request.user
	const blog = await Blog.findById(blogID)

	if(user.id != blog.user.toString())
		return response.status(401).json({error: 'invalid user'})

	user.blogs.splice(user.blogs.findIndex(blog => blog._id.toString() === blogID), 1)

	await Blog.findByIdAndRemove(blogID)

	response.status(204).end()

})

blogRouter.put('/:id', async (request, response ) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const updatedBlog = await	Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.status(200).json(updatedBlog)

})

module.exports = blogRouter
