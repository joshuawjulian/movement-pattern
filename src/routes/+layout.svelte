<script lang="ts">
	import { userStore } from '$lib/supabase';
	import './reset.css';
</script>

<wrapper>
	<main>
		<header>Website Title</header>
		<nav>
			<a href="/login">Login</a>
			<a href="/admin">Admin</a>
		</nav>
		{#if $userStore}
			<h2>{$userStore.email}</h2>
		{/if}
		<slot />
	</main>
</wrapper>

<style>
	wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	header {
		width: 100%;
		background-color: #a0a0a0;
		font-size: 3rem;
		border-bottom: 2px solid black;
	}
	nav {
		border-bottom: 2px solid black;
	}
	main {
		width: 90%;
		display: flex;
		flex-direction: column;
		background-color: #c0c0c0;
		box-shadow: 1rem 1rem black;
	}
</style>
