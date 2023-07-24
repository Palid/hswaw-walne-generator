<script lang="ts">
	import Members from '$lib/components/Members.svelte';
	import { page } from '$app/stores';

	const components = [Members];
	const currentComponent = components[0];
</script>

<svelte:head>
	<title>Meetings generator</title>
	<meta name="description" content="Warsaw Hackerspace print sheets generator for meetings" />
</svelte:head>
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<svelte:component this={currentComponent} />
	</div>
</div>

<style lang="postcss">
</style>
