<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import CompleteWorkoutForm from '$lib/components/CompleteWorkoutForm.svelte';

	let err: string | null = null;

	let workoutId: string = '';

	function getWorkout() {
		if ($page?.params?.id === undefined) {
			err = 'invalid param';
			return;
		}

		workoutId = $page.params.id;
	}

	$: if ($page.params.id) getWorkout();

	onMount(() => {
		getWorkout();
	});
</script>

<section>
	{#if err}<h2>{err}</h2>{/if}
	<CompleteWorkoutForm bind:workoutId />
</section>
