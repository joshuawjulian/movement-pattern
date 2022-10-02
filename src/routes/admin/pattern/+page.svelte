<script lang="ts">
	import { db } from '$lib/db';
	import type { PatternType } from '$lib/pattern';

	import { onMount } from 'svelte/internal';

	let allPatterns: PatternType[] = [];

	onMount(async () => {
		allPatterns = await db.Pattern.getAll();
	});
</script>

<h1 class="text-4xl">Pattern</h1>
<table>
	<tr><th>id</th><th>Name</th></tr>
	{#each allPatterns as pattern}
		<tr><td>{pattern.id}</td><td>{pattern.name}</td></tr>
	{/each}
</table>
