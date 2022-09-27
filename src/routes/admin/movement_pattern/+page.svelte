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

<div class="wrapper">
	<div class="table">
		<div class="header" class:border-red={storesUpdate} />
		<div class="header">Movement</div>
		{#each $allPatterns as pattern}
			<div class="header">{pattern.name}</div>
		{/each}
		{#each Object.keys($mpTable).sort() as move, i}
			<div class="cell delete" class:even={i % 2 === 0}>
				<button on:click={async () => await deleteMoveByName(move)}>
					DEL
				</button>
			</div>
			<div class="cell movement" class:even={i % 2 === 0}>{move}</div>
			{#each $allPatterns as pattern}
				<div class="cell data" class:even={i % 2 === 0}>
					<input
						type="number"
						bind:value={$mpTable[move][pattern.name]}
						on:change={async () => await updateTableValue(move, pattern.name)}
						class="percent"
					/>
				</div>
			{/each}
		{/each}
		<div>
			<form on:submit|preventDefault={async () => await addNewMovement()}>
				<label for="newMovementName">Name:</label>
				<input type="text" id="newMovementName" bind:value={newMovementName} />
				<button type="submit" class="border-2 border-black">Add</button>
			</form>
		</div>
	</div>
</div>

<style>
	.border-red {
		border: 3px solid red;
		background-color: red;
	}

	div.wrapper {
		width: 100%;
	}

	div.table {
		display: grid;
		grid-template-columns: 5rem 15rem repeat(8, 5rem);
		column-gap: 4px;
		row-gap: 4px;
	}

	div.header {
		border-bottom: 4px solid var(--theme-accent);
	}

	div.cell {
		background-color: var(--theme-bg-shade);
	}

	div.even {
		background-color: var(--theme-bg);
	}

	div.even > input {
		background-color: var(--theme-bg);
	}

	input.percent {
		width: 5rem;
	}
</style>
