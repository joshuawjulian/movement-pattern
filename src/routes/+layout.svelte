<script lang="ts">
	import { supabase, userStore } from '$lib/supabase';
	import '../app.css';

	const logout = async () => {
		await supabase.auth.signOut();
	};
</script>

<div class="w-full h-screen flex bg-vblue-50">
	<div class="flex flex-col w-full h-full">
		<header class="bg-vblue-800 text-xl text-white font-semibold p-2">
			Movement Pattern Based Workout Planner
		</header>
		<nav class="bg-vblue-500 flex flex-row">
			{#if !$userStore}
				<a class="p-2 text-white hover:bg-vblue-800" href="/login">Login</a>
				<a class="p-2 text-white hover:bg-vblue-800" href="/register"
					>Register</a
				>
			{:else}
				<a
					class="p-2 text-white hover:bg-vblue-800"
					href="/login"
					on:click|preventDefault={logout}>Logout</a
				>
			{/if}
			<a class="p-2 text-white hover:bg-vblue-800" href="/admin">Admin</a>
			{#if $userStore}
				<h2
					class="ml-auto mr-2 my-auto text-white justify-items-center content-center"
				>
					Logged in as: {$userStore.email}
				</h2>
			{/if}
		</nav>
		<main class="h-full w-full">
			<slot />
		</main>
	</div>
</div>
