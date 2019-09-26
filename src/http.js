import axios from 'axios';
import Qs from 'qs';

export default{
  //get请求
  get(url, param) {
    return new Promise((cback, reject) => {
      url = url || ''  
      axios({
        method: "GET",
        // url: '/api'+ `${url}?s=${param.s}&username=${param.username}&password=${param.password}&app_key=${param.app_key}`,
        url: '/api' + url,
        // url: 'http://apps.littlechai.cn' + url,
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
        url: '/api' + url,
        // url: 'http://apps.littlechai.cn' + url,
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

     //postForm请求
     postForm(url, param) {
      return new Promise((cback, reject) => {
        url = url || '' 
        axios({
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          method: "POST",
          url: '/api' + url,
          // url: 'http://apps.littlechai.cn' + url,
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