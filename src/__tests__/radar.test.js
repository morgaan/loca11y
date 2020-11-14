const {
	isLocalCoordinate,
	isValidCoordinate
} = require('../radar');

describe('Radar', () => {

	describe('is able to determine if a location is local or not', () => {

		test('Domäne Dahlem Hofladen is local to Berlin center', () => {
			// Domäne Dahlem Hofladen
			expect(isLocalCoordinate({
				latitude: 52.45833,
				longitude: 13.28955
			})).toBe(true);
		});

		test('Paris center is not local to Berlin center', () => {
			// Paris
			expect(isLocalCoordinate({
				latitude: 48.8572,
				longitude: 2.3518
			})).toBe(false);
		});

		test('Location with invalid coordinates is considered not local to Berlin center', () => {

			// Wrongly formatted coordinate
			expect(isLocalCoordinate({
				toto: 48.8572
			})).toBe(false);

			// Null coordinate
			expect(isLocalCoordinate(null)).toBe(false);
		});
	});

	describe('is able to determine if a given coordinates are valid coordinates', () => {

		test('{latitude: 1, longitude: 2} is valid coordinate', () => {
			expect(isValidCoordinate({latitude: 1, longitude: 2})).toBe(true);
		});

		test('{latitude: 1} is not valid coordinate', () => {
			expect(isValidCoordinate({latitude: 1})).toBe(false);
		});

		test('[2, 1] is valid (GeoJSON) coordinate', () => {
			expect(isValidCoordinate([2, 1])).toBe(true);
		});

		test('[2] is not valid (GeoJSON) coordinate', () => {
			expect(isValidCoordinate([2])).toBe(false);
		});

		test('null is not valid coordinate', () => {
			expect(isValidCoordinate(null)).toBe(false);
		});

		test('undefined is not valid coordinate', () => {
			expect(isValidCoordinate(undefined)).toBe(false);
		});
	});

});
