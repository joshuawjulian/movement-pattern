<script lang="ts">
	import WorkoutForm from '$components/WorkoutForm.svelte';
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

	onMount(async () => {
		allWorkouts = await getAllWorkoutShort();
	});
</script>

<div class="wrapper">
	{#each allWorkouts as workout}
		<button
			on:click|preventDefault={async () => await loadWorkout(workout.id)}
			>{workout.name}</button
		>
	{/each}

	<WorkoutForm bind:workout={currentWorkout} />
</div>

<style lang="postcss">
	div.wrapper {
		width: 70%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
	}
</style>
