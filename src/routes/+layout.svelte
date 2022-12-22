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
	<header>
		<a href="/" class="title">Workout App</a>
		<nav>
			{#if !$userStore}
				<a href="/login">Login/Register</a>
			{:else}
				<a href="/login" on:click|preventDefault={logout}>Logout</a>
			{/if}
			<a href="/admin">Admin</a>
			<a href="/workout">Workout</a>
			{#if $userStore}
				<a href="/">Logged in</a>
			{/if}
		</nav>
		<section>
			<DarkLightMode />
		</section>
	</header>
	<main>
		<slot />
	</main>
</div>

<style lang="postcss">
	div.wrapper {
		background-color: var(--theme-bg);
		border: 2px solid black;
		min-height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		border-bottom: var(--theme-pri) solid 3px;

		& a.title {
			font-size: 1.7em;
			color: var(--theme-pri);
			display: flex;
		}

		& nav {
			display: flex;
			justify-content: center;
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

		& section {
			display: flex;
			align-items: center;
			justify-content: end;
		}
	}

	main {
		width: 100%;
		height: 100%;
		flex: 1;
		display: flex;
		border: 1px solid blue;
	}
</style>
