<script lang="ts">
</script>

<div class="w-full h-full">
	<nav class="w-full flex flex-row bg-primary-light">
		<a href="/admin/movement" class="p-2 hover:bg-primary-dark hover:text-white"
			>Movement</a
		>
		<a href="/admin/pattern" class="p-2 hover:bg-primary-dark hover:text-white"
			>Pattern</a
		>
		<a
			href="/admin/movement_pattern"
			class="p-2 hover:bg-primary-dark hover:text-white">MovementPattern</a
		>
	</nav>
	<main class="w-full h-full p-2">
		<slot />
	</main>
</div>
