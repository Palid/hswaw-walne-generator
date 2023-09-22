<script lang="ts">
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';

	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faUsers,
		faFileSignature,
		faCheckToSlot,
		faPersonPraying
	} from '@fortawesome/free-solid-svg-icons';
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
		href="/members/power-of-attorney"
		title="Power of attorney voters"
		selected={routeId === '/members/power-of-attorney'}
	>
		<svelte:fragment slot="lead">
			<Fa class="w-full" icon={faFileSignature} />
		</svelte:fragment>
		<p>Power of attorney</p>
	</AppRailAnchor>
	<AppRailAnchor
		href="/members/candidating"
		title="Candidating members"
		selected={routeId === '/members/candidating'}
	>
		<svelte:fragment slot="lead">
			<Fa class="w-full" icon={faPersonPraying} />
		</svelte:fragment>
		<p>Candidating</p>
	</AppRailAnchor>
	<AppRailAnchor href="/voting" title="Create poll" selected={routeId === '/voting'}>
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
