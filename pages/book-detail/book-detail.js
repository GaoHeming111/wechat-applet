import { BookModal } from '../../models/book.js';
import { LikeModel } from '../../models/like.js';

const bookModal = new BookModal();
const likeModal = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {bid} = options;
    const detail = bookModal.getDetail(bid);
    const comments = bookModal.getComments(bid);
    const likeStatus = bookModal.getLikeStatus(bid);
    wx.showLoading();

    Promise.all([detail, comments, likeStatus])
      .then(res => {
        this.setData({
          book: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })

        wx.hideLoading();
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 自定义事件
  onLike(e) {
    const like_or_cancel = e.detail.behavior;

    likeModal.like(like_or_cancel, this.data.book.id, 400);
  },

  onFakePost(e) {
    this.setData({
      posting: true
    })
  },

  onCancel(e) {
    this.setData({
      posting: false
    })
  },

  // 提交 所选或输入的标签  
  onPost(e) {
    const comment = e.detail.text || e.detail.value;

    if(comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字符',
        icon: 'none'
      })
      return;
    }

    if(!comment) return;

    bookModal.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '+ 1',
          icon: 'none'
        })

        const newComments = this.data.comments;
        
        newComments.unshift({
          content: comment,
          nums: 1
        });
        this.setData({ 
          comments: newComments,
          posting: false
        });
      })
  }
})