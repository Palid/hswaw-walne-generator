<script lang="ts">
	import membersStore, { Member } from '$lib/stores/members-store';
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';

	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import createFuzzySearch from '@nozbe/microfuzz';

	let members: Member[] = [];

	export let memberField: 'voting' | 'inPerson' | 'candidating';
	export let header: string;

	membersStore.subscribe((store) => {
		members = Array.from(store.values());
	});

	$: totalVotingMembers = members.reduce((acc, { voting }) => acc + Number(voting), 0);
	$: totalInPersonMembers = members.reduce((acc, { inPerson }) => acc + Number(inPerson), 0);
	$: totalCandidatingMembers = members.reduce(
		(acc, { candidating }) => acc + Number(candidating),
		0
	);

	const autocompleteOption = members.map((x) => x.nickname);

	const fuzzySearch = browser ? createFuzzySearch(autocompleteOption) : () => [];

	let inputDemo = '';

	$: results = fuzzySearch(inputDemo);

	const isMember = <T extends unknown>(item?: T): item is T => !!item;

	const prefilteredData = memberField === 'voting' ? members.filter((x) => !x.inPerson) : members;

	$: prefilteredTable =
		inputDemo !== ''
			? results.map((x) => $membersStore.get(x.item)).filter(isMember)
			: prefilteredData;

	let sortingOrder: 'asc' | 'dsc' = 'asc';

	// Reactive
	let page = {
		offset: 0,
		limit: 10,
		size: prefilteredData.length,
		amounts: [10, 20, 30, prefilteredData.length]
	} as PaginationSettings;

	$: paginatedSource = prefilteredTable.slice(
		page.offset * page.limit, // start
		page.offset * page.limit + page.limit // end
	);

	function humanizeField(field: typeof memberField) {
		// Sometimes ssr failed here
		if (!field) return '';
		return field
			.split(/(?=[A-Z])/)
			.map((x) => `${x.slice(0, 1).toUpperCase()}${x.slice(1).toLowerCase()}`)
			.join(' ');
	}
	function change(v: any, e: any) {
		v = e.target.checked;
	}
</script>

<div class="w-full mt-10 mb-10 text-token">
	<input
		class="input mb-10"
		type="search"
		name="demo"
		bind:value={inputDemo}
		placeholder="Search..."
		on:keypress={(e) => {
			if (e.key !== 'Enter') return;
			membersStore.update((store) => {
				const item = store.get(results[0].item);
				if (item) item.inPerson = !item.inPerson;
				return store;
			});
			inputDemo = '';
		}}
	/>

	<div class="table-container min-w-[360px]">
		<!-- Native Table Element -->
		<table class="table table-comfortable table-hover min-w-full table-interactive">
			<thead class="table-head">
				<tr>
					<th colspan="3">
						<Paginator
							bind:settings={page}
							showFirstLastButtons={false}
							showPreviousNextButtons={false}
						/>
					</th>
				</tr>
				<tr>
					<th colspan="3" class="text-center text-2xl">{header}</th>
				</tr>
				<tr>
					<th
						class={`table-sort-${sortingOrder} cursor-pointer`}
						on:click={() => {
							if (sortingOrder === 'asc') sortingOrder = 'dsc';
							else if (sortingOrder === 'dsc') sortingOrder = 'asc';
							prefilteredTable = prefilteredTable.reverse();
						}}>Nickname</th
					>
					<th>{humanizeField(memberField)}</th>
				</tr>
			</thead>
			<tbody class="table-body text-left">
				{#each paginatedSource as member, i}
					<tr
						class="border-b border-slate-100 dark_border-slate-700"
						transition:fly|local={{
							duration: 150
						}}
					>
						<td>{member.nickname}</td>
						<!-- Style is necessary here for proper hitboxes -->
						<td style="padding: 0!important" class=" min-w-[120px]">
							<label class="flex items-center p-4 m-1 cursor-pointer justify-center">
								<input
									class="checkbox"
									type="checkbox"
									bind:checked={member[memberField]}
									on:change={(e) => {
										// Force svelte to update the field, due to race condition
										membersStore.update((updater) => {
											const map = updater;
											return map;
										});
									}}
								/>
							</label>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot class="table-foot">
				{#if memberField === 'candidating'}
					<tr>
						<th colspan="1">Candidating members</th>
						<td>{totalCandidatingMembers}</td>
					</tr>
					<tr />
				{:else}
					<tr>
						<th colspan="1">Voting members</th>
						<td>{totalVotingMembers}</td>
					</tr>
					<tr>
						<th colspan="1">In person members</th>
						<td>{totalInPersonMembers}</td>
					</tr>
				{/if}
			</tfoot>
		</table>
	</div>
</div>
