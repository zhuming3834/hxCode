// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import md5 from 'js-md5';
import axios from 'axios';

import utils from '../static/utils.js';
import citydata from '../static/citydata.js';

Vue.prototype.$axios = axios;
Vue.prototype.$utils = utils;
Vue.prototype.$citydata = citydata;

var userId = utils.getUserID();

axios.defaults.baseURL = 'http://m.ijiakj.com:8088/wx_sc/api/';  // 商城
// axios.defaults.baseURL = 'http://120.79.29.194:7080'; // 杜克贷款
axios.defaults.timeout = 10000;
var baseKey = 'wx_sc'; // wx_sc dukeAPP
axios.interceptors.request.use(function (config) {
  if (config.params != null || config.params != undefined) {
    var md5Str = baseKey;
    var base32Str = 'key' + ',';
    for(var key in config.params){
      md5Str = md5Str + config.params[key];
      base32Str = base32Str + key + ',';
    }
    base32Str = base32Str.substring(0,(base32Str.length - 1));
    config.params.key = baseKey;
    // config.params.auth = base32Encode(base32Str);
    config.params.userId = userId;
    config.params.auth = 'NNSXS';
    config.params.token = 'aebbfde9a8b480ce80e9376ace27f088';
    // config.params.token = md5(md5Str);
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
