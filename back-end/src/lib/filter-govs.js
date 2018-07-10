'use strict';

import logger from './logger';

const filterDemocracies = (systems) => {
  logger.log(logger.INFO, 'Filtering system data for democracies');
  const democracies = systems.filter(country => country.includes('democracy'))
    .map((x) => {
      const split = x.split(' ');
      return split;
    }).map((y) => {
      let index = 0;
      y.forEach((z, i) => {
        switch (z) {
          case 'democracy':
            index = i + 1;
            return index;
          case 'democracy;':
            index = i + 1;
            return index;
          default: 
            return null;
        }
      }, 0);
      return y.slice(0, index).join(' ');
    });

  const parsedDemocracies = {};
  democracies.forEach((x) => {
    const parliamentary = x.includes('parliamentary');
    const presidential = x.includes('presidential');

    if (parliamentary) {
      if (!parsedDemocracies['parliamentary democracy']) {
        parsedDemocracies['parliamentary democracy'] = 1;
      } else {
        parsedDemocracies['parliamentary democracy'] += 1;
      }
    }
      
    if (presidential) {
      if (!parsedDemocracies['presidential democracy']) {
        parsedDemocracies['presidential democracy'] = 1;
      } else {
        parsedDemocracies['presidential democracy'] += 1;
      }
    }
  });
  return parsedDemocracies;
};

const filterDictatorships = (systems) => {
  const dictatorships = systems.filter(country => country.includes('dictatorship')).map((x) => {
    const split = x.split(' ');
    return split;
  }).map((y) => {
    let index = 0;
    y.forEach((z, i) => {
      if (z.includes('dictatorship')) {
        index = i + 1;
        return index;
      }
      return null;  
    }, 0);
    return y.slice(0, index).join(' ');
  });

  const parsedDictatorships = {};
  dictatorships.forEach(() => {
    if (!parsedDictatorships.dictatorship) {
      parsedDictatorships.dictatorship = 1;
    } else {
      parsedDictatorships.dictatorship += 1;
    }
  });
  return parsedDictatorships;
};

const filterCommunism = (systems) => {
  const communism = systems.filter(country => country.includes('communist')).map((x) => {
    const split = x.split(' ');
    return split;
  }).map((y) => {
    let index = 0;
    y.forEach((z, i) => {
      if (z.includes('communist')) {
        index = i + 2;
        return index;
      }
      return null;  
    }, 0);
    return y.slice(0, index).join(' ');
  });

  const parsedCommunists = {};
  communism.forEach(() => {
    if (!parsedCommunists.communism) {
      parsedCommunists.communism = 1;
    } else {
      parsedCommunists.communism += 1;
    }
  });
  return parsedCommunists;
};

export { filterDemocracies, filterDictatorships, filterCommunism };
