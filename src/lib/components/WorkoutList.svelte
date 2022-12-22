<script lang="ts">
	import { db } from '$lib/db/';
	import type { WorkoutShortType } from '$lib/db/workout';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	let allWorkouts: WorkoutShortType[] = [];

	function dispatchWorkoutSelection(workout: WorkoutShortType) {
		dispatch('select', workout);
	}

	onMount(async () => {
		allWorkouts = await db.Workout.getAllShort();
	});
</script>

<div>
	{#each allWorkouts as workout}
		<a href={`/workout/${workout.name}/${workout.id}`}>
			{workout.name}
		</a>
	{/each}
</div>

<style lang="postcss">
	div {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		& a {
			width: 100%;
			padding: 0.1rem 0.5rem;
			text-align: right;
		}
	}
</style>
