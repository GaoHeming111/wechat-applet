import {HTTP} from '../util/http-p.js';

class KeywordModal extends HTTP {
  key = 'q';
  maxLength = 10;

  getHistory() {
    return wx.getStorageSync(this.key) || [];
  }

  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  // 将历史搜索写入缓存中 
  addToHistory(keyword) {
    let words = this.getHistory();
    const has = words.includes(keyword);

    if(!has) {
      if(words.length >= this.maxLength) words.pop(); // 大于等于10时，先删除末尾的元素
      words.unshift(keyword);
      wx.setStorageSync(this.key, words)
    }
  }
}

export { KeywordModal };