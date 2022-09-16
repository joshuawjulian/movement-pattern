<script lang="ts">
</script>

<div class="wrapper">
	<nav>
		<a href="/admin/movement">movement</a>
		<a href="/admin/pattern">pattern</a>
		<a href="/admin/movement_pattern">movement pattern</a>
	</nav>
	<main>
		<slot />
	</main>
</div>

<style>
	.wrapper {
		width: 100%;
		min-height: 100vh;
		background-color: var(--bg-color-light);
		color: var(--font-color-dark);
		display: grid;
		grid-template-columns: minmax(10rem, 20%) auto;
	}
	nav {
		display: flex;
		flex-direction: column;
		border-right: 4px solid var(--theme-pri);
	}
</style>
