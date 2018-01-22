// pages/mainlist/mainlist.js
const AV = require('../../av-weapp-min.js');
const app = getApp()
const util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
  data: {
    dataList : []
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      this.queryArr(0);
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
    queryArr : function(page) {
      var that = this;
      if (page < 0) {
        page = 0;
      }
      var paramsJson = {
        page: page,
        limit:20
      };
      AV.Cloud.run('getArticleList', paramsJson).then(function (data) {
        // 调用成功，得到成功的应答 data
        if (data && data.errorCode == '0') {
          let datas = [];
          for (let i = 0; i < data.data.length; i++) {
            let item = {
              'title': data.data[i].title,
              'content': data.data[i].content,
              'nickName': data.data[i].nickName,
              'label': data.data[i].label, 
              'time': util.formatTimeNoHour(data.data[i].createdAt),
              'id': data.data[i].objectId,
              'commentCount': data.data[i].commentCount < 99 ? data.data[i].commentCount : 99
            }
            //
            datas.push(item);
          }
          // that.data.dataList = datas //赋值不起效
          that.setData({
            dataList: datas
          });
        } else {
          that.setData({
            dataList: []
          });
        }
      }, function (err) {
        // 处理调用失败
        that.setData({
          dataList: []
        });
      });
    },
    openDetail: function (event) {
      if (event) {
        let id = event.currentTarget.dataset.itemId;
        wx.navigateTo({
          url: '../detail/detail?id=' + id 
        })
      }
    },
    openMinePage:function() {
      wx.navigateTo({
        url: '../mine/mine',
      })
    },
    openAddPage:function() {
      wx.navigateTo({
        url: '../edit/edit',
      })
    }
})