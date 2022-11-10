<script lang="ts">
	import { page } from '$app/stores';
	import MovementForm from '$lib/components/MovementForm.svelte';
	import { db } from '$lib/db';
	import type { MovementType } from '$lib/db/movement';
	import { onMount } from 'svelte';

	export let movement: MovementType;

	async function updateMovement() {
		await db.Movement.upsert(movement);
	}

	onMount(async () => {
		movement = await db.Movement.getById($page.params.slug);
	});
</script>

<h1>{movement?.name}</h1>
<MovementForm
	bind:movement
	on:update={async () => await updateMovement()}
/>
