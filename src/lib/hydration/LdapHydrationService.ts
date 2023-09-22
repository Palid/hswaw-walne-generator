import { env } from '$env/dynamic/private';
import { Client, type Entry } from 'ldapts';
import type { IHydrationService } from './IHydrationService';
import type { MemberPOJO } from '$lib/model/Member';

export class LdapHydrationService implements IHydrationService {
	async #connect(): Promise<Client> {
		const client = new Client({
			url: 'ldaps://ldap.hackerspace.pl',
			timeout: 0,
			connectTimeout: 0,
			tlsOptions: {
				minVersion: 'TLSv1.2'
			},
			strictDN: false
		});
		await client.bind(
			`cn=${env.SERVICE_USER_NAME},ou=Services,dc=hackerspace,dc=pl`,
			env.SERVICE_USER_PASSWORD
		);
		return client;
	}

	#formatData(data: Entry[]): Pick<MemberPOJO, 'nickname' | 'legalName'>[] {
		const mappedResults = data.map((x) => ({
			nickname: x.uid.toString(),
			legalName: x.cn.toString()
		}));

		// Sort alphabetically
		mappedResults.sort(function (a, b) {
			const aLower = a.nickname.toLowerCase();
			const bLower = b.nickname.toLowerCase();
			if (aLower < bLower) {
				return -1;
			}
			if (aLower > bLower) {
				return 1;
			}
			return 0;
		});
		return mappedResults;
	}

	async hydrate() {
		const client = await this.#connect();
		const search = client.search('ou=People,dc=hackerspace,dc=pl', {
			attributes: ['cn', 'uid'],
			filter: [
				'(|',
				'(memberOf=cn=starving,ou=Group,dc=hackerspace,dc=pl)',
				'(memberOf=cn=fatty,ou=Group,dc=hackerspace,dc=pl)',
				'(memberOf=cn=potato,ou=Group,dc=hackerspace,dc=pl)',
				')'
			].join('')
		});
		try {
			const results = await search;
			return this.#formatData(results.searchEntries);
		} catch (e) {
			console.error('LDAP query failed');
			return Promise.reject(e);
		}
	}
}
