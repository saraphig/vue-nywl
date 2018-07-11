import { _get, _post } from "@lib/js/http";

let _prefix = '';
if(process.env.NODE_ENV == 'production') {
  _prefix = `/admin`
}
// 基本资料
export const fetchBasicData = ({ commit }, query) => {
    const url = `/auth-server/user`;

    return _get({ url, query }, commit)
        .then(json => {
            if (json.error == 0) {
                //
                return Promise.resolve(json.data);
            }
            return Promise.reject(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const fetchTestGet = ({ commit }, query) => {
    const url = `/home`;

    return _get({ url, query }, commit)
        .then(json => {
            if (json.error == 0) {
                //
                return Promise.resolve(json.data);
            }
            return Promise.reject(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};


export const search = ({ commit }, query) => {
    const url = `/search`;
    return _get({ url, query }, commit)
        .then(json => {
            return Promise.resolve(json);
            if (json.error == 0) {
                return Promise.resolve(json.data);
            }
            return Promise.reject(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const fetchTestPost = ({ commit }, body) => {
    const url = `/home`;

    return _post({ url, body }, commit)
        .then(json => {
            if (json.error == 0) {
                return Promise.resolve(json.data);
            }
            return Promise.reject(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const changeHomeInfo = ({ commit }, info) => {
    commit("CHANGE_HOME_INFO", info);
};
