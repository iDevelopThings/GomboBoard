<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({page, fetch, session, stuff})
	{
		return {redirect : '/dashboard', status: 301};
	}
</script>
