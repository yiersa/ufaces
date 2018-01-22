// pages/detail/detail.js
const AV = require('../../av-weapp-min.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    if(id) {
      this.queryDetail(id);
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
  queryDetail: function(id) {
    var query = new AV.Query('document');
    query.equalTo('objectId', id);
    query.find().then(function (results) {
      if (results && results.length > 0) {
        // let comments = JSON.parse(results[0].attributes.comments);
        // let title = results[0].attributes.title;
        let datas = [];
        for (let i = 0; i < results.length; i++) {
          let website = results[i].attributes.origin.website;
          let url = results[i].attributes.origin.url;
          let item = {
            'title': results[i].attributes.title,
            'content': results[i].attributes.content,
            'nickName': results[i].attributes.nickName,
            'website': website,
            'url': url,
            'time': util.formatTimeNoHour(results[i].createdAt),
            'id': results[i].id,
          }
          datas.push(item);
        }

      }
    }, function (error) {
    });
  }
})