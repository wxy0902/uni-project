import config from './config.js';

export default function request(route, method = 'get', data = {}) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: config.domain + route,
      method,
      data,
      header: {
        'token': uni.getStorageSync('TOKEN') || '',
      },
      success: res => {
        // console.log('请求结果', res);
        // token失效
        if (res.statusCode == 401 || res.data.ErrorMessage == '登录过期') {
          reject({
            data: 401,
            status: res.statusCode
          })
          uni.redirectTo({
            url: '/pages/login/login'
          })
          return;
        }
        // 服务器错误
        if (res.statusCode == 500) {
          reject({
            data: {},
            status: res.statusCode
          })
          uni.showToast({
            title: '服务器错误',
            icon: 'none'
          })
          return;
        }
        // 含有错误
        if (res.data.ErrorMessage != '成功') {
          reject({
            data: res.data,
            status: res.statusCode
          })
          uni.showToast({
            title: res.data.ErrorMessage,
            icon: 'none'
          })
          return;
        }
        // 正常
        resolve({
          data: res.data,
          status: res.statusCode
        })
      },
      fail: err => {
        // console.log(err)
        reject(err)
        uni.showToast({
          title: '网络连接异常',
          icon: 'none'
        })
      }
    })
  })
}
