<script lang="ts">
	import WorkoutForm from '$components/WorkoutForm.svelte';
	import { db } from '$lib/db';
	import type { WorkoutShortType } from '$lib/db/workout';
	import { onMount } from 'svelte';

	let allWorkouts: WorkoutShortType[] = [];

	let currentWorkout = {
		id: '',
		name: '',
		description: '',
		created_by: '',
		movements: [],
	};

	async function loadWorkout(id: string) {
		currentWorkout = await db.Workout.getById(id);
	}

	async function updateForm() {
		allWorkouts = await db.Workout.getAllShort();
	}

	onMount(async () => {
		allWorkouts = await db.Workout.getAllShort();
	});
</script>

<div class="wrapper">
	<div class="list">
		<ul>
			{#each allWorkouts as workout}
				<li>
					<a href={`/workout/${workout.name}/${workout.id}/`}
						>{workout.name}</a
					>
				</li>
			{/each}
		</ul>
	</div>
	<div class="workout">
		<WorkoutForm
			bind:workout={currentWorkout}
			on:upsert={async () => await updateForm()}
		/>
	</div>
</div>

<style lang="postcss">
	div.wrapper {
		width: 100%;
		min-height: 100%;

		display: grid;
		grid-template-columns: 3fr 5fr;
	}

	div.list {
		display: flex;
		flex-direction: column;
		width: 100%;

		border-right: 4px solid var(--theme-pri);
		& > ul {
			& > li {
			}
		}
	}

	div.workout {
		margin: 0 250px;
	}
</style>
