import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ route }) {
	if (route.id === '/') {
		throw redirect(308, '/members/in-person');
	}
}
