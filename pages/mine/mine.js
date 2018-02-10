// pages/mine/mine.js
const AV = require('../../av-weapp-min.js');
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},
      showMineTips:false,
      showCommentTips:false,
      createdTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (app.globalData.userInfo) {
        let time = util.formatTime(app.globalData.userInfo.createdAt);
          this.setData({
              userInfo: app.globalData.userInfo,
              createdTime:time
          })
      }
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
    openMineListPage:function () {
        wx.navigateTo({
            url: '../minelist/mineList',
        })
    },
    openCommentedListPage:function () {
        wx.navigateTo({
            url: '../commentedlist/commentedList',
        })
    }
})