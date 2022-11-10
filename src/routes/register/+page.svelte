<script lang="ts">
	import { supabase, userStore } from '$lib/db/supabase';

	let email = '';
	let password = '';
	let password_again = '';
	let errorText: string | null = null;

	const register = async () => {
		errorText = null;
		if (password !== password_again) {
			errorText = 'Passwords Must Match';
			return;
		}
		const { error } = await supabase.auth.signUp({
			email,
			password,
		});
		if (error) {
			errorText = error.message;
			return;
		}
	};

	const logout = async () => {
		await supabase.auth.signOut();
	};
</script>

<div class="h-full w-full">
	<main class="h-full w-full flex flex-col">
		{#if $userStore === null}
			<form
				on:submit|preventDefault={register}
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
				<label for="password">Password Again</label>
				<input
					id="password"
					type="password"
					bind:value={password_again}
					class="border-2 rounded-lg p-2 focus:outline-none border-vblue"
				/>
				<input
					type="submit"
					value="Register"
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
