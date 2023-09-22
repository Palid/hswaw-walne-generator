import { browser } from '$app/environment';
import { Member, type ServerModel } from '$lib/model/Member';
import { getContext } from 'svelte';
import { writable } from 'svelte/store';

export function makeStore(members: ServerModel[]): ReturnType<typeof writable<Member[]>> {
	const mappedNicks: Member[] = members.map(({ nickname }) => new Member(nickname));
	const store = writable(mappedNicks);
	if (browser) {
		if (localStorage) {
			const lastUpdate = Number.parseInt(
				localStorage.getItem('lastUpdateTime') ?? '0'.toString(),
				10
			);
			// if >= 24h elapsed, clean the users cache.
			const twenty_four_hours = 1000 * 60 * 24;
			if (Date.now() >= lastUpdate + twenty_four_hours) {
				localStorage.setItem('members', '[]');
			}
			const items = localStorage.getItem('members') ?? '[]';
			try {
				const parsed: ReturnType<Member['toJSON']>[] = JSON.parse(items);
				if (parsed.length > 0) {
					const mappedNicks = parsed.map((data) => {
						return Member.fromJSON(data);
					});
					store.set(mappedNicks);
				}
			} catch (err) {
				// ignore
			}
		}
		store.subscribe((data: Member[]) => {
			if (localStorage) {
				localStorage.setItem('lastUpdateTime', Date.now().toString());
				const serialized = JSON.stringify(data, function replacer(key, value) {
					if (value instanceof Map) {
						return Array.from(value.entries()); // or with spread: value: [...value]
					} else {
						return value;
					}
				});

				localStorage.setItem('members', serialized);
			}
		});
	}

	return store;
}

export function getMembersStoreContext() {
	return getContext<ReturnType<typeof writable<Member[]>>>('members');
}
