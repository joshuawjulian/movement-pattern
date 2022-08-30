<script lang="ts">
	import { supabase, userStore } from '$lib/supabase';
	import '../app.css';

	const logout = async () => {
		await supabase.auth.signOut();
	};
</script>

<div class="w-full h-full flex">
	<div class="flex flex-col w-full h-full">
		<header class="bg-primary-dark text-xl font-semibold p-2">
			Movement Pattern Based Workout Planner
		</header>
		<nav class="bg-primary flex flex-row">
			{#if !$userStore}
				<a class="p-2 hover:bg-primary-dark" href="/login">Login</a>
			{:else}
				<a
					class="p-2 hover:bg-primary-dark"
					href="/login"
					on:click|preventDefault={logout}>Logout</a
				>
			{/if}
			<a class="p-2 hover:bg-primary-dark" href="/admin">Admin</a>
			{#if $userStore}
				<h2 class="ml-auto my-auto justify-items-center content-center">
					Logged in as: {$userStore.email}
				</h2>
			{/if}
		</nav>
		<main class="h-max w-full">
			<slot />
		</main>
	</div>
</div>
