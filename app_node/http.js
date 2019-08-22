const axios = require('axios');

axios.defaults.baseURL = 'http://hd215.api.yesapi.cn'; // 配置axios请求的地址
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization

export default{
  //get请求
  get(url, param) {
    return new Promise((cback, reject) => {
      url = url || ''  
      axios({
        method: "GET",
        url: url,
        data: param
      }).then(res => {
        var res_code = res.status.toString();
        if (res_code.charAt(0) == 2) {
          cback(res); 
        } else {
          console.log(res,'请求失败1')
        }
      }).catch(err => {
        if (!err.response) {
          console.log('请求错误')
        } else {
          reject(err.response);
          console.log(err.response,'请求失败2')
        }
      })
    })
  },

   //post请求
   post(url, param) {
    return new Promise((cback, reject) => {
      url = url || '' 
      axios({
        method: "POST",
        url: url,
        data: param
      }).then(res => {
        var res_code = res.status.toString();
        if (res_code.charAt(0) == 2) {
          cback(res); 
        } else {
          console.log(res,'请求失败1')
        }
      }).catch(err => {
        if (!err.response) {
          console.log('请求错误')
        } else {
          reject(err.response);
          console.log(err.response,'请求失败2')
        }
      })
    })
  },
}