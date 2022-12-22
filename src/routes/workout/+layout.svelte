<script lang="ts">
	import WorkoutList from '$lib/components/WorkoutList.svelte';
	import {} from 'svelte';

	function selectedWorkout(value: CustomEvent) {
		console.log(value.detail);
	}
</script>

<section>
	<aside>
		<WorkoutList on:select={(value) => selectedWorkout(value)} />
	</aside>
	<article>
		<slot />
	</article>
</section>

<style lang="postcss">
	section {
		display: grid;
		grid-template-columns: minmax(100px, 250px) auto;
		height: 100%;
		width: 100%;
	}
</style>
