<script lang="ts">
	import membersStore, { Member } from '$lib/stores/members-store';

	import { fly } from 'svelte/transition';

	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import createFuzzySearch from '@nozbe/microfuzz';

	let members: Member[] = [];

	membersStore.subscribe((store) => {
		members = Array.from($membersStore.values());
	});

	$: totalVotingMembers = members.reduce((acc, { voting }) => acc + (voting ? 1 : 0), 0);
	$: totalInPersonMembers = members.reduce((acc, { inPerson }) => acc + (inPerson ? 1 : 0), 0);

	const autocompleteOption = members.map((x) => x.nickname);

	const fuzzySearch = createFuzzySearch(autocompleteOption);

	let inputDemo = '';

	$: results = fuzzySearch(inputDemo);

	$: console.log(results);
	$: console.log(inputDemo);

	const isMember = <T extends unknown>(item?: T): item is T => !!item;

	$: prefilteredTable =
		inputDemo !== '' ? results.map((x) => $membersStore.get(x.item)).filter(isMember) : members;

	// Reactive
	let page = {
		offset: 0,
		limit: 10,
		size: members.length,
		amounts: [10, 20, 30, members.length]
	} as PaginationSettings;

	$: paginatedSource = prefilteredTable.slice(
		page.offset * page.limit, // start
		page.offset * page.limit + page.limit // end
	);

	function onInPersonClick(member: Member) {
		membersStore.update((store) => {
			member.inPerson = !member.inPerson;
			return store;
		});
	}
</script>

<div class="w-full mt-10 mb-10 text-token">
	<input
		class="input mb-10"
		type="search"
		name="demo"
		bind:value={inputDemo}
		placeholder="Search..."
	/>

	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-comfortable table-hover">
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
					<th>Nickname</th>
					<th>In person</th>
				</tr>
			</thead>
			<tbody class="table-body">
				{#each paginatedSource as member, i}
					<tr
						class="border-b border-slate-100 dark_border-slate-700"
						transition:fly={{
							duration: 150
						}}
					>
						<td>{member.nickname}</td>
						<!-- Style is necessary here for proper hitboxes -->

						<td style="padding: 0!important">
							<label
								class="flex items-center justify-center p-4 m-1 cursor-pointer"
								on:click={(e) => {
									e.preventDefault();
									onInPersonClick(member);
								}}
								on:keyup={(e) => {
									e.preventDefault();
									onInPersonClick(member);
								}}
							>
								<input
									class="checkbox"
									on:click={(e) => {
										e.preventDefault();
										onInPersonClick(member);
									}}
									on:keyup={(e) => {
										e.preventDefault();
										onInPersonClick(member);
									}}
									type="checkbox"
									checked={member.inPerson}
								/>
							</label>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot class="table-foot">
				<tr>
					<th colspan="1">Voting members</th>
					<td>{totalVotingMembers}</td>
				</tr>
				<tr>
					<th colspan="1">In person members</th>
					<td>{totalInPersonMembers}</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
