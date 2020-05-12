import {config} from '../config.js';

const tips = {
  1005: 'appkey不存在',
  3000: '期刊不存在',
  1: '抱歉出错'
}
class HTTP {
  request(params) {
    const {url, method, data, success} = params;
    const {api_base_url, appkey} = config;

    if(!params.method) {
      params.method = 'GET';
    }

    wx.request({
      url: api_base_url + url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        'appkey': appkey
      },
      success: res => {
        console.log(res);
        const code = res.statusCode.toString();
        const error_code = res.data.error_code;

        if(code.startsWith('2')) {
          success && success(res.data);
        } else {
          this._show_error(error_code);
        }
      },
      fail: (err) => {
        this._show_error(1);
      }
    })
  }
  
  _show_error(error_code = 1) {
    wx.showToast({
      title: tips[error_code],
      icon: 'none'
    })
  }
}

export { HTTP }