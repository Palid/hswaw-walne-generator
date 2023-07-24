<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import Fa from 'svelte-fa/src/fa.svelte';
	import { faUsers, faFileSignature, faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
	import Syrenka from '$lib/components/HSMermaid.svelte';
	import { page } from '$app/stores';

	$: routeId = $page.route.id;
</script>

<AppRail>
	<AppRailAnchor
		href="/members/in-person"
		title="In-person checklist"
		selected={routeId === '/members/in-person'}
	>
		<svelte:fragment slot="lead">
			<Fa class="w-full" icon={faUsers} />
		</svelte:fragment>
		<p>In-person checklist</p>
	</AppRailAnchor>
	<AppRailAnchor
		href="/members/passed"
		title="Passed-permissions voters"
		selected={routeId === '/members/passed'}
	>
		<svelte:fragment slot="lead">
			<Fa class="w-full" icon={faFileSignature} />
		</svelte:fragment>
		<p>Passed-permissions voters</p>
	</AppRailAnchor>
	<AppRailAnchor href="/voting/create" title="Create poll" selected={routeId === '/voting/create'}>
		<svelte:fragment slot="lead">
			<Fa class="w-full" icon={faCheckToSlot} />
		</svelte:fragment>
		<p>Create poll</p>
	</AppRailAnchor>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor href="https://hackerspace.pl" target="_blank" title="Account">
			<svelte:fragment slot="lead"><Syrenka /></svelte:fragment>
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>
