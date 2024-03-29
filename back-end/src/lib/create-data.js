'use strict';

import logger from './logger';

const createCapitalData = (capital) => {
  logger.log(logger.INFO, 'Creating capital array');

  if (capital.includes(';')) return capital.split(';');
  return [capital];
};

const createCoordinatesData = (coordinatesLat, coordinatesLon) => {
  logger.log(logger.INFO, 'Creating capital coordinates array');
  if (!coordinatesLat && !coordinatesLon) return [null, null];

  const latArr = [0, 0];
  const lonArr = [0, 0];

  Object.keys(coordinatesLat).forEach((x) => {
    if (x === 'degrees') {
      latArr[0] = coordinatesLat[x];
      lonArr[0] = coordinatesLon[x];
    }
    if (x === 'minutes') {
      latArr[1] = coordinatesLat[x];
      lonArr[1] = coordinatesLon[x];
    }
    if (x === 'hemisphere') {
      if (coordinatesLat[x] === 'S') latArr[0] = -latArr[0];
      if (coordinatesLon[x] === 'W') lonArr[0] = -lonArr[0];
    }
  });

  return [latArr, lonArr];
};

const createIndependenceData = (independence) => {
  logger.log(logger.INFO, 'Creating independence data');

  let independenceData = '';
  if (independence && independence.date) {
    if (independence.note) {
      independenceData = `${independence.date} - ${independence.note}`;
    }
    independenceData = independence.date;
  }
  return independenceData;
};

export { createCapitalData, createCoordinatesData, createIndependenceData };
