import { BookModal } from '../../models/book.js';
import { ClassicModel } from '../../models/classic.js';

const bookModal = new BookModal();
const classicModal = new ClassicModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
    this.getMyBookCount(); 
    this.getMyFavor();
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
  userAuthorized(e) {
    // 内置函数 获取用户是否已经授权过  
    wx.getSetting({
      success: data => {
        if(data.authSetting['scope.userInfo']) { // 已经授权
          wx.getUserInfo({
            success: data => {
              console.log(data);
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo;

    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true,
      })
    }
  },

  onJumpToAbout(e) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  getMyBookCount() {
    bookModal.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },

  // 获取我喜欢数据
  getMyFavor() {
    classicModal.getMyFavor(res => {
      console.log(res);
      this.setData({
        classics: res
      })
    })
  }
})