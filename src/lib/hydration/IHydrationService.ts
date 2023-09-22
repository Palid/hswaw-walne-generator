import type { ServerModel } from '$lib/model/Member';

export interface IHydrationService {
	authorize(): Promise<boolean>;
	hydrate(): Promise<ServerModel[]>;
}
