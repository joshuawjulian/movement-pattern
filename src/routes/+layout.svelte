<script lang="ts">
	import { userStore } from '$lib/supabase';
	import '../app.css';
</script>

<div class="w-full h-full">
	<main class="flex flex-col w-full h-full">
		<header class="bg-primary-dark border-y-black text-xl p-2">
			Movement Pattern Based Workout Planner
		</header>
		<nav class="bg-primary-light flex flex-row">
			<a class="p-2 hover:bg-primary-dark" href="/login">Login</a>
			<a class="p-2 hover:bg-primary-dark" href="/admin">Admin</a>
		</nav>
		{#if $userStore}
			<h2>{$userStore.email}</h2>
		{/if}
		<slot />
	</main>
</div>
