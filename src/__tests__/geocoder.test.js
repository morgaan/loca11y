const nock = require('nock');
const {
	geoCode
} = require('../geocoder');
const {
	isValidCoordinate
} = require('../radar');

const endpoint = process.env.OSM_GEOCODER;

describe('Geocoder', () => {
	it('generates coordinates out of matching address', async () => {
		const address = 'domäne dahlem';
		const scope = nock(endpoint)
			.get(`/search/${encodeURI(address)}`)
			.query({
				format: 'json',
				limit: '1'
			})
			.reply(200, {
				lat: '52.4591741',
				lon: '13.288581979518693'
			});
		
		const coordinates = await geoCode(address);

		expect(isValidCoordinate(coordinates)).toBe(true);

		scope.done();
	});

	it('generates non valid coordinates out of not matching address', async () => {
		const address = 'nowhere';
		const scope = nock(endpoint)
			.get(`/search/${encodeURI(address)}`)
			.query({
				format: 'json',
				limit: '1'
			})
			.reply(200, []);
		
		const coordinates = await geoCode(address);

		expect(isValidCoordinate(coordinates)).toBe(false);

		scope.done();
	});

	it('generates non valid coordinates out of not matching address', async () => {
		const address = 'nowhere';
		const scope = nock(endpoint)
			.get(`/search/${encodeURI(address)}`)
			.query({
				format: 'json',
				limit: '1'
			})
			.reply(500);
		
		const coordinates = await geoCode(address);

		expect(isValidCoordinate(coordinates)).toBe(false);

		scope.done();
	});
});

