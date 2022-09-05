<script lang="ts">
	import { getAllMovements, type Movement_Type } from '$lib/movement';

	import { onMount } from 'svelte/internal';

	let allMovements: Movement_Type[] = [];

	onMount(async () => {
		allMovements = await getAllMovements();
	});
</script>

<h1 class="text-4xl">Pattern</h1>
<table>
	<tr><th>id</th><th>Name</th></tr>
	{#each allMovements as movement}
		<tr><td>{movement.id}</td><td>{movement.name}</td></tr>
	{/each}
</table>
