import {
    _get,
    _post,
    _delete,
    _put
} from "@lib/js/http";

let _prefix = `/agriculture`;

export const fetchSystemSetting = ({
    commit
}, query) => {
    const url = `/auth-server/oplog/getPageList`;

    return _get({
            url,
            query
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const fetchAreaList = ({
    commit
}, query) => {
    const url = `${_prefix}/regions`;

    return _get({
            url,
            query
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const Areadel = ({
    commit
}, query) => {
    let url = `${_prefix}/region/${query.id}`;
    let _query = '?';
    for (let _id of query.id) {
        _query += `id=${_id}&`;
    }
    url = url + _query.replace(/&$/, '');

    return _delete({
            url
        }, commit)
        .then(json => {
            return Promise.resolve(json.data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const getAreaType = ({
    commit
}, query) => {
    const url = `${_prefix}/region/type`;

    return _get({
            url,
            query
        }, commit)
        .then((json) => {
            return Promise.resolve(json);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};

export const getSubDatas = ({
    commit
}, query) => {
    const url = `${_prefix}/devices/query`;
    return _get({
            url,
            query
        }, commit)
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
export const getAreaInfo = ({
    commit
}, query) => {
    const url = `${_prefix}/region/${query.id}`;
    return _get({
            url,
            query
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const updateArea = ({
    commit
}, body) => {
    const url = `${_prefix}/region`;
    return _put({
            url,
            body
        }, commit)
        .then(json => {
            return Promise.resolve(json.data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const addArea = ({
    commit
}, body) => {
    const url = `${_prefix}/region`;
    return _post({
            url,
            body
        }, commit)
        .then(json => {
            return Promise.resolve(json.data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
//区域机构列表获取
export const getAreaSelect = ({
    commit
}, body) => {
    const url = `/devicerights/v1/areas`;
    return _get({
            url,
            body
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
//获取区域列表
export const getAreaList = ({
    commit
}, query) => {
    const url = `/devicerights/v1/areas/regionname`;
    return _get({
            url,
            query
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
//获取农业类型列表
export const getTypeList = ({
    commit
}, query) => {
    const url = `/devicerights/v1/areas/regiontype`;
    return _get({
            url,
            query
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
export const addAreaInfo = ({
    commit
}, body) => {
    const url = `/devicerights/v1/areas`;
    return _post({
            url,
            body
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const updateAreaInfo = ({
    commit
}, body) => {

    const url = `/agriculture/v1/updatearea/${body.id}?code=${body.areaCode}`;
    delete body.areaCode;
    return _post({
            url,
            body
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};


export const getAreaByCide = ({
    commit
}, query) => {
    const url = `/devicerights/v1/areas/areaCode`;
    return _get({
            url,
            query
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

//删除区域

export const deleteArea = ({
    commit
}, query) => {
    const url = `/agriculture/v1?areaCode=${query.areaCode}`;
    return _delete({
            url
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const getAreaById = ({
    commit
}, query) => {
    const url = `/devicerights/v1/areas/areaInfo`;
    return _get({
            url,
            query
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
//获取角色列表
export const getRoleList = ({
    commit
}, query) => {
    const url = `/devicerights/v1/userGroups/usergroup`;
    return _get({
            url,
            query
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
//删除角色
export const deleteRole = ({
    commit
}, query) => {
    const url = `/devicerights/v1/userGroups?userGroupId=${query.userGroupId}`;
    return _delete({
            url
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

//获取小城市用户列表
export const getsmallprogram = ({
    commit
}, query) => {
    const url = `/aptps-server/v1/view/users/mp-and-ma`;
    return _get({
            url,
            query
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
//获取设备视图列表
export const getsbview = ({
    commit
}, query) => {
    const url = `/agriculture/v2/deviceView`;
    return _get({
            url,
            query
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
//新增角色权限

export const addrplepower = ({
    commit
}, body) => {
    const url = `/devicerights/v2/userGroups`;
    return _post({
            url,
            body
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
//编辑更新角色权限
export const editroleupdate = ({
    commit
}, body) => {
    const url = `/devicerights/v1/userGroups/${body.userGroupId}`;
    return _put({
            url,
            body
        }, commit)
        .then((json) => {
            return Promise.resolve(json);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};

export const getUploadParams = ({
    commit
}, query) => {
    const url = `/filecenter/getPicOssPolicy`;
    return _get({
            url,
            query
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
//获取指定角色权限
export const getroleupdate = ({
    commit
}, body) => {
    const url = `/devicerights/v1/actions/${body.userGroupId}`;
    return _get({
            url,
            body
        }, commit)
        .then((json) => {
            return Promise.resolve(json);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};
//获取指定角色区域
export const getareatree = ({
    commit
}, body) => {
    const url = `/devicerights/v1/areas`;
    return _get({
            url,
            body
        }, commit)
        .then((json) => {
            return Promise.resolve(json);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};

export const getareatreepower = ({
    commit
}, query) => {
    const url = `/devicerights/v1/areas/areaCode`;
    return _get({
            url,
            query
        }, commit)
        .then((json) => {
            return Promise.resolve(json);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};
//获取指定角色所在组
export const getusergroup = ({
    commit
}, body) => {
    const url = `/devicerights/v1/userGroups/parentug`;
    return _get({
            url,
            body
        }, commit)
        .then((json) => {
            return Promise.resolve(json);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};
//获取指定角色区域权限
export const getrolearea = ({
    commit
}, body) => {
    const url = `/devicerights/v1/areas/usergroupId?usergroupId=${body.userGroupId}`;
    return _get({
            url,
            body
        }, commit)
        .then((json) => {
            return Promise.resolve(json);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};

//新增小程序用户
export const addsmallprogram = ({
    commit
}, body) => {

    const url = `/auth-server/user/create-customer`;
    return _post({
            url,
            body
        }, commit)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
//聚合小城市用户和角色用户列表v2/users/all
export const getuserall = ({
	commit
}, query) => {
	const url = `auth-server/v2/users/all`;
	return _get({
		url,
		query
	}, commit).then(json => {
		return Promise.resolve(json);
	}).catch(error => {
		return Promise.reject(error);
	});
};


export const getUserAllInfoById = ({
	commit
}, query) => {
	const url = `auth-server/v2/users/${query.id}`;
	return _get({
		url,
		query
	}, commit).then(json => {
		return Promise.resolve(json);
	}).catch(error => {
		return Promise.reject(error);
	});
};