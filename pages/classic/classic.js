import { ClassicModel } from '../../models/classic.js';
import { LikeModel } from '../../models/like.js';

let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    }); 
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

  /**
   * 自定义函数
   */
  onLike: function (e) {
    const { detail: { behavior } } = e;
    const { id, type } = this.data.classicData;

    likeModel.like(behavior, id, type)
  },

  onNext: function (e) {
    this._updateClassic('next');
  },

  onPrevious: function (e) {
    this._updateClassic('previous');
  },

  // onNext onPrevious公用方法
  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classicData.index;

    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type);
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index),
      })
    })
  },

  // 获取最新的喜欢状态和数量
  _getLikeStatus: function(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  }
})