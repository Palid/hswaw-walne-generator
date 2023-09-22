import type { MemberPOJO } from '$lib/model/Member';

export interface IHydrationService {
	hydrate(): Promise<MemberPOJO[]>;
}
