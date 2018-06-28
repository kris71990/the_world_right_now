'use strict';

import Country from '../../models/country';
import data from '../../../data.json';

const createCountryMock = (update) => {
  const mock = {};
  mock.request = {
    countryName: 'benin',
  };

  return Country.create(mock.request.countryName)
    .then((created) => {
      mock.country = created;
      mock.country.lastUpdated = data.countries[mock.request.countryName].metadata.date;

      if (update) {
        mock.country.lastUpdated = 'test';
      }

      created.save();
      return mock;
    });
};

const removeCountryMock = () => Country.remove({});

export { createCountryMock, removeCountryMock };

