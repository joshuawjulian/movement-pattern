<script lang="ts">
	import { supabase, userStore } from '$lib/db/supabase';
	import './reset.css';
	import '../app.css';

	import DarkLightMode from '$lib/components/DarkLightMode.svelte';

	const logout = async () => {
		await supabase.auth.signOut();
	};
</script>

<div class="wrapper">
	<header>Additional Work</header>
	<nav>
		{#if !$userStore}
			<a href="/login">Login/Register</a>
		{:else}
			<a href="/login" on:click|preventDefault={logout}>Logout</a>
		{/if}
		<a href="/admin">Admin</a>
		<a href="/workout">Workout</a>
		{#if $userStore}
			<h5>
				Logged in as: {$userStore.email}
			</h5>
		{/if}
		<DarkLightMode />
	</nav>
	<main>
		<slot />
	</main>
</div>

<style lang="postcss">
	header {
		font-size: 3.5rem;
		background-color: var(--theme-bg);
		color: var(--theme-pri);
		border-bottom: 3px solid var(--theme-pri);
	}
	div.wrapper {
		background-color: var(--theme-bg);
		border: 2px solid black;
		min-height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	nav {
		display: flex;
		justify-content: center;
		background-color: var(--theme-bg);
		border-bottom: 3px solid var(--theme-fg);
		border-bottom: var(--theme-pri) solid 3px;
		background-color: var(--theme-bg);
		& a {
			padding: 0 0.5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			color: var(--theme-fg);
			background-color: var(--theme-bg);
		}
	}

	h5 {
		display: flex;
		align-items: center;
	}

	main {
		width: 100%;
		height: 100%;
		flex: 1;
		display: flex;
	}
</style>
