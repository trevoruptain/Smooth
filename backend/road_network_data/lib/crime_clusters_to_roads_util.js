const calcCrimeRating = roadCrimes => {
  let rating = 0;

  roadCrimes.forEach(crime => {
    rating += crime.crimeRating;
  });

  return rating;
};

const latToMeters = lat => {
  return 110992.18 * lat;
};

const lngToMeters = lng => {
  return 88101.33 * lng;
};

const distance = (pos1, pos2) => {
  return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
};

const createBounds = (pos1, pos2) => {
  const isInBound = (x, y) => {
    return (
      x >= Math.min(pos1.x, pos2.x) &&
      y >= Math.min(pos1.y, pos2.y) &&
      (x <= Math.max(pos1.x, pos2.x) && y <= Math.max(pos1.y, pos2.y))
    );
  };
  return isInBound;
};

const intersectionsById = intersections => {
  const byId = {};
  intersections.forEach(intersection => {
    byId[intersection.id] = intersection;
  });
  return byId;
};

module.exports = {
  calcCrimeRating: calcCrimeRating,
  CRIME_RADIUS: 80, // in meters
  latToMeters: latToMeters,
  lngToMeters: lngToMeters,
  distance: distance,
  createBounds: createBounds,
  intersectionsById: intersectionsById
};
