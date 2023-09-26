const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogList) => {
  return blogList.map(blog => blog.likes).reduce((acumulator, value) => acumulator + value, 0)
}

module.exports = {dummy, totalLikes}