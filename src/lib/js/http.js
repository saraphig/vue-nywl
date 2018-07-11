import vue from 'vue';
import axios from 'axios';
import { getStore } from '@lib/js/mUtils';
/**
 * get请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
export const _get = ({
	url,
	query
}, commit) => {

	if(commit) commit('START_LOADING');
	let areaData = {
		areaCode: getStore('organizationCode')
	};
	// 是否存在areaCode
	let params = {};
	try {
		params = query.areaCode ? { ...areaData,
			...query
		} : { ...query,
			...areaData
		};
	} catch(e) {}

	return axios({
		method: 'get',
		url,
		params: { ...params
		} // get 请求时带的参数
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

export const _post = ({
	url,
	body
}, commit) => {
	if(commit) commit('START_LOADING');

	return axios({
		method: 'post',
		url,
		data: { ...body
		}, // post 请求时带的参数
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

export const _delete = ({
	url,
	query
}, commit) => {
	if(commit) commit('START_LOADING');

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

export const _put = ({
	url,
	body
}, commit) => {
	if(commit) commit('START_LOADING');

	return axios({
		method: 'put',
		url,
		data: { ...body
		} // put 请求时带的参数
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

export const _patch = ({
	url,
	body
}, commit) => {
	if(commit) commit('START_LOADING');

	return axios({
		method: 'patch',
		url,
		data: { ...body
		} // put 请求时带的参数
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