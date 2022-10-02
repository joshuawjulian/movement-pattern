<script lang="ts">
	import type { WorkoutResponseSuccess } from '$lib/workout';
	import { createEventDispatcher, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { db } from '$lib/db';
	import type { MovementType } from '$lib/movement';

	export let workout: WorkoutResponseSuccess = {
		id: '',
		name: '',
		description: '',
		created_by: '',
		movements: [],
	};

	const dispatch = createEventDispatcher();

	let allMovements: Writable<any[]> = writable([]);
	let selectedMovements: MovementType[] = [];
	let selectedMovement: MovementType;

	function addSelectedMovement() {
		selectedMovements = [...selectedMovements, selectedMovement];
	}

	function removeMovement(movement: MovementType) {
		console.log(`remove movement ${movement.name}`);
		selectedMovements = selectedMovements.filter(
			(m) => m.id !== movement.id,
		);
	}

	async function upsertThisWorkout() {
		console.log(workout);
		let workoutToUpsert: WorkoutResponseSuccess;
		if (workout.id === '') {
			workoutToUpsert = {
				name: workout.name,
				description: workout.description,
			};
		} else {
			workoutToUpsert = {
				id: workout.id,
				description: workout.description,
				name: workout.name,
			};
		}
		workout = await db.Workout.upsertAndReturn(workoutToUpsert);
		await db.WorkoutMovement.update(workout.id, selectedMovements);
		dispatch('upsert');
	}

	$: if (workout && workout.movements) {
		selectedMovements = workout.movements;
	}

	onMount(async () => {
		$allMovements = await db.Movement.getAll();
	});
</script>

<div class="wrapper">
	<form on:submit|preventDefault={async () => await upsertThisWorkout()}>
		<label for="workout_name">Name:</label>
		<input type="text" id="workout_name" bind:value={workout.name} />
		<label for="workout_desc">Description:</label>
		<textarea
			type="text"
			id="workout_desc"
			bind:value={workout.description}
		/>
		<label for="workout_movement_select">Select Movements:</label>
		<div class="movement-container">
			{#each selectedMovements as selMove}
				<div class="movement">
					<button on:click|preventDefault={() => removeMovement(selMove)}
						><span class="material-icons">delete</span></button
					>
					<div>{selMove.name}</div>
				</div>
			{/each}
		</div>
		<div>
			<select bind:value={selectedMovement}>
				{#each $allMovements as movement}
					<option value={movement}>{movement.name}</option>
				{/each}
			</select>
			<button on:click|preventDefault={addSelectedMovement}>Add</button>
		</div>
		<button type="submit">Save/Update</button>
	</form>
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
		min-width: 100%;

		& > textarea {
			min-height: 7rem;
		}
	}

	div.movement-container {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
	div.movement {
		display: flex;
		flex-direction: row;

		align-items: center;

		& > button {
			display: flex;
			align-items: center;
		}
	}
</style>
