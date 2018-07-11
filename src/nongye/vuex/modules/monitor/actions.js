import { _get, _post, _delete, _put } from "@lib/js/http";
import { setStore, getStore } from '@lib/js/mUtils';

let _prefix = `/admin`;

export const getdealInfo = ({
	commit
}, query) => {
	const url = `agriculture/device/${query.id}`;
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

//确认告警
export const Alarmconfirm = ({
	commit
}, query) => {
	var str = '';
	// id=1&id=2&id=3
	for(var i = 0; i < query.id.length; i++) {
		str += '&id=' + query.id[i];
	}
	str.slice(0);
	// console.log(str);${str}
	const url = `alarm-server/alarms/ack?` + str;
	return _get({
			url,
			query: {}
		}, commit)
		.then(json => {
			return Promise.resolve(json);
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

// 告警管理
export const fetchAlarmManage = ({
	commit
}, query) => {
	const url = `alarm-server/sms/configs/getGlobal`;
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

export const modifyAlarmManage = ({
	commit
}, query) => {
	const url = `alarm-server/sms/configs/modify`;
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

// 告警记录
export const fetchRegionsArea = ({
	commit
}, query) => {
	const url = `/agriculture/regions`;
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

export const processAlarm = ({
	commit
}, query) => {
	const url = `alarm-server/alarms/ackOne`;
	return _get({
			url,
			query
		}, commit)
		.then(json => {
			return Promise.resolve(json); //JSON.parse(json)
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

export const fetchRegionsType = ({
	commit
}, query) => {
	const url = `alarm-server/alarms/type`;
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

export const fetchAlarmlog = ({
	commit
}, query) => {
	const url = `alarm-server/alarms`;
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

// 实时告警
export const fetchAlarmNum = ({
	commit
}, query) => {
	const url = `alarm-server/alarms?statusIds=1`;
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

export const getAlarmById = ({
	commit
}, query) => {
	const url = `alarm-server/alarms/${query.id}`;
	return _get({
			url,
			query
		}, commit)
		.then(json => {
			return Promise.resolve(json); //JSON.parse(json)
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

//获取图表显示数据
export const fetchMonitorGet = ({
	commit
}, query) => {
	//const url = `/admin/datapointstates/realtime/100101?currentId=&MaxCount=30`;
	//const url = `/admin-service/admin/datapointstates/realtime/100101`;
	//const url = `/admin-service/region/datapointstates`;
	//const url = `/region/history`;
	//let url = `/agriculture/region/history?id=` + query.id;//?region=10011&pointType=1
	let url = `/agriculture/v2/device/history`; //?region=10011&pointType=1

	return _get({
			url,
			query
		}, commit)
		.then(json => {
			//console.log(json);
			//commit('FINISH_LOADING');
			return Promise.resolve(json); //JSON.parse(json)
			/*if (json.error == 0) {
          return Promise.resolve(json.search);
        }
        return Promise.reject(json);*/
		})
		.catch(error => {
			//commit('FINISH_LOADING');
			return Promise.reject(error);
		});
};

//获取地块列表
export const fetchMonitorAreaGet = ({
    commit
}, query) => {
    let url = `/devicerights/v1/areas/regionname`;
    return _get({
            url,
            query
        }, commit).then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

//获取点设备列表
export const fetchMonitorAreaListGet = ({
	commit
}, query) => {
	const url = `/agriculture/v2/device/datapoints`;
	//console.log(query);
	return _get({
			url,
			query
		}, commit)
		.then(json => {
			return Promise.resolve(json); //JSON.parse(json)
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

//获取地块点列表
export const fetchMonitorAreaPointGet = ({
	commit
}, query) => {
	const url = `${_prefix}/admin/region/datapointstates?id=1`;

	return _get({
			url,
			query
		}, false)
		.then(json => {
			return Promise.resolve(json); //JSON.parse(json)
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

export const getParentOrganization = ({
	commit
}, query) => {
	let url = `/devicerights/v1/areas/Parent`;
	return _get({
		url,
		query
	}, false).then(json => {
		return Promise.resolve(json);
	}).catch(error => {
		return Promise.reject(error);
	});
};

//获取机构树
export const getOrganizationTree = ({
	commit
}, query) => {
	const url = '/devicerights/v1/areas';

	return _get({
			url,
			query
		}, false)
		.then(json => {
			return Promise.resolve(json); //JSON.parse(json)
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

// 保存新增机构信息
export const addOrganizationInfo = ({
	commit
}, body) => {
	const url = `devicerights/v1/areas`; //新增机构
	return _post({
		url,
		body
	}, false).then(json => {
		return Promise.resolve(json);
	}).catch(error => {
		return Promise.reject(error);
	});
};

// 保存编辑机构信息
export const modiOrganizationInfo = ({
	commit
}, body) => {
	let url = `agriculture/v1/updatearea`; //编辑机构
	url += "/" + body.areaId + "?code=" + body.areaCode;
	delete body.areaId;
	delete body.areaCode;
	return _post({
		url,
		body
	}, false).then(json => {
		return Promise.resolve(json);
	}).catch(error => {
		return Promise.reject(error);
	});
};

//获取地块树
export const getRegionList = ({
	commit
}, query) => {
	const url = '/devicerights/v1/areas/regionname';

	return _get({
			url,
			query
		}, false)
		.then(json => {
			return Promise.resolve(json); //JSON.parse(json)
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

//获取所有地块
export const getAllMonitorList = ({
	commit
}, query) => {
	const url = '/devicerights/v1/areas/regionname';
	//commit('START_LOADING');
	return _get({
			url,
			query
		}, false)
		.then(json => {
			return Promise.resolve(json); //JSON.parse(json)
		})
		.catch(error => {
			//commit('FINISH_LOADING');
			return Promise.reject(error);
		});
};

//获取监控列表
export const getMonitorList = ({
	commit
}, query) => {
	const url = '/agriculture/v2/deviceinfo/list';

	return _get({
			url,
			query
		}, false)
		.then(json => {
			return Promise.resolve(json); //JSON.parse(json)
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

//控制设备开关命令
export const fetchControlSwitch = ({
	commit
}, query) => {
	//let url = `/admin-service/admin/Instruction/` + query.id + "?value=" + (query.field?1:0);
	//let url = `/agriculture/Instruction/` + query.id + "?value=" + (query.field?1:0);
	let url = `/agriculture/device/instruction/` + query.id + "?value=" + (query.field ? 1 : 0);
	query = {};
	console.log(url);
	return _post({
			url,
			query
		}, commit)
		.then(json => {
			return Promise.resolve(json); //JSON.parse(json)
		})
		.catch(error => {
			return Promise.reject(error);
		});
};
///admin/Instruction/{id}?value=''
//获取视频上传凭证和地址
export const getUploadAuth = ({
	commit
}, query) => {
	const url = `/filecenter/video/getUploadAuth`;
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
//获取视频上传凭证和地址
export const getUploadPicAuth = ({
	commit
}, query) => {
	const url = `/filecenter/getOssPolicy`;
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

// 告警状态下拉框列表数据
export const getAlarmType = ({
	commit
}, query) => {
	const url = `alarm-server/alarms/status`;
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

// 获取警告级别
export const getAlarmLevel = ({
	commit
}, query) => {
	const url = `alarm-server/alarms/level`;
	return _get({
			url,
			query
		}, commit)
		.then(json => {
			return Promise.resolve(json); //JSON.parse(json)
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

// 告警管理
export const getAlarmData = ({
	commit
}, query) => {
	const url = `alarm-server/alarms`;
	return _get({
		url,
		query
	}, commit).then(json => {
		return Promise.resolve(json);
	}).catch(error => {
		return Promise.reject(error);
	});
};

//搜索地图地块
export const getMaplist = ({
	commit
}, query) => {
	const url = `/agriculture/v2/projectView`;
	return _get({
		url,
		query
	}, commit).then(json => {
		return Promise.resolve(json);
	}).catch(error => {
		return Promise.reject(error);
	});
};

//搜索设备地块
export const getMapEquipmentList = ({
	commit
}, query) => {
	const url = `/agriculture/v2/deviceView/list`;
	return _get({
		url,
		query
	}, commit).then(json => {
		return Promise.resolve(json);
	}).catch(error => {
		return Promise.reject(error);
	});
};

// 查询用户列表
export const getUserList = ({
	commit
}, query) => {
	const url = `auth-server/user/getPageListV1`;
	return _get({
		url,
		query
	}, commit).then(json => {
		return Promise.resolve(json);
	}).catch(error => {
		return Promise.reject(error);
	});
};

// 查询用户列表
export const getUserById= ({
	commit
}, query) => {
	const url = `auth-server/user/byId/${query.id}`;
	return _get({
		url,
		query
	}, commit).then(json => {
		return Promise.resolve(json);
	}).catch(error => {
		return Promise.reject(error);
	});
};

// 保存新增用户信息
export const addUserInfo = ({
	commit
}, body) => {
	const url = `auth-server/user/createUserV1`; //新增用户
	return _post({
		url,
		body
	}, commit).then(json => {
		return Promise.resolve(json);
	}).catch(error => {
		return Promise.reject(error);
	});
};

// 保存修改用户信息 http://10.17.5.117:9005/swagger-ui.html#/%E7%94%A8%E6%88%B7%E7%9B%B8%E5%85%B3%E6%8E%A5%E5%8F%A3/updateUserV1UsingPOST
export const updateUserInfo = ({
	commit
}, body) => {
	const url = `auth-server/user/updateV1`; //修改用户
	return _post({
		url,
		body
	}, commit).then(json => {
		return Promise.resolve(json);
	}).catch(error => {
		return Promise.reject(error);
	});
};

export const uploadPicFile = ({
	commit
}, query) => { //石巍的接口及云服务
	const url = `/agriculture/testuploadimg`;
	return _post({
		url,
		query
	}, commit).then(json => {
		return Promise.resolve(json);
	}).catch(error => {
		return Promise.reject(error);
	});
};

// 获取告警级别接口：如紧急、重要、一般告警
export const request_alarms_level = ({
	commit
}, query) => {
	const url = `/alarm-server/alarms/level`;
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

// 根据code查询底层地块列表的详细信息
export const request_areaDetail = ({
	commit
}, query) => {
	const url = `/devicerights/v1/areas/areaDetail`;
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

// （告警管理-告警通知 ）新增一条告警通知接口
export const request_alarms_notice_add = ({
	commit
}, body) => {
	const url = `/agriculture/v1/notices`;
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

// （告警管理-告警通知 ）编辑一条告警通知接口
export const request_alarms_notice_edit = ({
	commit
}, body) => {
	const url = `/agriculture/v1/notices`;
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

// （告警管理-告警通知 ）获取告警通知列表
export const request_alarms_notice_list = ({
	commit
}, query) => {
	const url = `/agriculture/v1/notices`;
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

// （告警管理-告警通知 ）删除一条告警通知
export const request_alarms_notice_delect = ({
	commit
}, query) => {
	let url = `/agriculture/v1/notices/${query.id}`;
	return _delete({
			url,
			query
		}, commit)
		.then(json => {
			return Promise.resolve(json.data);
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

// 临时保存当前告警通知列表
export const save_alarms_notice_list = ({
	commit
}, query) => {
	let notices = {};
	notices.list = query
	setStore("alarms_notice_list", notices);
};

// 获取临时保存当前告警通知列表
export const get_alarms_notice_list = () => {
	let list = [];
	let notices = getStore("alarms_notice_list");
	if(notices) {
		list = (JSON.parse(notices)).list;
	}
	return Promise.resolve(list);
};