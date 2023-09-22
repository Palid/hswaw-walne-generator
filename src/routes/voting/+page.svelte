<script lang="ts">
	import { assets, base } from '$app/paths';
	import { generateMembersList } from '$lib/pdf/generate-members-list';
	import { generateSecretVotingList } from '$lib/pdf/generate-couting-list';
	import membersStore, { Member } from '$lib/stores/members-store';

	let members: Member[] = [];
	membersStore.subscribe((store) => {
		members = Array.from(store.values());
	});
</script>

<div class="container flex w-full justify-center">
	<div class="btn-group-vertical variant-filled">
		<button
			on:click={() => {
				generateMembersList(members);
			}}>Print members list</button
		>
		<button on:click={() => generateSecretVotingList(members)}>Pring counting lists</button>
	</div>
</div>
