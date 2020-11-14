const {
	getDistance,
} = require('geolib');

// Berlin
const kmZeroCoordinate = {
	latitude: 52.5170365,
	longitude: 13.3888599
};

const maxDistanceInKm = 50;

/**
 * Checks if the given coordinate is not further than the maxDistanceInKm from
 * the kmZeroCoordinate
 *
 * @param {Object} coordinate - A latitude/longitude pair.
 * @param {number} coordinate.latitude - Coordinate's latitude.
 * @param {number} coordinate.longitude - Coordinate's latitude.
 *
 * @returns {boolean}
 */
function isLocalCoordinate(coordinate) {
	let distance;

	if (coordinate && isValidCoordinate(coordinate)) {
		distance = getDistance(kmZeroCoordinate, coordinate);
	}

	if (typeof distance === 'number') {
		return distance/1000 <= maxDistanceInKm;
	}

	return false;
}

/**
 * Checks if the given coordinate is a valid latitude/longitude object.
 *
 * @param {Object} coordinate - A latitude/longitude pair.
 * @param {number} coordinate.latitude - Coordinate's latitude.
 * @param {number} coordinate.longitude - Coordinate's latitude.
 *
 * @returns {boolean}
 */
function isValidCoordinate(coordinate) {
	const {isValidCoordinate} = require('geolib');

	try {
		return isValidCoordinate(coordinate);
	} catch (_error) {
		return false;
	}
}

module.exports = {
	isLocalCoordinate,
	isValidCoordinate
}
