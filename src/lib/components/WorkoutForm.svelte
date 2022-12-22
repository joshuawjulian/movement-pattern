<script lang="ts">
	import type { WorkoutType, WorkoutUpsertType } from '$lib/db/workout';
	import { createEventDispatcher, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { db } from '$lib/db';
	import type { MovementType } from '$lib/db/movement';

	export let workout: WorkoutType = {
		id: '',
		name: '',
		description: '',
		created_by: '',
		movements: [],
	};

	const dispatch = createEventDispatcher();

	let allMovements: Writable<any[]> = writable([]);
	let suggestedMovements: Writable<MovementType[]> = writable([]);
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
		let workoutToUpsert: WorkoutUpsertType;
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
		suggestMovements();
	}

	async function suggestMovements() {
		console.log(`suggestMovement fired`);
		$suggestedMovements = await db.Movement.suggestMovements(
			workout.description,
			selectedMovements,
		);
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
			on:keyup={async () => await suggestMovements()}
		/>
		<div class="movement-container">
			<div class="suggested-movement">
				<ul>
					{#each $suggestedMovements as move, idx}
						<li>{move.name}</li>
					{/each}
				</ul>
			</div>
			<div class="selected-movement">
				<label for="workout_movement_select">Select Movements:</label>
				{#each selectedMovements as selMove, idx}
					<div class="movement" transition:fade={{ duration: 250 }}>
						<button on:click|preventDefault={() => removeMovement(selMove)}
							>{selMove.name}
							<span class="material-icons">delete</span></button
						>
					</div>
				{/each}
			</div>
			<div class="select-movement">
				<select bind:value={selectedMovement}>
					{#each $allMovements as movement}
						<option value={movement}>{movement.name}</option>
					{/each}
				</select>
				<button on:click|preventDefault={addSelectedMovement}>Add</button>
			</div>
		</div>
		<button type="submit">Save/Update</button>
		<button on:click|preventDefault>Delete</button>
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
		flex-direction: column;
		gap: 1rem;
		margin: 1rem 0;

		& > div {
			display: flex;
			flex-direction: row;
			justify-content: center;
			gap: 1rem;
		}
	}
	div.movement {
		display: flex;
		flex-direction: row;
		border: 2px solid var(--theme-accent);
		align-items: center;
		height: 100%;

		& > button {
			display: flex;
			align-items: center;
			border: none;
			height: 100%;

			&:hover {
				transition-duration: 100ms;
				background-color: var(--theme-bg);
			}

			& > span {
				font-size: 1rem;
				height: 100%;
			}
		}
	}
</style>
