<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte/internal';

	async function getAllMovementPatterns() {
		const { data, error } = await supabase
			.from('movement_pattern')
			.select('id, movement(*), pattern(*), percent');
		if (error) throw new Error(error.message);
		return data;
	}

	onMount(async () => {
		console.log(await getAllMovementPatterns());
	});
</script>
