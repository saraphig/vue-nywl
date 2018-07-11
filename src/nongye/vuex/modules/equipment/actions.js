import { _get, _post, _delete, _put } from "@lib/js/http";
import { setStore, getStore } from '@lib/js/mUtils';

let _prefix = ``; // 请求前缀

//获取地块列表，迭代4暂时遍历出所有机构的地块值
export const request_equipment_areasList = ({
	commit
}, query) => {
	const url = `${_prefix}/devicerights/v1/areas/regionname`;
	return _get({
			url,
			query
		}, commit)
		.then(json => {
			let areasList = [];

			let areaItem = json.data;
			for(let i = 0; i < areaItem.length; i++) {
				let item = areaItem[i];
				if(!item) {
					continue;
				}
				item.id = item.areaCode;
				item.value = item.idName;
				areasList.push(areaItem[i]);
			}
			return Promise.resolve(areasList);
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

//根据当前地块获取设备列表
export const request_equipment_deviceList = ({
	commit
}, query) => {
	const url = `${_prefix}/agriculture/v2/deviceinfo/list`;
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

//获取节点信息
export const request_equipment_deviceNodeList = ({
	commit
}, query) => {
	const url = `${_prefix}/agriculture/v2/deviceNodes/${query.id}`;
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

//编辑设备
export const request_equipment_edit = ({
	commit
}, body) => {
	const url = `${_prefix}/datatree/v2/deviceinfo/${body.id}`;
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

//查询设备类型
export const request_equipment_deviceType = ({
	commit
}, query) => {
	const url = `${_prefix}/devicetemp/v1/products`;
	return _get({
			url,
			query
		}, commit)
		.then(json => {
			let deviceTypeList = json.data;
			for(let i = 0; i < deviceTypeList.length; i++) {
				deviceTypeList[i].value = deviceTypeList[i].name;
			}
			return Promise.resolve(deviceTypeList);
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

//新增设备
export const request_equipment_add = ({
	commit
}, body) => {
	const url = `${_prefix}/agriculture/v2/deviceinfo/add`;
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

//删除设备
export const request_equipment_delect = ({
	commit
}, query) => {
	let url = `${_prefix}/agriculture/v2/deviceinfo/delete/${query.id}`;
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

// 获取视频设备的通道信息
//export const request_equipment_channel = ({
//	commit
//}, body) => {
//	const url = `${_prefix}/videoconver/v1/videoChannel/addChannel`;
//	return _post({
//			url,
//			body
//		}, commit)
//		.then(json => {
//			return Promise.resolve(json);
//		})
//		.catch(error => {
//			return Promise.reject(error);
//		});
//};

// 新增摄像头视频接口
export const request_equipment_nvrChannel = ({
	commit
}, query) => {
	const url = `${_prefix}/videoconver/v1/videoChannel/addChannel`;
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

// 删除摄像头视频接口
export const request_equipment_nvrChannel_delect = ({
	commit
}, query) => {
	const url = `${_prefix}/videoconver/v1/videoChannel/closeChannel`;
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

//保存当前展示中的地块列表
export const save_equipment_areasList = ({
	commit
}, query) => {
	let areas = {};
	areas.list = query
	setStore("equi_areas", areas);
};

//获取当前展示中的地块列表
export const get_equipment_areasList = () => {
	let list = [];
	let areas = getStore("equi_areas");
	if(areas) {
		list = (JSON.parse(areas)).list;
	}
	return Promise.resolve(list);
};

//保存当前展示中的设备列表
export const save_equipment_devicesList = ({
	commit
}, query) => {
	let devices = {};
	devices.list = query
	setStore("equi_devices", devices);
};

//获取当前展示中的设备列表
export const get_equipment_devicesList = () => {
	let list = [];
	let devices = getStore("equi_devices");
	if(devices) {
		list = (JSON.parse(devices)).list;
	}
	return Promise.resolve(list);
};