<script lang="ts">
	import { supabase, userStore } from '$lib/supabase';
	import { fly } from 'svelte/transition';

	let isRegister = false;
	let isSubmitting = false;

	let email = '';
	let password = '';
	let password_again = '';

	let errorMsg = '';

	const flipRegister = () => {
		isRegister = !isRegister;
	};

	const login = async () => {
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
	{#if $userStore === null}
		<div class="select">
			<button
				on:click|preventDefault={flipRegister}
				class:selected={!isRegister}
			>
				Login
			</button>
			<button
				on:click|preventDefault={flipRegister}
				class:selected={isRegister}
			>
				Register
			</button>
		</div>
		<form>
			<div class="input-group">
				<label for="email">Email</label>
				<input type="text" id="email" name="email" bind:value={email} />
			</div>
			<div class="input-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					bind:value={password}
				/>
			</div>
			{#if isRegister}
				<div class="input-group" transition:fly={{ x: 400, duration: 750 }}>
					<label for="password_again">Password Again</label>
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
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	div.select {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;

		& > button {
			padding: 3rem;
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
		gap: 0.5rem;

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
		border-bottom: 2px solid var(--theme-fg);

		& > label,
		& > input {
			padding: 1rem;
			background-color: var(--theme-bg-shade);
			width: 100%;
		}

		& > label {
			width: 12rem;
			border-right: 2px solid var(--theme-fg);
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
