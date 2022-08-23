<script lang="ts">
	import { supabase, userStore } from '$lib/supabase';

	let email = '';
	let password = '';
	let pending = false;
	let errorText: string | null = null;

	const login = async () => {
		errorText = null;
		pending = true;
		console.log({ email, password });
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

<div>
	<main>
		{#if errorText}
			<p>{errorText}</p>
		{/if}
		{#if $userStore === null}
			<form on:submit|preventDefault={login}>
				<label for="email">Email</label>
				<input id="email" type="email" bind:value={email} />
				<label for="password">Password</label>
				<input id="password" type="password" bind:value={password} />
				<input type="submit" value="Login" />
			</form>
		{:else}
			<button on:click={logout}>Logout</button>
		{/if}
	</main>
</div>

<style>
	div {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
	}

	main {
		min-width: 500px;
		display: grid;
		place-items: center;
		align-content: center;
	}
	form {
		width: 100%;
		height: 100%;
		display: flex;

		flex-direction: column;
	}
</style>
