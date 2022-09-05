<script lang="ts">
	import { supabase, userStore } from '$lib/supabase';

	let email = '';
	let password = '';
	let pending = false;
	let errorText: string | null = null;

	const login = async () => {
		errorText = null;
		pending = true;
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		pending = false;
		if (error) {
			errorText = error.message;
			return;
		}
	};

	const logout = async () => {
		pending = true;
		await supabase.auth.signOut();
		pending = false;
	};
</script>

<div class="h-full w-full">
	<main class="h-full w-full flex flex-col">
		{#if errorText}
			<p>{errorText}</p>
		{/if}
		{#if $userStore === null}
			<form
				on:submit|preventDefault={login}
				class="flex flex-col space-between md:mx-20 md:mt-20 m-5"
			>
				<h1 class="text-center text-3xl">Register</h1>
				{#if errorText}
					<p class="text-red-400 font-semibold text-center">{errorText}</p>
				{/if}
				<label for="email">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					class="border-2 rounded-lg p-2 focus:outline-none border-vblue"
				/>
				<label for="password">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					class="border-2 rounded-lg p-2 focus:outline-none border-vblue"
				/>
				<input
					type="submit"
					value="Login"
					class="border-2 rounded-lg p-2 focus:outline-none hover:bg-white border-vblue my-2"
				/>
			</form>
		{:else}
			<button
				on:click={logout}
				class="border-vblue border-4 w-1/2 h-20 rounded-lg mx-auto mt-20 hover:bg-vblue"
				>Logout</button
			>
		{/if}
	</main>
</div>
