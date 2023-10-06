<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';
	import { setContext } from 'svelte';
	import { makeStore } from '$lib/stores/members-store';

	export let data;
	function drawerOpen(): void {
		drawerStore.open({
			width: 'w-[40%]'
		});
	}

	const membersStore = makeStore(data.members);
	setContext('members', membersStore);
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<strong class="text-xl uppercase">Meetings poll generator</strong>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://hackerspace.pl/"
					target="_blank"
					rel="noreferrer"
				>
					Hackerspace.pl
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<svelte:fragment slot="sidebarLeft">
		<div id="sidebar-left" class="hidden lg:block h-full">
			<Navigation />
		</div>
	</svelte:fragment>
	<div class="container h-full mx-auto flex justify-center items-center w-5">
		<Drawer><Navigation isDrawer={true} /></Drawer>
		<slot />
	</div>
</AppShell>
