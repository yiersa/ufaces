// pages/edit/edit.js
const AV = require('../../av-weapp-min.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showTopTips: false,
        isAgree: false,
        label: '',
        origin: '',
        title: '',
        content: '',
        tips: '',
        userInfo:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo
          
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
    submitInfo:function () {
        wx.showLoading({
            title: '提交中',
            mask: true
        })
        var paramsJson = {
            'article':{
                'title': this.data.title,
                'content': this.data.content,
                'userId': this.data.userInfo.id,
                'nickName': this.data.userInfo.nickName,
                'avatarUrl': this.data.userInfo.avatarUrl,
                'label': this.data.label,
                'origin':this.data.origin,
            },
            'actionType':'1'
        };
        AV.Cloud.run('addArticle', paramsJson).then(function (data) {
            // 调用成功，得到成功的应答 data
            wx.hideLoading();
            if (data && data.errorCode == '0') {
                //跳转详情页面
              let id = data.data.objectId;
              wx.navigateTo({
                url: '../detail/detail?id=' + id
              })

            } else {
                this.showTopTips('提交失败');
            }
        }, function (err) {
            // 处理调用失败
            this.showTopTips('提交失败');
        });
    },
    showTopTips: function (tips) {
        var that = this;
        this.setData({
            showTopTips: true,
            tips: tips
        });
        setTimeout(function () {
            that.setData({
                showTopTips: false
            });
        }, 3000);
    },
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    },
    confirm: function (e) {
        if (this.checkInputValue()) {
            this.submitInfo();
        }
    },
    checkInputValue: function () {
        if (!this.data.label) {
            this.showTopTips('请输入标签');
            return false;
        }
        if (this.data.label.length > 20) {
            this.showTopTips('标签过长');
            return false;
        }
        if (!this.data.origin) {
            this.showTopTips('请输入网址');
            return false;
        }
        if (this.data.origin.length > 500) {
            this.showTopTips('网址过长');
            return false;
        }
        if (!this.data.title) {
            this.showTopTips('请输入标题');
            return false;
        }
        if (this.data.title.length > 50) {
            this.showTopTips('标题过长');
            return false;
        }
        if (!this.data.content) {
            this.showTopTips('请输入内容');
            return false;
        }
        if (this.data.content.length > 3000) {
            this.showTopTips('内容过长');
            return false;
        }
        if (!this.data.isAgree) {
            this.showTopTips('须同意使用条款才能使用本功能');
            return false;
        }
        return true;
    },
    bindLabelInput:function(e) {
      this.setData({
        label: e.detail.value
      });
    },
    bindOriginInput: function (e) {
      this.setData({
        origin: e.detail.value
      });
    },
    bindTitleInput: function (e) {
      this.setData({
        title: e.detail.value
      });
    },
    bindContentInput: function (e) {
      this.setData({
        content: e.detail.value
      });
    },
})