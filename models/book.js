import { HTTP } from '../util/http-p.js';

class BookModal extends HTTP {
  getHotList() {
   return this.request({
     url: 'book/hot_list',
   }) 
  }

  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }

  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  // 发送短评
  postComment(bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }

  /*
    Search搜索页面所选接口数据
   */
  search(start, q) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q,
        start,
      }
    })
  }
}

export { BookModal };