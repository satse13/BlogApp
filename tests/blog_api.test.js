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
},1000000)

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

test('if missing likes, default to 0', async () => {
	
	const newBlog = {
		title:'The best blog ever',
		author:'Me',
		url:'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type',/application\/json/)

	const blog = await Blog.findOne({'title': 'The best blog ever'})
	expect(blog.likes).toBe(0)

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

test('a single blog can be deleted', async () => {
	const newBlog = {
		title:'The best blog ever',
		author:'Me',
		url:'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes:12
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)

	const allBlogs = await helper.blogsInDb()
	const blogToDelete = allBlogs.find(blog => blog.title === newBlog.title)

	await api
		.delete(`/api/blogs/${blogToDelete.id}`)
		.expect(204)

	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

	const contents = blogsAtEnd.map(r => r.title)

	expect(contents).not.toContain(blogToDelete.title)

},100000)

test('a valid blog can be updated', async () => {

	const updatedBlog = helper.initialBlogs[0]

	const initialLikes = helper.initialBlogs[0].likes

	const newBlog = {...updatedBlog, likes : initialLikes + 10}

	await api
		.put(`/api/blogs/${updatedBlog._id}`)
		.send(newBlog)
		.expect(200)

	const blogsAtEnd = await helper.blogsInDb()
	const foundBlog = blogsAtEnd.find(blog => blog.likes === initialLikes + 10)
	expect(foundBlog.likes).toBe(initialLikes + 10)

},100000)

test('posting blog fails without token', async () => {

	const newBlog = {
		title: 'No token blog',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(401)
		.expect('Content-Type',/application\/json/)
}, 100000)

afterAll(async () => {
	await mongoose.connection.close()
},1000000)
