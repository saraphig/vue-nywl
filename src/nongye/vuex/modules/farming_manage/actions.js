import { _get, _post, _patch, _delete, _put } from "@lib/js/http";
import axios from 'axios';

//获取农业类型列表
export const getProjectGroups = ({
	commit
}, query) => {
	let params = {
		url: `/agriculture/v1/projectGroups`,
		query: {}
	}
	return _get(params, commit)
		.then(json => {
			return Promise.resolve(json)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}

//获取农业类型对应的项目内容
export const getProjectList = ({
	commit
}, query) => {
	let params = {
		url: `/agriculture/v1/projects/byid`,
		query: query
	}
	return _get(params, commit)
		.then(data => {
			return Promise.resolve(data)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}

// 新增农业项目组
export const addProjectGroup = ({
	commit
}, body) => {
	let params = {
		url: `/agriculture/v1/projectGroups`,
		body: body
	}
	return _post(params, commit)
		.then(data => {
			return Promise.resolve(data)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}

//获取确认单列表
export const getConfirmOrders = ({
	commit
}, query) => {
	let params = {
		url: `/agriculture/v1/comfirmOrders`,
		query: query
	}
	return _get(params, commit)
		.then(json => {
			return Promise.resolve(json)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}

//获取确认单列表
export const getProjectCheckLists = ({
	commit
}, query) => {
	let params = {
		url: `/agriculture//v1/projectCheckLists`,
		query: query
	}
	return _get(params, commit)
		.then(json => {
			return Promise.resolve(json)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}
//获取确认单列表
export const getProjectSummary = ({
	commit
}, query) => {
	let params = {
		url: `/agriculture///v1/projects/summary`,
		query: query
	}
	return _get(params, commit)
		.then(json => {
			return Promise.resolve(json)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}

//获取确认单列表
export const getExecuteUsers = ({
	commit
}, query) => {
	let params = {
		url: `/auth-server/v2/users`,
		query: query
	}
	return _get(params, commit)
		.then(json => {
			return Promise.resolve(json)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}

//新增项目
export const insertProject = ({
	commit
}, body) => {
	let params = {
		url: `/agriculture/v1/projects`,
		body
	}
	return _post(params, commit)
		.then(json => {
			return Promise.resolve(json)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}

//编辑项目
export const editProject = ({
	commit
}, body) => {
	let params = {
		url: `/agriculture/v1/projects/${body.id}`,
		body
	}
	return _patch(params, commit)
		.then(json => {
			return Promise.resolve(json)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}
//删除项目
export const deleteProject = ({
	commit
}, body) => {
	let params = {
		url: `/agriculture/v1/projects/${body.id}`,
		body
	}
	return _delete(params, commit)
		.then(json => {
			return Promise.resolve(json)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}

//（农事管理-工作日报）检查当前选择的日期是否已经存在日报
export const request_daily_checkTime = ({
	commit
}, query) => {
	const url = `/agriculture/v1/dailys/selectIsThereADailyNewspaper`
	return _get({
				url,
				query
			},
			commit
		)
		.then(json => {
			return Promise.resolve(json)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}

//（农事管理-工作日报）新添加一条日报
export const request_daily_add = ({
	commit
}, body) => {
	const url = `/agriculture/v1/dailys`
	return _post({
				url,
				body
			},
			commit
		)
		.then(json => {
			return Promise.resolve(json)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}

//（农事管理-工作日报）获取日报列表
export const request_daily_list = ({
	commit
}, query) => {
	const url = `/agriculture/v1/dailys`;
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

//（农事管理-工作日报）获取日报详情
export const request_daily_detail = ({
	commit
}, query) => {
	const url = `/agriculture/v1/dailys/${query.id}`;
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

//（农事管理-工作日报）编辑日报
export const request_daily_edit = ({
	commit
}, body) => {
	const url = `/agriculture/v1/dailys`
	return _put({
				url,
				body
			},
			commit
		)
		.then(json => {
			return Promise.resolve(json)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}

//（农事管理-工作日报）获取日报当前时间
export const request_daily_currentTime = ({
	commit
}, query) => {
	const url = `/agriculture/v1/dailys/getCurrentTime`;
	return axios({
		method: 'delete',
		url,
		data: { ...query
		} // delete 请求时带的参数
	}).then((res) => {
		if(commit) commit('FINISH_LOADING');
		if(res.status >= 200 && res.status < 300) {
			return res.data
		}
		return Promise.reject(res);
	}, (err) => {
		if(commit) commit('FINISH_LOADING');
		// 临时处理网关异常
		if(err && err.exception && err.exception.indexOf('ZuulException') !== -1) {
			alert('服务器正忙，请稍后再试');
		}
		return Promise.reject(err.message || err.data);
	});
};