import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import FakeHydrationService from '$lib/hydration/FakeHydrationService';
import type { IHydrationService } from '$lib/hydration/IHydrationService';
import { LdapHydrationService } from '$lib/hydration/LdapHydrationService.js';
import invariant from 'tiny-invariant';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ route, locals }) {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(302, '/auth/signin');
	}

	let ldap = true;
	try {
		invariant(
			env.SERVICE_USER_NAME,
			'SERVICE_USER_NAME is not defined, reverting to fake hydration'
		);
		invariant(
			env.SERVICE_USER_PASSWORD,
			'SERVICE_USER_PASSWORD is not defined, reverting to fake hydration'
		);
	} catch (e) {
		ldap = false;
	}

	let hydrationService: IHydrationService;
	if (ldap) {
		hydrationService = new LdapHydrationService();
	} else {
		hydrationService = new FakeHydrationService();
	}

	const members = await hydrationService.hydrate();

	return {
		members
	};
}
