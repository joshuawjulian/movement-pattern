<script lang="ts">
	import { userStore } from '$lib/supabase';
	import '../app.css';
</script>

<div class="w-full h-full grid grid-cols-1 lg:grid-cols-6">
	<aside class="hidden lg:block col-start-1 col-end-1" />
	<div
		class="flex flex-col w-full h-full max-w-xl5 lg:col-start-2 lg:col-end-6"
	>
		<header class="bg-primary-dark border-y-black text-xl p-2">
			Movement Pattern Based Workout Planner
		</header>
		<nav class="bg-primary-light flex flex-row">
			<a class="p-2 hover:bg-primary-dark" href="/login">Login</a>
			<a class="p-2 hover:bg-primary-dark" href="/admin">Admin</a>
			{#if $userStore}
				<h2 class="ml-auto my-auto justify-items-center content-center">
					Logged in as: {$userStore.email}
				</h2>
			{/if}
		</nav>
		<main class="p-2 w-full">
			<slot />
		</main>
	</div>
	<aside class="hidden lg:block col-start-6 col-end-7" />
</div>
