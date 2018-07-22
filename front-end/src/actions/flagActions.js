import superagent from 'superagent';
import * as routes from '../utils/routes';

const flagCreate = country => ({
  type: 'FLAG_CREATE',
  payload: country,
});

const flagCreateRequest = (flag, countryId) => (store) => {
  delete flag.flagUrlDirty;
  delete flag.flagUrlError;
  const { flagUrl } = flag;

  return superagent.post(`${API_URL}${routes.FLAG_ROUTE}`)
    .send({ flagUrl, countryId })
    .then((response) => {
      store.dispatch(flagCreate(response.body));
      return response;
    });
};

export { flagCreateRequest, flagCreate };
