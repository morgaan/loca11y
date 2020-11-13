const {
	getDistance,
	isValidCoordinate
} = require('geolib');

// Berlin
const kmZeroCoordinates = {
	latitude: 52.5170365,
	longitude: 13.3888599
};

const maxDistanceInKm = 50;

function isLocalCoordinates(coordinates) {
	let distance;

	if (coordinates && isValidCoordinate(coordinates)) {
		distance = getDistance(kmZeroCoordinates, coordinates);
	}

	if (typeof distance === 'number') {
		return distance/1000 <= maxDistanceInKm;
	}

	return false;
}

module.exports = {
	isLocalCoordinates
}
