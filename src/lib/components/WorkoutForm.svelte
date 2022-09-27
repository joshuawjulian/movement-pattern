<script lang="ts">
	import { getAllMovements, type Movement_Type } from '$lib/movement';

	import type { WorkoutType } from '$lib/workout';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let workout: WorkoutType = {
		id: '',
		name: '',
		description: '',
		created_by: '',
	};

	let allMovements: Writable<any[]> = writable([]);
	let selectedMovements: Movement_Type[] = [];
	let selectedMovement: Movement_Type;

	function addSelectedMovement() {
		selectedMovements = [...selectedMovements, selectedMovement];
	}

	function removeMovement(movement: Movement_Type) {
		console.log(`remove movement ${movement.name}`);
		selectedMovements = selectedMovements.filter((m) => m.id !== movement.id);
	}

	onMount(async () => {
		$allMovements = await getAllMovements();
	});
</script>

<div class="wrapper">
	<h3>Add/Edit Workout</h3>
	<form on:submit|preventDefault>
		<label for="workout_name">Name:</label>
		<input type="text" id="workout_name" bind:value={workout.name} />
		<label for="workout_desc">Description:</label>
		<textarea type="text" id="workout_desc" bind:value={workout.description} />
		<label for="workout_movement_select">Select Movements:</label>
		<div>
			<select bind:value={selectedMovement}>
				{#each $allMovements as movement}
					<option value={movement}>{movement.name}</option>
				{/each}
			</select>
			<button on:click={addSelectedMovement}>Add</button>
		</div>
		<div>
			{#each selectedMovements as selMove}
				<div>
					<button on:click={() => removeMovement(selMove)}>Remove</button>
					<div>{selMove.name}</div>
				</div>
			{/each}
		</div>
		<button type="submit">Save/Update</button>
	</form>
	<pre>Selected Movement: {JSON.stringify(selectedMovement, null, 2)} </pre>
	<pre>SelectedMovements: {JSON.stringify(selectedMovements, null, 2)}</pre>
</div>

<style lang="postcss">
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	form {
		display: flex;
		flex-direction: column;
		min-width: 80%;
		width: 50rem;
	}
</style>
