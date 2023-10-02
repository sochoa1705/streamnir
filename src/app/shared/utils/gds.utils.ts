import { environment } from "src/environments/environment";

export function getGdsName(gdsId: number): string {
	let gdsName = '';

	switch (gdsId) {
		case environment.GDS.AMADEUS:
			gdsName = 'Amadeus';
			break;
		case environment.GDS.AMADEUS_NDC:
			gdsName = 'Amadeus NDC';
			break;
		case environment.GDS.SABRE:
			gdsName = 'Sabre';
			break;
		case environment.GDS.KIU:
			gdsName = 'Kiu';
			break;
		case environment.GDS.VIVAAIR:
			gdsName = 'VivaAir';
			break;
		case environment.GDS.KIWI:
			gdsName = 'Kiwi';
			break;
		case environment.GDS.SKY:
			gdsName = 'Sky';
			break;
		case environment.GDS.MULTITICKET:
			gdsName = 'Multiticket';
			break;
		case environment.GDS.LATAM:
			gdsName = 'Latam';
			break;
	}

	return gdsName;
}
