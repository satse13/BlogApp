const mongoose = require('mongoose')

const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const helper = require('./test_helper')


beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type',/application\/json/)
},100000)

test('a valid blog can be added', async () => {

	const newBlog = {
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type',/application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect (blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)

	const authors = blogsAtEnd.map(blog => blog.author)
	expect(authors).toContain('Edsger W. Dijkstra')

},100000)

test('unique identifier of blog is id', async () => {
	
	const blogs = await Blog.find({})
	console.log({blogs})
	for(const blog of blogs){
		expect(blog.id).toBeDefined()
	}

},100000)

test('likes not missing from Blog', async () => {
	
	const blogs = await Blog.find({})
	for(const blog of blogs){
		expect(blog.likes).toBeDefined()
	}
},100000)

test('url or title not missing in post request', async () => {

	const newBlog = {
		author: 'Edsger W. Dijkstrar',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
		.expect('Content-Type',/application\/json/)

},100000)

afterAll(async () => {
	await mongoose.connection.close()
})
