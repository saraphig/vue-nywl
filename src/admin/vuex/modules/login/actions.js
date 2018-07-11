import { _get, _post, _put } from '@lib/js/http';

let _prefix = '/auth-server';

export const login = ({commit}, body) => {
  const url = `${_prefix}/user/login`;

  return _post({ url, body }, commit)
    .then((json) => {
        return Promise.resolve(json);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
};

export const logout = ({commit}, body) => {
    const url = `${_prefix}/user/logout`;

    return _put({ url, body }, commit)
        .then((json) => {
            return Promise.resolve(json);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};

export const existsByCode = ({commit}, query) => {
    const url = `${_prefix}/user/existsByCode`;

    return _get({ url, query }, commit)
        .then((json) => {
            return Promise.resolve(json);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};

export const sendVerificationCode = ({commit}, query) => {
  const url = `${_prefix}/user/sendCode`;

  return _get({ url, query }, commit)
    .then((json) => {
        return Promise.resolve(json);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
};

export const verification = ({commit}, body) => {
  const url = `${_prefix}/user/verifyCode`;

  return _post({ url, body }, commit)
    .then((json) => {
        return Promise.resolve(json);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
};

export const setPassword = ({commit}, body) => {
  const url = `${_prefix}/user/setPassword`;

  return _post({ url, body }, commit)
    .then((json) => {
        return Promise.resolve(json);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
};

export const modifyPassword = ({commit}, body) => {
  const url = `${_prefix}/user/modifyPassword`;

  return _post({ url, body }, commit)
    .then((json) => {
        return Promise.resolve(json);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
};
