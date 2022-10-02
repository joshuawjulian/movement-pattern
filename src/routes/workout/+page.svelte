<script lang="ts">
	import WorkoutForm from '$components/WorkoutForm.svelte';
	import { updateMovementNames } from '$lib/movement';
	import {
		getAllWorkoutShort,
		getWorkoutById,
		type WorkoutResponseSuccess,
	} from '$lib/workout';
	import { onMount } from 'svelte';

	let allWorkouts: WorkoutResponseSuccess[] = [];

	let currentWorkout = {
		id: '',
		name: '',
		description: '',
		created_by: '',
		movements: [],
	};

	async function loadWorkout(id: string) {
		currentWorkout = await getWorkoutById(id);
	}

	async function updateForm() {
		allWorkouts = await getAllWorkoutShort();
	}

	onMount(async () => {
		allWorkouts = await getAllWorkoutShort();
	});
</script>

<div class="wrapper">
	<div>
		{#each allWorkouts as workout}
			<button
				on:click|preventDefault={async () => await loadWorkout(workout.id)}
				>{workout.name}</button
			>
		{/each}
	</div>
	<WorkoutForm
		bind:workout={currentWorkout}
		on:upsert={async () => await updateForm()}
	/>
	<pre>{JSON.stringify(currentWorkout, null, 2)}</pre>
</div>

<style lang="postcss">
	div.wrapper {
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
	}
</style>
