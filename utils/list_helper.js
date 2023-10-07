const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogList) => {
	return blogList.map(blog => blog.likes).reduce((acumulator, value) => acumulator + value, 0)
}

const favoriteBlogs = (blogList) => {
	const maxLikes = Math.max(...blogList.map(blog => blog.likes))
	return blogList.find((blog) => maxLikes === blog.likes)
}

const mostBlogs = (blogList) => {
	let maxElem = blogList[0].author
	let maxCount = 1
	const freqMap = {}
	for(let i = 0; i < blogList.length;i++){
		const elem = blogList[i].author
		if(freqMap[elem])
			freqMap[elem]++
		else  
			freqMap[elem] = 1
		if(freqMap[elem] > maxCount){
			maxCount = freqMap[elem]
			maxElem = elem
		}
	}
	return {maxElem, maxCount}

}

const mostLikes = (blogList) => {
	let maxElem = blogList[0].author
	let maxCount = blogList[0].likes
	const freqMap = {}
	for(let i = 0; i < blogList.length;i++){
		const elem = blogList[i].author
		if(freqMap[elem])
			freqMap[elem] += blogList[i].likes
		else  
			freqMap[elem] = blogList[i].likes
		if(freqMap[elem] > maxCount){
			maxCount = freqMap[elem]
			maxElem = elem
		}
	}
	return {maxElem, maxCount}
}

module.exports = {dummy, totalLikes, favoriteBlogs, mostBlogs, mostLikes}