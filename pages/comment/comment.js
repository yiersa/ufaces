// pages/comment/comment.js
const AV = require('../../av-weapp-min.js');
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
      isAgree: false,
      isShowTk:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let id = options.id;
      if (id) {
          this.setData({
              id: id
          })
          wx.showLoading({
              title: '加载中',
              mask: true
          })
          this.queryComment(this.data.id);
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
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    },
    queryComment: function (id) {
        let that = this;
        var paramsJson = {
            articleId: id
        };
        AV.Cloud.run('getComment', paramsJson).then(function (data) {
            // 调用成功，得到成功的应答 data
            wx.hideLoading();
            if (data && data.errorCode == '0') {
                let datas = [];
                for (let i = 0; i < data.data.length; i++) {
                    let item = {
                        'content': data.data[i].content,
                        'nickName': data.data[i].nickName,
                        'avatarUrl': data.data[i].avatarUrl,
                        'time': util.formatTime(data.data[i].createdAt),
                        'id': data.data[i].objectId,
                        'articleId': data.data[i].articleId,
                        'userId': data.data[i].userId
                    }
                    datas.push(item);
                }

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
            wx.hideLoading();
            that.setData({
                dataList: []
            });
        });
    },
})