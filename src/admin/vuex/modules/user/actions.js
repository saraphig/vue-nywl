import { _get, _post, _patch } from '@lib/js/http';

let _prefix = '/auth-server';

export const getUserList = ({commit}, query) => {
  const url = `${_prefix}/user/getPageList`;

  return _get({ url, query }, commit)
    .then((json) => {
        return Promise.resolve(json);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
};

export const appendUser = ({commit}, body) => {
    const url = `${_prefix}/user`;

    return _post({ url, body }, commit)
        .then((json) => {
            return Promise.resolve(json);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};

export const setUserStatus = ({commit}, body) => {
    const url = `${_prefix}/user/${body.userId}`;

    return _patch({ url, body }, commit)
        .then((json) => {
            return Promise.resolve(json);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};



