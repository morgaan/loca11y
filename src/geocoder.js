const fetch = require('node-fetch');

const endpoint = process.env.OSM_GEOCODER;

/**
 * Converts a given address into a coordinate.
 *
 * @param {string} address - Address to be converted
 * @returns {object} A latitude/longitude pair.
 */
async function geoCode(address) {
	try {
		const nominatimPayload = await fetch(`${endpoint}/search/${encodeURI(address)}?format=json&limit=1`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json; charset=utf-8'},
		}).then(async response => {
			const data = await response.json();

			// Uncomment to dump the data in the console.
			// console.log(JSON.stringify(data));

			return data;
		});

		const {lat, lon} = nominatimPayload;

		return {
			latitude: Number(lat),
			longitude: Number(lon)
		};
	}
	catch (error) {
		// console.error(`Could not get coordinates for ${address}`, error);
		return null;
	};
}

module.exports = {
	geoCode
};
