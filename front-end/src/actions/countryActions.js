import superagent from 'superagent';

const countriesFetch = countries => ({
  type: 'COUNTRIES_FETCH',
  payload: countries,
});

const countryGet = country => ({
  type: 'COUNTRY_GET',
  payload: country,
});

const countryListGet = countryList => ({
  type: 'COUNTRY_LIST_GET',
  payload: countryList,
});

const countryCreate = country => ({
  type: 'COUNTRY_CREATE',
  payload: country,
});

const countryUpdate = country => ({
  type: 'COUNTRY_UPDATE',
  payload: country,
});

const countryDelete = country => ({
  type: 'COUNTRY_DELETE',
  payload: country,
});

const countriesExisting = countries => ({
  type: 'COUNTRIES_EXIST',
  payload: countries,
});

const countriesExistingFetch = () => (store) => {
  return superagent.get(`${GRAPHQL_API_URL}/countries/db`)
    .then((response) => {
      store.dispatch(countriesExisting(response.body));
      return response;
    });
};

const countryListGetRequest = () => (store) => {
  return superagent.get(`${REST_API_URL}/countries/cia`)
    .then((response) => {
      store.dispatch(countryListGet(response.body));
      return response;
    });
};

const countryGetRequest = country => (store) => {
  return superagent.get(`${GRAPHQL_API_URL}/country/${country}`)
    .then((response) => {
      store.dispatch(countryGet(response.body));
      return response;
    }); 
};

const countryCreateRequest = country => (store) => {
  delete country.countryNameDirty;
  delete country.countryNameError;
  return superagent.post(`${GRAPHQL_API_URL}/country`)
    .send(country)
    .then((response) => {
      store.dispatch(countryCreate(response.body));
      return response;
    });
};

const countryUpdateRequest = country => (store) => {
  return superagent.put(`${GRAPHQL_API_URL}/country/${country._id}`)
    .send(country)
    .then((response) => {
      store.dispatch(countryUpdate(response.body));
      return response;
    });
};

const countryDeleteRequest = country => (store) => {
  return superagent.post(`${GRAPHQL_API_URL}/country/${country._id}`)
    .then((response) => {
      store.dispatch(countryDelete(country));
      return response;
    });
};

export { 
  countriesFetch,
  countryGet,
  countryListGet,
  countryCreate,
  countryUpdate,
  countryDelete,
  countryGetRequest, 
  countryCreateRequest, 
  countryUpdateRequest, 
  countryDeleteRequest,
  countryListGetRequest,
  countriesExistingFetch,
};
