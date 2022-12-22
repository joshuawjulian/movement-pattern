<script lang="ts">
	import { Temporal } from '@js-temporal/polyfill';
	import { dayNumberToString, getFullWeeksOfMonthYear } from '$lib/utils';
	import { data } from 'autoprefixer';

	export let maxTracks = 2;

	export let date = Temporal.Now.plainDateISO().toPlainYearMonth();

	let days = getFullWeeksOfMonthYear(date);

	$: if (date) days = getFullWeeksOfMonthYear(date);

	function addMonth() {
		date = date.add({ months: 1 });
	}

	function minusMonth() {
		date = date.subtract({ months: 1 });
	}
</script>

<div class="calendar">
	<div class="header">
		<div class="button" on:click={() => minusMonth()}>-</div>
		<div>{date.month}/{date.year}</div>
		<div class="button" on:click={() => addMonth()}>+</div>
	</div>
	<div class="days">
		{#each days as day}
			<div class="day">{day.day}</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.calendar {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: minmax(5rem, 20%) auto;
	}

	.days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}

	.header {
		display: flex;
		justify-content: center;
		border-bottom: 4px solid var(--theme-bg-shade);

		& div {
			padding: 0 5rem;
			display: flex;
			align-items: center;
		}

		& div.button:hover {
			background-color: var(--theme-accent);
			transition-duration: 0.1s;
		}

		& div.button:active {
			background-color: var(--theme-bg);
		}
	}
</style>
