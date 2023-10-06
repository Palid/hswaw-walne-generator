import type { OAuth2Config, OAuthUserConfig } from '@auth/core/providers/oauth';
import type { TokenSet } from '@auth/core/types';
import { SvelteKitAuth } from '@auth/sveltekit';
import { env } from '$env/dynamic/private';

type HSWawProfile = {
	username: string;
	email: string;
	phone: string | null;
	personal_email: string | null;
	gecos: string | null;
};

interface HSWawOauthOptions extends OAuthUserConfig<HSWawProfile> {
	clientId: string;
	clientSecret: string;
}

interface HSWawOauthConfig extends OAuth2Config<HSWawProfile> {
	options: HSWawOauthOptions;
}

function getHswawOauthConfig(): OAuth2Config<HSWawProfile> {
	const config: HSWawOauthConfig = {
		id: 'hswaw',
		name: 'hswaw',
		type: 'oauth',
		checks: ['state'],
		authorization: {
			url: 'https://sso.hackerspace.pl/oauth/authorize',
			params: {
				scope: 'profile:read'
			}
		},
		token: 'https://sso.hackerspace.pl/oauth/token',
		userinfo: {
			url: 'https://sso.hackerspace.pl/api/1/profile',
			async request({ tokens, provider }: { tokens: TokenSet; provider: any }) {
				const profile = await fetch(provider.userinfo.url as URL, {
					headers: {
						Authorization: `Bearer ${tokens.access_token}`,
						'User-Agent': 'walne-authjs'
					}
				}).then(async (res) => await res.json());
				return profile;
			}
		},
		profile(profile) {
			return {
				id: profile.username,
				name: profile.username,
				email: profile.email
			};
		},
		style: {
			logo: '/favicon.png',
			logoDark: '/favicon.png',
			bg: '#fff',
			bgDark: '#24292f',
			text: '#000',
			textDark: '#fff'
		},
		options: {
			clientId: env.HSWAW_AUTH_CLIENT_ID ?? '',
			clientSecret: env.HSWAW_AUTH_CLIENT_SECRET ?? ''
		}
	};
	return config;
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = ({ event, resolve }) => {
	if (env.NODE_ENV === 'development' && env.FAKE_SESSION) {
		return resolve({
			...event,
			locals: {
				getSession() {
					return JSON.parse(env.FAKE_SESSION ?? '');
				}
			}
		});
	}
	return SvelteKitAuth({
		providers: [getHswawOauthConfig()],
		// debug: true,
		trustHost: true,
		redirectProxyUrl: env.REDIRECT_PROXY_URL
	})({ event, resolve });
};
