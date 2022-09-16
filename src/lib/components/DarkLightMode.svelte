<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let theme = 'dark';
	if (browser) theme = localStorage.getItem('theme') || 'dark';

	if (theme !== 'light' && theme !== 'dark') theme = 'dark';

	function switchMode() {
		if (theme === 'dark') theme = 'light';
		else theme = 'dark';

		updateHTML();
	}

	function updateHTML() {
		if (theme === 'dark')
			document.documentElement.setAttribute('data-theme', 'dark');
		else document.documentElement.setAttribute('data-theme', 'light');
	}

	onMount(() => {
		updateHTML();
	});
</script>

<div>
	<label for="theme-toggle" />
	<input
		type="checkbox"
		id="theme-toggle"
		checked={theme === 'dark'}
		on:click={switchMode}
	/>
</div>

<style>
	#theme-toggle {
		transition: box-shadow 0.3s ease-in-out;
		box-shadow: 0 0 40px 20px yellow;
		border: 2px solid black;
		background-color: transparent;
		margin: 3px;
		min-width: 2rem;
		min-height: 2rem;
	}

	#theme-toggle:checked {
		box-shadow: 0 0 40px 20px slategray;
		color: slategray;
	}
</style>
