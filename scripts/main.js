async function getBlogs () {
	try {
		const res = await fetch('https://blog-api-yk7t.onrender.com/api/v1/blog/published', {
			headers: { 'Accept': 'application/json' }
		})
		const json = await res.json()
		const main = document.querySelector('main')
		json.documents.forEach((blog, index) => {
			main.appendChild(BlogSummary(blog))
			if (index < json.documents.length - 1) {
				main.appendChild(document.createElement('hr'))
			}
		})
	} catch (error) {
		console.error(error)
	}
}

function BlogSummary (blog) {
	const bs = document.createElement('div')
	bs.className=`blog-summary`
	const options = { month: 'long', day: 'numeric', year: 'numeric' }
	const date = new Date(blog.createdAt).toLocaleDateString(undefined, options)
	bs.innerHTML = /*html*/`
		<a class='title' href=${`/blog.html?id=${blog._id}`}>${blog.title}</a>
		<p class='author'>by ${blog.user.fullname}</p>
		<p class='text'>${blog.summary}</p>
		<p class='date'>${date}</p>
	`
	return bs
}

getBlogs()
