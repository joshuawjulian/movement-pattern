<script lang="ts">
	import { getAllMovements, type Movement_Type } from '$lib/movement';

	import { onMount } from 'svelte/internal';

	let allMovements: Movement_Type[] = [];

	onMount(async () => {
		allMovements = await getAllMovements();
	});
</script>

<div>
	<h1>Movements</h1>
	{#each allMovements as movement}
		<a href={`/admin/movement/${movement.id}/`}>{movement.name}</a>
	{/each}
</div>

<style lang="postcss">
	div {
		display: flex;
		flex-direction: column;
	}
</style>
