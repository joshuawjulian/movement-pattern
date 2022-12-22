<script lang="ts">
	import { Temporal } from '@js-temporal/polyfill';

	import Calendar from '$lib/components/Calendar.svelte';
</script>

<div class="wrapper">
	<Calendar />
</div>

<style lang="postcss">
	.wrapper {
		width: 100%;
		flex: 1;
		display: flex;
	}
</style>
