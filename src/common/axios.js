import axios from "axios";
import qs from "qs";
import auth from "./auth";
import { getBaseUrl } from "../common/utils";
import { Message } from "element-ui";
import store from '../store/index';
import types from '../store/mutation-types';

// axios 配置
axios.defaults.timeout = 5000;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = getBaseUrl(window.location.href);
// axios.defaults.headers.common[ 'authUid' ] = auth.getUid();
axios.defaults.headers.common[ 'access_token' ] = auth.getSid();

//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use(
  response => {
    if (response.data && response.data.code) {
      if (response.data.code === '2001') {
        auth.logout();
        store.commit(types.CLEAR_ADMIN);
      }
    }
    return response;
  },
  error => {
    if (error.response) {
      //全局ajax错误信息提示
      Message.error({
        message: '加载失败'
      })
    }
    return Promise.reject(error);
  });


export default axios
