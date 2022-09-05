import Vue from 'vue'

// axios
import axios from 'axios'
import useJwt from "@/auth/jwt/useJwt";

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: '/api',
  timeout: 5000,
  // headers: {"Access-Control-Allow-Origin": "*"}
  }
// headers: {'X-Custom-Header': 'foobar'}
)

Vue.prototype.$http = axiosIns

export default axiosIns


// get 请求
export const getRequest = (url, params) => {
  let accessToken = localStorage.getItem('accessToken');
  return axiosIns({
    method: 'get',
    url: `${url}`,
    params: params,
    headers: {
      'accessToken': accessToken
    }
  });
};

// get 无参请求
export const getNoParamRequest = (url) => {
  debugger
  let accessToken = localStorage.getItem('accessToken');
  return axiosIns({
    method: 'get',
    url: `${url}`,
    headers: {
      'accessToken': accessToken
    }
  });
};


// post请求
export const postRequest = (url, params) => {
  let accessToken = localStorage.getItem('accessToken');
  return axiosIns({
    method: 'post',
    url: `${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      ret = ret.substring(0, ret.length - 1);
      return ret;
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accessToken': accessToken
    }
  });
};

export const putRequest = (url, params) => {
  let accessToken = localStorage.getItem('accessToken');
  return axiosIns({
    method: 'put',
    url: `${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      ret = ret.substring(0, ret.length - 1);
      return ret;
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accessToken': accessToken
    }
  });
};

export const deleteRequest = (url, params) => {
  let accessToken = localStorage.getItem('accessToken');
  return axiosIns({
    method: 'delete',
    url: `${url}`,
    params: params,
    headers: {
      'accessToken': accessToken
    }
  });
};

/**
 * 无需token验证的请求 避免旧token过期导致请求失败
 * @param {*} url
 */
export const getRequestWithNoToken = url => {
  return axiosIns({
    method: 'get',
    url: `${url}`,
  });
};




