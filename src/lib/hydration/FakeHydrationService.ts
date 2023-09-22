import type { ServerModel } from '$lib/model/Member';
import type { IHydrationService } from './IHydrationService';

const fakerData = [
	{ userName: 'Susana1' },
	{ userName: 'Ephraim.OReilly0' },
	{ userName: 'Wayne35' },
	{ userName: 'Leatha_Beier57' },
	{ userName: 'Pauline.Fisher27' },
	{ userName: 'Jonas.Kerluke11' },
	{ userName: 'Leland_Koelpin47' },
	{ userName: 'Jennings_Jerde' },
	{ userName: 'Lorena_Hammes13' },
	{ userName: 'Morton84' },
	{ userName: 'Joany_Wiegand' },
	{ userName: 'Kaylah_Batz' },
	{ userName: 'Elvis.Zemlak' },
	{ userName: 'Okey75' },
	{ userName: 'Jovanny35' },
	{ userName: 'Cesar.Paucek66' },
	{ userName: 'Alanna.Legros63' },
	{ userName: 'Krystina_Ruecker' },
	{ userName: 'Camryn_Wolf' },
	{ userName: 'Clotilde.Conn' },
	{ userName: 'Jordon.Gislason67' },
	{ userName: 'Sasha_Bins' },
	{ userName: 'Arely_Bartoletti88' },
	{ userName: 'Brenda.Crooks65' },
	{ userName: 'Gia51' },
	{ userName: 'Jess_Cartwright17' },
	{ userName: 'Alexandro.Hickle98' },
	{ userName: 'Marjorie55' },
	{ userName: 'Vivianne.Frami89' },
	{ userName: 'Margarete_Dicki25' },
	{ userName: 'Enos.Jakubowski37' },
	{ userName: 'Viola_Kuhic51' },
	{ userName: 'Anthony_Toy44' },
	{ userName: 'Alverta20' },
	{ userName: 'Marta.Stamm' },
	{ userName: 'Humberto14' },
	{ userName: 'Jaren13' },
	{ userName: 'Jon21' },
	{ userName: 'Imelda20' },
	{ userName: 'Tiara.Haley' },
	{ userName: 'Hugh_Williamson' },
	{ userName: 'Shanie41' },
	{ userName: 'Mallie.Labadie37' },
	{ userName: 'Edmond68' },
	{ userName: 'Johnathon9' },
	{ userName: 'Josie70' },
	{ userName: 'Macie.Quigley' },
	{ userName: 'Dean_Schimmel21' },
	{ userName: 'Helene_Rempel97' },
	{ userName: 'Sarai_Adams63' },
	{ userName: 'Landen33' },
	{ userName: 'Natalia_Kirlin5' },
	{ userName: 'Germaine97' },
	{ userName: 'Julia.Moore53' },
	{ userName: 'Jany_VonRueden97' },
	{ userName: 'Pablo.Klocko' },
	{ userName: 'Wilhelm38' },
	{ userName: 'Dax27' },
	{ userName: 'Veronica48' },
	{ userName: 'Israel.Waelchi' },
	{ userName: 'Celia_Torp90' },
	{ userName: 'Marlin_Vandervort36' },
	{ userName: 'Ines.Glover61' },
	{ userName: 'Lorenz55' },
	{ userName: 'Efrain47' },
	{ userName: 'Maribel.Stanton' },
	{ userName: 'Jonas.Herman' },
	{ userName: 'Colten.Weimann42' },
	{ userName: 'Johann13' },
	{ userName: 'Angela_Pfannerstill18' },
	{ userName: 'Lavonne_Lehner' },
	{ userName: 'Florence.Nitzsche40' },
	{ userName: 'Allie58' },
	{ userName: 'Anne5' },
	{ userName: 'Cheyenne1' },
	{ userName: 'Terry.Hirthe62' },
	{ userName: 'Mollie.Hand39' },
	{ userName: 'Serena18' },
	{ userName: 'Angel54' },
	{ userName: 'Armando_Bogan' },
	{ userName: 'Cornelius77' },
	{ userName: 'Jazlyn_Renner' },
	{ userName: 'Lawrence.Ziemann' },
	{ userName: 'Spencer_Ledner' },
	{ userName: 'Casimir_Spencer' },
	{ userName: 'King_Gorczany' },
	{ userName: 'Shakira_Pollich' },
	{ userName: 'Chaim.Gutmann' },
	{ userName: 'Carmela_Bayer' },
	{ userName: 'Manuel.Stoltenberg59' },
	{ userName: 'Karli.Schimmel' },
	{ userName: 'Paolo56' },
	{ userName: 'Steve6' },
	{ userName: 'Coby.Skiles33' },
	{ userName: 'Jovani.Lowe51' },
	{ userName: 'Ernestine_Stokes' },
	{ userName: 'Roosevelt.Vandervort82' },
	{ userName: 'Heath.Kovacek23' },
	{ userName: 'Mikayla.Boyer98' },
	{ userName: 'Ivah45' }
].map(({ userName }) => ({
	nickname: userName
}));

// Sort alphabetically
fakerData.sort(function (a, b) {
	if (a < b) {
		return -1;
	}
	if (a > b) {
		return 1;
	}
	return 0;
});

class FakeHydrationService implements IHydrationService {
	authorize(): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	hydrate(): Promise<ServerModel[]> {
		return Promise.resolve(fakerData);
	}
}

export default FakeHydrationService;
