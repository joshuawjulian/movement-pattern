<script lang="ts">
	import { page } from '$app/stores';
	import MovementForm from '$lib/components/MovementForm.svelte';
	import {
		getMovementById,
		upsertMovement,
		type Movement_Type,
	} from '$lib/movement';
	import { onMount } from 'svelte';

	export let movement: Movement_Type;

	async function updateMovement() {
		await upsertMovement(movement);
	}

	onMount(async () => {
		movement = await getMovementById($page.params.slug);
	});
</script>

<h1>{movement?.name}</h1>
<MovementForm bind:movement on:update={async () => await updateMovement()} />
