<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import Fa from 'svelte-fa/src/fa.svelte';
	import { faUsers, faFileSignature, faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
	import Syrenka from '$lib/components/HSMermaid.svelte';
	import { page } from '$app/stores';

	export let currentTile: number = 0;
</script>

<AppRail>
	<!-- --- -->
	<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
		<svelte:fragment slot="lead">
			<Fa class="w-full" icon={faUsers} />
		</svelte:fragment>
		<p>In-person checklist</p>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
		<svelte:fragment slot="lead">
			<Fa class="w-full" icon={faFileSignature} />
		</svelte:fragment>
		<p>Passed-permissions voters</p>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
		<svelte:fragment slot="lead">
			<Fa class="w-full" icon={faCheckToSlot} />
		</svelte:fragment>
		<p>Create poll</p>
	</AppRailTile>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor href="https://hackerspace.pl" target="_blank" title="Account">
			<svelte:fragment slot="lead"><Syrenka /></svelte:fragment>
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>
