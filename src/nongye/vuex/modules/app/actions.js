import { _get, _post } from '@lib/js/http';

let _prefix = `/auth-server`;

export const fetchUserInfo = ({commit}, query) => {
    const url = `${_prefix}/user/getUserByToken`;

  return _get({ url, query }, commit)
    .then((json) => {
      return Promise.resolve(json);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
};


