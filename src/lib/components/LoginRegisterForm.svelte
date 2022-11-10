<script lang="ts">
	import { supabase, userStore } from '$lib/db/supabase';
	import { fly } from 'svelte/transition';

	let isRegister = false;
	let isSubmitting = false;

	let email = '';
	let password = '';
	let password_again = '';

	let errorMsg = '';

	const login = async () => {
		errorMsg = '';
		isSubmitting = true;
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) errorMsg = error.message;
		password = '';
		isSubmitting = false;
	};

	const register = async () => {
		errorMsg = '';
		isSubmitting = true;

		if (password !== password_again) {
			errorMsg = 'Passwords do not match';
			isSubmitting = false;
			return;
		}

		const { error } = await supabase.auth.signUp({ email, password });
		if (error) errorMsg = error.message;

		isSubmitting = false;
	};

	const logout = async () => {
		await supabase.auth.signOut();
	};
</script>

<div class="wrapper">
	{#if errorMsg !== ''}
		<p>{errorMsg}</p>
	{/if}
	{#if $userStore === null}
		<div class="select">
			<button
				on:click|preventDefault={() => (isRegister = false)}
				class:selected={!isRegister}
			>
				Login
			</button>
			<button
				on:click|preventDefault={() => (isRegister = true)}
				class:selected={isRegister}
			>
				Register
			</button>
		</div>
		<form>
			<div class="input-group">
				<label for="email"
					><span class="material-icons">alternate_email</span></label
				>
				<input type="text" id="email" name="email" bind:value={email} />
			</div>
			<div class="input-group">
				<label for="password"
					><span class="material-icons">lock</span></label
				>
				<input
					type="password"
					id="password"
					name="password"
					bind:value={password}
				/>
			</div>
			{#if isRegister}
				<div
					class="input-group"
					transition:fly={{ x: 400, duration: 750 }}
				>
					<label for="password_again"
						><span class="material-icons">lock</span></label
					>
					<input
						type="password"
						id="password_again"
						name="password_again"
						bind:value={password_again}
					/>
				</div>
			{/if}
			{#if !isRegister}
				<button on:click|preventDefault={login}>
					{isSubmitting ? 'Submitted' : 'Login'}
				</button>
			{:else}
				<button on:click|preventDefault={register}>
					{isSubmitting ? 'Submitted' : 'Register'}
				</button>
			{/if}
		</form>
	{:else}
		You are currently logged in as {$userStore.email}.
		<button on:click|preventDefault={logout}>Logout</button>
	{/if}
</div>

<style lang="postcss">
	div.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	div.select {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		padding-bottom: 1rem;

		& > button {
			width: 100%;
			padding: 1rem 0;
		}

		& > button.selected {
			background-color: var(--theme-bg);
			border-color: var(--theme-accent);
		}
	}

	form {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		& > button {
			padding: 1rem;
			width: 50%;
		}
	}

	div.input-group {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 3.5rem;
		border-bottom: 2px solid var(--theme-fg);

		& > label,
		& > input {
			padding: 0.5rem;
			background-color: var(--theme-bg-shade);
			width: 100%;
			height: 100%;
			border: none;
		}

		& > label {
			width: 3rem;
			font-size: 1rem;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		& > input {
			border: none;
		}

		&:focus-within {
			border-color: var(--theme-accent);

			& > label {
				color: var(--theme-accent);
				border-color: var(--theme-accent);
			}
		}
	}
</style>
