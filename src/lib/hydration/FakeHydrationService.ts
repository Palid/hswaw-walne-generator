import type { MemberPOJO } from '$lib/model/Member';
import type { IHydrationService } from './IHydrationService';

const fakerData = [
	{ nickname: 'Susana1' },
	{ nickname: 'Ephraim.OReilly0' },
	{ nickname: 'Wayne35' },
	{ nickname: 'Leatha_Beier57' },
	{ nickname: 'Pauline.Fisher27' },
	{ nickname: 'Jonas.Kerluke11' },
	{ nickname: 'Leland_Koelpin47' },
	{ nickname: 'Jennings_Jerde' },
	{ nickname: 'Lorena_Hammes13' },
	{ nickname: 'Morton84' },
	{ nickname: 'Joany_Wiegand' },
	{ nickname: 'Kaylah_Batz' },
	{ nickname: 'Elvis.Zemlak' },
	{ nickname: 'Okey75' },
	{ nickname: 'Jovanny35' },
	{ nickname: 'Cesar.Paucek66' },
	{ nickname: 'Alanna.Legros63' },
	{ nickname: 'Krystina_Ruecker' },
	{ nickname: 'Camryn_Wolf' },
	{ nickname: 'Clotilde.Conn' },
	{ nickname: 'Jordon.Gislason67' },
	{ nickname: 'Sasha_Bins' },
	{ nickname: 'Arely_Bartoletti88' },
	{ nickname: 'Brenda.Crooks65' },
	{ nickname: 'Gia51' },
	{ nickname: 'Jess_Cartwright17' },
	{ nickname: 'Alexandro.Hickle98' },
	{ nickname: 'Marjorie55' },
	{ nickname: 'Vivianne.Frami89' },
	{ nickname: 'Margarete_Dicki25' },
	{ nickname: 'Enos.Jakubowski37' },
	{ nickname: 'Viola_Kuhic51' },
	{ nickname: 'Anthony_Toy44' },
	{ nickname: 'Alverta20' },
	{ nickname: 'Marta.Stamm' },
	{ nickname: 'Humberto14' },
	{ nickname: 'Jaren13' },
	{ nickname: 'Jon21' },
	{ nickname: 'Imelda20' },
	{ nickname: 'Tiara.Haley' },
	{ nickname: 'Hugh_Williamson' },
	{ nickname: 'Shanie41' },
	{ nickname: 'Mallie.Labadie37' },
	{ nickname: 'Edmond68' },
	{ nickname: 'Johnathon9' },
	{ nickname: 'Josie70' },
	{ nickname: 'Macie.Quigley' },
	{ nickname: 'Dean_Schimmel21' },
	{ nickname: 'Helene_Rempel97' },
	{ nickname: 'Sarai_Adams63' },
	{ nickname: 'Landen33' },
	{ nickname: 'Natalia_Kirlin5' },
	{ nickname: 'Germaine97' },
	{ nickname: 'Julia.Moore53' },
	{ nickname: 'Jany_VonRueden97' },
	{ nickname: 'Pablo.Klocko' },
	{ nickname: 'Wilhelm38' },
	{ nickname: 'Dax27' },
	{ nickname: 'Veronica48' },
	{ nickname: 'Israel.Waelchi' },
	{ nickname: 'Celia_Torp90' },
	{ nickname: 'Marlin_Vandervort36' },
	{ nickname: 'Ines.Glover61' },
	{ nickname: 'Lorenz55' },
	{ nickname: 'Efrain47' },
	{ nickname: 'Maribel.Stanton' },
	{ nickname: 'Jonas.Herman' },
	{ nickname: 'Colten.Weimann42' },
	{ nickname: 'Johann13' },
	{ nickname: 'Angela_Pfannerstill18' },
	{ nickname: 'Lavonne_Lehner' },
	{ nickname: 'Florence.Nitzsche40' },
	{ nickname: 'Allie58' },
	{ nickname: 'Anne5' },
	{ nickname: 'Cheyenne1' },
	{ nickname: 'Terry.Hirthe62' },
	{ nickname: 'Mollie.Hand39' },
	{ nickname: 'Serena18' },
	{ nickname: 'Angel54' },
	{ nickname: 'Armando_Bogan' },
	{ nickname: 'Cornelius77' },
	{ nickname: 'Jazlyn_Renner' },
	{ nickname: 'Lawrence.Ziemann' },
	{ nickname: 'Spencer_Ledner' },
	{ nickname: 'Casimir_Spencer' },
	{ nickname: 'King_Gorczany' },
	{ nickname: 'Shakira_Pollich' },
	{ nickname: 'Chaim.Gutmann' },
	{ nickname: 'Carmela_Bayer' },
	{ nickname: 'Manuel.Stoltenberg59' },
	{ nickname: 'Karli.Schimmel' },
	{ nickname: 'Paolo56' },
	{ nickname: 'Steve6' },
	{ nickname: 'Coby.Skiles33' },
	{ nickname: 'Jovani.Lowe51' },
	{ nickname: 'Ernestine_Stokes' },
	{ nickname: 'Roosevelt.Vandervort82' },
	{ nickname: 'Heath.Kovacek23' },
	{ nickname: 'Mikayla.Boyer98' },
	{ nickname: 'Ivah45' }
];

class FakeHydrationService implements IHydrationService {
	#getData() {
		return [...fakerData].map((x) => ({
			nickname: x.nickname,
			legalName: Math.random() >= 0.5 ? x.nickname : undefined
		}));
	}

	#sortData(data: Pick<MemberPOJO, 'nickname' | 'legalName'>[]) {
		// Sort alphabetically
		data.sort(function (a, b) {
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
	}

	hydrate(): Promise<MemberPOJO[]> {
		const data = this.#getData();
		this.#sortData(data);
		return Promise.resolve(fakerData);
	}
}

export default FakeHydrationService;
