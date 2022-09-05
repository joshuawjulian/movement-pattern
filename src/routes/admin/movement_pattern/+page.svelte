<script lang="ts">
	import { getAllMovements, type Movement_Type } from '$lib/movement';

	import { getMovementPatternTable } from '$lib/movement_pattern';
	import { getAllPatterns, type Pattern_Type } from '$lib/pattern';
	import { onMount } from 'svelte/internal';
	import { writable, type Writable } from 'svelte/store';

	let allMovements: Writable<Movement_Type[]> = writable([]);
	let allPatterns: Writable<Pattern_Type[]> = writable([]);
	let errorText: string | null = null;
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
		$allMovements = await getAllMovements();
		$allPatterns = await getAllPatterns();
		$mpTable = await getMovementPatternTable();
	}
</script>

<div class="flex flex-row justify-center">
	<table class="border-black border-2">
		<tr class="border-black border-2">
			<th class="p-5">Movement</th>
			{#each $allPatterns as pattern}
				<th class="w-4">{pattern.name}</th>
			{/each}
		</tr>
		{#each Object.keys($mpTable).sort() as move}
			<tr class="border-black border-2">
				<td class="text-center">{move}</td>
				{#each $allPatterns as pattern}
					<td class="text-center">
						<input
							class="w-20 border-2 border-black"
							type="number"
							value={$mpTable[move][pattern.name]}
						/>
					</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>
