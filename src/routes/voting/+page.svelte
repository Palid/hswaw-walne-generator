<script lang="ts">
	import { generateMembersList } from '$lib/pdf/generate-members-list';
	import { generateSecretVotingList } from '$lib/pdf/generate-couting-list';
	import { generateVotingCards } from '$lib/pdf/generate-voting-cards';
	import { getMembersStoreContext } from '$lib/stores/members-store';

	const membersStore = getMembersStoreContext();
</script>

<div class="container flex w-full justify-center">
	<div class="btn-group-vertical variant-filled">
		<button
			on:click={() => {
				generateMembersList($membersStore);
			}}>Print members list</button
		>
		<button on:click={() => generateSecretVotingList($membersStore)}>Pring counting lists</button>
		<button on:click={() => generateVotingCards($membersStore)}>Print voting lists</button>
	</div>
</div>
