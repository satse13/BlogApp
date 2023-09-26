const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})
})

describe('blog with the most likes', () => {
	const listWithTwoBlogs = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		},
		{
			_id: '5a422aa71b54a698734d17f8',
			title: 'Second test',
			author: 'Edsger W. William',
			url: 'http://www.u.florida.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 10,
			__v: 0
		}
	]

	test('when list has only two blogs,gives the one with the most likes', () => {
		const result = listHelper.favoriteBlogs(listWithTwoBlogs)
		expect(result).toEqual(listWithTwoBlogs[1])
	})
})

describe('author with the most blogs', () => {
	const listWithThreeBlogs = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		},
		{
			_id: '5a422aa71b54a698734d17f8',
			title: 'Second blos',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.florida.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422aa71b54a698734d17f8',
			title: 'Second blos',
			author: 'John W. Dijkstra',
			url: 'http://www.u.florida.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 10,
			__v: 0
		}
	]
  
	test('when list has only three blogs,gives the author with the most blogs and the count of them', () => {
		const result = listHelper.mostBlogs(listWithThreeBlogs)
		expect(result).toEqual({maxElem : 'Edsger W. Dijkstra', maxCount : 2})
	})
})

describe('author with the most likes', () => {
	const listWithThreeBlogs = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422aa71b54a698734d17f8',
			title: 'Second blos',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.florida.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422aa71b54a698734d17f8',
			title: 'Second blos',
			author: 'John W. Dijkstra',
			url: 'http://www.u.florida.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 25,
			__v: 0
		}
	]
  
	test('when list has only three blogs,gives the author with the most likes and the count of them', () => {
		const result = listHelper.mostLikes(listWithThreeBlogs)
		expect(result).toEqual({maxElem : 'John W. Dijkstra', maxCount : 25})
	})
})