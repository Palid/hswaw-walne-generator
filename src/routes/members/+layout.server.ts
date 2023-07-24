import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ route }) {
	const children = route.id.split('/');
	if (children.length > 2) {
		return;
	}
	if (route.id === '/members') {
		throw redirect(308, '/members/in-person');
	}
}
