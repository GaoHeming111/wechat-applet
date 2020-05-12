import {HTTP} from '../util/http.js';
 
class LikeModel extends HTTP {
  like(behavior, artID, category) {
    this.request({
      url: behavior === 'like' ? 'like' : 'like/cancel',
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  // 获取最新的点赞状态
  getClassicLikeStatus(artID, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }
}

export { LikeModel };