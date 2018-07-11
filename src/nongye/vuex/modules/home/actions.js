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

//---------------------------------------------------------------------------------------------------------------------------------
//获取天气接口,一周天气数据
export const fetchWeatherGet = ({ commit }, query) => {
    //const url = `/admin-service/admin/weather`;//天气数据 传入 cityName="厦门"
    //const url = `/gaoyou/weather/info`;//天气数据 传入 cityName="厦门"
    const url = `/weather/v2/weathers`;//天气数据 传入 cityNam="厦门"
    console.log(url);
    //query = { city:"深圳" } //常州

    return _get({ url, query }, commit)
        .then(json => {
            return Promise.resolve(json); //JSON.parse(json)
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
};
//---------------------------------------------------------------------------------------------------------------------------------
//获取当前天气
export const fetchCuttentWeatherGet = ({ commit }, query) => {
    const url = `/weather/v2/weathers/currentweather`;//天气数据 传入 cityName="厦门"
    console.log(url);
    //query = { city:"深圳" } //常州

    return _get({ url, query }, commit)
        .then(json => {
            return Promise.resolve(json); //JSON.parse(json)
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
};
//---------------------------------------------------------------------------------------------------------------------------------


//获取设备统计和告警统计
export const fetchDeviceCountGet = ({ commit }, query) => {
    //let url = `/admin-service/admin/devices/count`;   //设备统计和告警统计 
    let url = `/agriculture/devices/count`;   //设备统计和告警统计 

    if (query != undefined && query.region != undefined) {
        url += ("/" + query.region);
        console.log(url);
    }
    return _get({ url, query }, commit)
        .then(json => {
            console.log(typeof json);            
            return Promise.resolve(json); //JSON.parse(json)
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
//获取主机设备占比数据
export const fetchDeviceScaleGet = ({ commit }, query) => {
    //let url = `/admin-service/admin/devices/count`;   //设备占比 
    let url = `/agriculture/devices/counts`;   //设备占比 

    if (query != undefined && query.region != undefined) {
        url += ("/" + query.region);
        console.log(url);
    }
    return _get({ url, query }, commit)
        .then(json => {
            console.log(typeof json);            
            return Promise.resolve(json); //JSON.parse(json)
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

//获取主机列表
export const fetchDeviceListGet = ({ commit }, query) => {
    //const url = `/admin-service/admin/devices/list`;   
    const url = `/agriculture/devices/list`;   

    return _get({ url, query }, commit)
        .then(json => {
            return Promise.resolve(json); //JSON.parse(json)
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
//获取菜单权限列表
export const getUserMenu = ({ commit }, query) => {
    const url = `/devicerights/v1/menus`;   

    return _get({ url, query }, commit)
        .then(json => {
            return Promise.resolve(json); //JSON.parse(json)
        })
        .catch(error => {
            return Promise.reject(error);
        });
};