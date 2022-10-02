<script lang="ts">
	import { db } from '$lib/db';
	import type { MovementType } from '$lib/movement';

	import { onMount } from 'svelte/internal';

	let allMovements: MovementType[] = [];

	onMount(async () => {
		allMovements = await db.Movement.getAll();
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
