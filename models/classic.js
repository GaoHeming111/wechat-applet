import {HTTP} from '../util/http.js';
 
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res);
        this._setLatestIndex(res.index);

        // 每次都将最新一期数据存入缓存中
        let key = this._getKey(res.index);
        wx.setStorageSync(key, res)
      },
    })
  }

  // 前一期，后一期 公用函数
  getClassic(index, nextOrPrevious, sCallback) {
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    let classic = wx.getStorageSync(key);

    if(!classic) {
      this.request({
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res);
          sCallback(res);
        }
      })
    } else {
      sCallback(classic)
    }
  }

  isFirst(index) {
    return index === 1 ? true : false;
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex();

    return latestIndex === index ? true : false;
  }

  // 存储最新一期的index => 点击左箭头时判断是否是最新一期
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index); // 同步写入缓存
  }

  // 读取缓存index
  _getLatestIndex() {
    return wx.getStorageSync('latest'); 
  }

  // 产生每个期刊的唯一key
  _getKey(index) {
    let key = 'classic-' + index;

    return key;
  }

  getMyFavor(success) {
    const params = {
      url: 'classic/favor',
      success,
    }
    this.request(params);
  }
}

export { ClassicModel };