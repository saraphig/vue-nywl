import { _get, _post, _delete ,_put} from "@lib/js/http";

let _prefix = ``;
export const fetchEquipmentList = ({ commit }, query) => {
    const url = `${_prefix}/agriculture/devices/query`;
		//const url = `table`;
    return _get({ url, query }, commit)
      .then(json => {
      	return Promise.resolve(json);
      })
      .catch(error => {
          return Promise.reject(error);
      });
};

export const fetchMonitorAreaGet = ({ commit }, query) => {
    const url = `${_prefix}/agriculture/regions`;
    return _get({ url, query }, commit)
        .then(json => {
            return Promise.resolve(json); //JSON.parse(json)
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const getEquipmenInfo = ({ commit }, query) => {
    const url = `${_prefix}/agriculture/device/${query.id}`;

    console.log(url);
    query = {};
    return _get({ url, query }, commit)
        .then(json => {
            console.log("getEquipmenInfo:json");
            console.log(json);
			return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
export const updateEquipment = ({ commit }, body) => {
    const url = `${_prefix}/agriculture/device/update`;

    console.log("updateEquipment");
    console.log(url);
    console.log(body);

    return _put({ url, body}, commit)
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
export const getSubDatas = ({ commit }, query) => {
    const url = `${_prefix}/region/datapoints`;
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
