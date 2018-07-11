import { _get, _post, _put } from '@lib/js/http';

let _prefix = '/agriculture';

export const getAgroTypeList = ({commit}, query) => {
  const url = `${_prefix}/region/type`;

  return _get({ url, query }, commit)
    .then((json) => {
        return Promise.resolve(json);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
};

export const appendAgroType = ({commit}, body) => {
    const url = `${_prefix}/region/type`;

    return _post({ url, body }, commit)
        .then((json) => {
            return Promise.resolve(json);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};

export const editAgroType = ({commit}, body) => {
    const url = `${_prefix}/region/type`;

    return _put({ url, body }, commit)
        .then((json) => {
            return Promise.resolve(json);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};



