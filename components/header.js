class Header extends HTMLElement {
	constructor () {
		super()
		this.innerHTML = /*html*/`
			<header>
				<nav>
					<a href="/blog-viewer">Blog List</a>
					<a target="_blank" href="https://jundran.github.io/blog-manager">Blog Manager</a>
				</nav>
			</header>
		`
	}
}

customElements.define('header-component', Header, { extends: 'header'})
