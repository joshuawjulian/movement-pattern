<script lang="ts">
	import { db } from '$lib/db';
	import { EmptyWorkout, type WorkoutType } from '$lib/db/workout';

	export let workoutId: string = '';

	let workout: WorkoutType = EmptyWorkout;

	//trigger the load
	$: if (workoutId) {
		loadWorkout(workoutId);
	}

	async function loadWorkout(id: string) {
		console.log(`loading ${id}`);
		workout = await db.Workout.getById(id);
		console.log(`done loading ${id}`);
	}

	function testSubmit(
		e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
	) {
		const data = new FormData(e.currentTarget);
		console.log(data);
	}
</script>

<section>
	<form on:submit|preventDefault={testSubmit}>
		<fieldset>
			<input
				class="name"
				id="name"
				type="text"
				bind:value={workout.name}
			/>
			<label for="name">Name</label>
		</fieldset>
		<fieldset>
			<textarea class="desc" id="desc" bind:value={workout.description} />
			<label for="desc">Description</label>
		</fieldset>
		<button type="submit">Save/Update</button>
		<button on:click|preventDefault>Delete</button>
	</form>
	<pre>{JSON.stringify(workout, null, 2)}</pre>
</section>

<style lang="postcss">
	fieldset {
		border: 2px solid var(--theme-accent);
		padding: 0.5rem;
		position: relative;
	}
</style>
