async function getBlog () {
	const id = new URL(window.location.toLocaleString()).searchParams.get('id')

	try {
		const res = await fetch(`https://blog-api-yk7t.onrender.com/api/v1/blog/${id}`, {
			headers: { 'Accept': 'application/json' }
		})
		if (!res.ok) return renderNotPublishedMessage() // 401
		const json = await res.json()
		document.querySelector('main').prepend(Blog(json.document))
		populateComments (json.document.comments)
	} catch (error) {
		console.error(error)
	}
}

function Blog (data) {
	const blog = document.createElement('div')
	blog.className = 'blog'
	const options = { month: 'long', day: 'numeric', year: 'numeric' }
	const date = new Date(data.createdAt).toLocaleDateString(undefined, options)
	blog.innerHTML = /*html*/`
		<h1 class='title'>${data.title}</h1>
		<p class='author'>by ${data.user.fullname}</p>
		<p class='date'>${date}</p>
		<p class='text'>${data.text}</p>
	`
	return blog
}

function populateComments (comments) {
	const commentContainer = document.querySelector('.comments')
	commentContainer.innerHTML = ''
	const options = { month: 'long', day: 'numeric', year: 'numeric' }
	comments.forEach(data => {
		const comment = document.createElement('div')
		comment.className = 'comment'
		const date = new Date(data.createdAt).toLocaleDateString(undefined, options)
		comment.innerHTML = /*html*/`
			<p class='text'>${data.text}</p>
			<p class='footer'>Posted by <span>${data.name}</span> on ${date}</p>
		`
		commentContainer.appendChild(comment)
	})
}

document.querySelector('#comment-form').addEventListener('submit', async e => {
	e.preventDefault()
	const body = {
		name: e.target.name.value,
		text: e.target.text.value
	}
	if (!body.name.trim() || !body.text.trim()) return

	const id = new URL(window.location.toLocaleString()).searchParams.get('id')
	try {
		const res = await fetch(`https://blog-api-yk7t.onrender.com/api/v1/blog/${id}/comment`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(body)
		})
		const json = await res.json()
		e.target.name.value = ''
		e.target.text.value = ''
		populateComments(json.comments)
	} catch (error) {
		console.error(error)
	}
})

function renderNotPublishedMessage () {
	document.querySelector('main').innerHTML = /*html*/`
		<p style='font-size: 1.5rem'>Blog is not published</p>
	`
	return null
}

getBlog()
