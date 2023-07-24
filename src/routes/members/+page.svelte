<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	if (browser) {
		if ($page.route.id === '/members') {
			goto('/members/in-person');
		}
	}
</script>
