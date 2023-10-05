const Blog = require('../models/blog')

const initialBlogs = [
	{
		_id: '651f02e1979817cee5597b55',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
	{
		_id: '651f02e1979817cee5597b57',
		title: 'Second test',
		author: 'Edsger W. William',
		url: 'http://www.u.florida.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 10
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs, blogsInDb
}