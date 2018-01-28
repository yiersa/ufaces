//app.js
const AV = require('/av-weapp-min.js');
const config = require('/pages/config.js');
let appId = config.appId();
let appKey = config.appKey();
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    AV.init({
      appId: appId,
      appKey: appKey,
    });
    let that = this;
    AV.User.loginWithWeapp().then(user => {
      that.globalData.userInfo = user.attributes;
      that.globalData.userInfo.id = user.id;
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      if (that.userInfoReadyCallback) {
        that.userInfoReadyCallback(that.globalData.userInfo)
      }
    }).catch(console.error);
  },
  globalData: {
    userInfo: null
  }
})