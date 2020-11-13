const {
	isLocalCoordinates
} = require('../radar');

describe('Radar', () => {

	describe('is able to determine if a location is local or not', () => {

		test('Domäne Dahlem Hofladen is local to Berlin center', () => {
			// Domäne Dahlem Hofladen
			expect(isLocalCoordinates({
				latitude: 52.45833,
				longitude: 13.28955
			})).toBe(true);
		});

		test('Paris center is not local to Berlin center', () => {
			// Paris
			expect(isLocalCoordinates({
				latitude: 48.8572,
				longitude: 2.3518
			})).toBe(false);
		});

		test('Location with invalid coordinates is considered not local to Berlin center', () => {

			// Wrongly formatted coordinates
			expect(isLocalCoordinates({
				toto: 48.8572
			})).toBe(false);

			// Null coordinates
			expect(isLocalCoordinates(null)).toBe(false);
		});
	});

});
