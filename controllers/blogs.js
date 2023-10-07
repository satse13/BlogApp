const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

blogRouter.post('/', async (request, response) => {
	const {title,url,author,likes} = request.body

	const {id} = await User.findOne({})
	if(!title || !url)
		return response.status(400).json({error: 'Missings fields in blog'})
	
	const blog = new Blog({
		title: title,
		author: author,
		url: url,
		likes: likes? likes : 0,
		user: id
	})

	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)

})

blogRouter.delete('/:id', async (request, response) => {

	await Blog.findByIdAndRemove(request.params.id)
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
