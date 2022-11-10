<script lang="ts">
	import type { MovementType } from '$lib/db/movement';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let movement: MovementType = {
		id: 'blank',
		name: 'blank',
		isWeighted: false,
		names: [],
	};

	function dispatchUpdate() {
		dispatch('update', { movement });
	}

	function addNameRow() {
		if (movement.names === undefined) movement.names = [];
		movement.names = [...movement.names, { id: '', name: '' }];
	}

	function removeRow(idx: number) {
		if (movement.names) {
			movement.names = [
				...movement.names?.slice(0, idx),
				...movement.names?.slice(idx + 1),
			];
		} else {
			movement.names = [];
		}
	}
</script>

<form on:submit|preventDefault>
	<div>
		<label for="id">Id</label>
		<input type="text" id="id" bind:value={movement.id} />
	</div>
	<div>
		<label for="name">Name</label>
		<input type="text" id="name" bind:value={movement.name} />
	</div>
	<div class="altNames">
		<label>
			<p>Alt Names</p>
			<button on:click={addNameRow}>+</button>
		</label>
		{#if movement.names}
			{#each movement.names as altname, idx}
				<div class="altName">
					<button on:click={() => removeRow(idx)}>X</button><input
						type="text"
						bind:value={movement.names[idx].name}
					/>
				</div>
			{/each}
		{/if}
	</div>
	<button on:click={dispatchUpdate}>Save</button>
</form>

<style lang="postcss">
	form {
		display: flex;
		flex-direction: column;
		max-width: 25rem;
		gap: 0.5rem;
	}

	div {
		display: flex;
		flex-direction: column;
	}

	div.altNames {
		& > label {
			border-bottom: var(--theme-accent) 4px solid;
			display: flex;
			justify-content: space-between;
		}
		padding-left: 0.5rem;
		gap: 0.25rem;

		& .altName {
			flex-direction: row;
			width: 100%;

			& > input {
				width: 100%;
			}
		}
	}
</style>
