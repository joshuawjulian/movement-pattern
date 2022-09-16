<script lang="ts">
	import {
		addMovement,
		deleteMovement,
		deleteMovementByName,
		getAllMovements,
		type Movement_Type,
	} from '$lib/movement';

	import {
		getMovementPatternTable,
		updateMovementPattern,
	} from '$lib/movement_pattern';
	import { getAllPatterns, type Pattern_Type } from '$lib/pattern';
	import { onMount } from 'svelte/internal';
	import { writable, type Writable } from 'svelte/store';

	let allMovements: Writable<Movement_Type[]> = writable([]);
	let allPatterns: Writable<Pattern_Type[]> = writable([]);
	let errorText: string | null = null;
	let storesUpdate: boolean = false;
	let mpTable: Writable<any> = writable({});

	onMount(async () => {
		try {
			await updateStores();
		} catch (err) {
			console.error(err);
			errorText = `Something Went Wrong ${err}`;
		}
	});

	async function updateStores() {
		storesUpdate = true;
		$allMovements = await getAllMovements();
		$allPatterns = await getAllPatterns();
		$mpTable = await getMovementPatternTable();
		storesUpdate = false;
	}

	async function updateTableValue(movementName: string, patternName: string) {
		const oldTbl = await getMovementPatternTable();
		const updatedValue = $mpTable[movementName][patternName];
		if (isNaN(updatedValue)) {
			$mpTable[movementName][patternName] = oldTbl[movementName][patternName];
		} else {
			try {
				storesUpdate = true;
				await updateMovementPattern(movementName, patternName, updatedValue);
			} catch (error) {
				console.error(error);
			} finally {
				await updateStores();
			}
		}
	}

	let newMovementName = '';

	async function addNewMovement() {
		storesUpdate = true;
		await addMovement(newMovementName);
		await updateStores();
	}

	async function deleteMoveByName(name: string) {
		storesUpdate = true;
		await deleteMovementByName(name);
		await updateStores();
	}
</script>

<div>
	<table>
		<tr class:border-red={storesUpdate}>
			<th />
			<th>Movement</th>
			{#each $allPatterns as pattern}
				<th>{pattern.name}</th>
			{/each}
		</tr>
		{#each Object.keys($mpTable).sort() as move}
			<tr class:border-red={storesUpdate}>
				<td>
					<button on:click={async () => await deleteMoveByName(move)}>
						DEL
					</button>
				</td>
				<td class="movement">{move}</td>
				{#each $allPatterns as pattern}
					<td>
						<input
							type="number"
							bind:value={$mpTable[move][pattern.name]}
							on:change={async () => await updateTableValue(move, pattern.name)}
						/>
					</td>
				{/each}
			</tr>
		{/each}
	</table>
	<div>
		<form on:submit|preventDefault={async () => await addNewMovement()}>
			<label for="newMovementName">Name:</label>
			<input type="text" id="newMovementName" bind:value={newMovementName} />
			<button type="submit" class="border-2 border-black">Add</button>
		</form>
	</div>
</div>

<style>
	.border-red {
		border: 3px solid red;
	}

	table {
		padding: 0;
		margin: 0;
	}

	tr {
		padding: 0;
		margin: 0;
	}

	th,
	td {
		border-right: 3px solid black;
	}

	th {
		font-weight: bolder;
	}

	td.movement {
		font-weight: bold;
	}

	input {
		width: 100%;
	}
</style>
