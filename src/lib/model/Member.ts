export interface ServerModel {
	readonly nickname: string;
	readonly legalName?: string;
	readonly voting: boolean;
	readonly inPerson: boolean;
	readonly candidating: boolean;
}

export class Member implements ServerModel {
	#_voting = false;
	/**
	 * If inPerson is true, then person did not need pass their power to vote to someone else
	 * due to not being able to be on the voting in person.
	 * If it's false, then someone is voting for this person.
	 */
	#_inPerson = false;

	public candidating = false;
	constructor(public readonly nickname: string, public readonly legalName?: string) {}

	public get voting() {
		return this.#_voting;
	}
	public set voting(value) {
		this.#_voting = value;
	}

	public get inPerson() {
		return this.#_inPerson;
	}
	public set inPerson(value) {
		this.#_voting = value;
		this.#_inPerson = value;
	}

	public toJSON() {
		return {
			legalName: this.legalName,
			nickname: this.nickname,
			voting: this.voting,
			inPerson: this.inPerson,
			candidating: this.candidating
		};
	}

	public static fromJSON(data: ServerModel): Member {
		const member = new Member(data.nickname, data.legalName);
		if (data.inPerson) {
			member.inPerson = data.inPerson;
		} else if (data.voting) {
			member.voting = data.voting;
		}
		member.candidating = data.candidating;
		return member;
	}
}
