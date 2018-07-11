import { _get, _post, _delete ,_put} from "@lib/js/http";

let _prefix = `/agriculture`;

export const fetchAreaList = ({ commit }, query) => {
    const url = `${_prefix}/regions`;

    return _get({ url, query }, commit)
        .then(json => {
        	return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const Areadel = ({ commit }, query) => {
    let url = `${_prefix}/region/${query.id}`;
    let _query = '?';
    for(let _id of query.id) {
        _query += `id=${_id}&`;
    }
    url = url + _query.replace(/&$/, '');

    return _delete({ url }, commit)
        .then(json => {
            return Promise.resolve(json.data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
//export const getSubDatas = ({ commit }, query) => {
//  const url = `${_prefix}/region/datapoints`;
//  return _get({ url, query }, commit)
//      .then(json => {
//          return Promise.resolve(json);
//          if (json.error == 0) {
//              return Promise.resolve(json.data);
//          }
//          return Promise.reject(json);
//      })
//      .catch(error => {
//          return Promise.reject(error);
//      });
//};

export const getAdminSubDatas = ({ commit }, query) => {
    //const url = `${_prefix}/admin/devices/query`;
    const url = `${_prefix}/devices/query`;
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
export const getAreaInfo = ({ commit }, query) => {
    const url = `${_prefix}/region/${query.id}`;
    return _get({ url, query }, commit)
        .then(json => {
			return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const updateArea = ({ commit }, body) => {
    const url = `${_prefix}/region`;
    return _put({ url, body}, commit)
         .then(json => {
			return Promise.resolve(json.data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const addArea = ({ commit }, body) => {
    const url = `${_prefix}/region`;
    return _post({ url, body }, commit)
        .then(json => {
			return Promise.resolve(json.data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};