// pages/commentedlist/commentedList.js
const AV = require('../../av-weapp-min.js');
const app = getApp()
const util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
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
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        this.queryArr();
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
    queryArr: function () {
        var that = this;
        var paramsJson = {
            userId: app.globalData.userInfo.id
        };
        AV.Cloud.run('getCommentedArticleList', paramsJson).then(function (data) {
            // 调用成功，得到成功的应答 data
            wx.hideLoading();
            if (data && data.errorCode == '0') {
                let datas = [];
                if (data.data.length === 20) {
                    that.data.isHaveMore = true;
                } else {
                    that.data.isHaveMore = false;
                }
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
    openDetail: function (event) {
        if (event) {
            let id = event.currentTarget.dataset.itemId;
            wx.navigateTo({
                url: '../detail/detail?id=' + id
            })
        }
    },
})