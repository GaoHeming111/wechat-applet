import {config} from '../config.js';

const tips = {
  1005: 'appkey不存在',
  3000: '期刊不存在',
  1: '抱歉出错'
}
class HTTP {
  request({url, data = {}, method = "GET"}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    })
  }
  _request(url, resolve, reject, data = {}, method = "GET") {
    const {api_base_url, appkey} = config;

    wx.request({
      url: api_base_url + url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        'appkey': appkey
      },
      success: res => {
        const code = res.statusCode.toString();
        const error_code = res.data.error_code;

        if(code.startsWith('2')) {
          resolve(res.data);
        } else {
          reject();
          this._show_error(error_code);
        }
      },
      fail: () => {
        reject();
        this._show_error(1);
      }
    })
  }
  
  _show_error(error_code = 1) {
    const tip = tips[error_code];

    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none'
    })
  }
}

export { HTTP }