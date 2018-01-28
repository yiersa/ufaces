// pages/detail/detail.js
const AV = require('../../av-weapp-min.js');
const util = require('../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        itemData: {}
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
        let id = options.id;
        if (id) {
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
    queryDetail: function (id) {
        let that = this;
        var paramsJson = {
            id: id
        };
        AV.Cloud.run('getArticle', paramsJson).then(function (data) {
            // 调用成功，得到成功的应答 data
            if (data && data.errorCode == '0') {
                let item = {
                    'title': data.data.title,
                    'content': data.data.content,
                    'nickName': data.data.nickName,
                    'label': data.data.label,
                    'time': util.formatTime(data.data.createdAt),
                    'id': data.data.objectId,
                    'origin': data.data.origin,
                    'commentCount': data.data.commentCount < 99 ? data.data.commentCount : 99
                }
                that.setData({
                    itemData: item
                });
            } else {
                that.setData({
                    itemData: {}
                });
            }
        }, function (err) {
            // 处理调用失败
            that.setData({
                itemData: {}
            });
        });


    },
    setClipboard: function () {
        let that = this;
        wx.setClipboardData({
            data: that.data.itemData.origin,
            success: function (res) {
                wx.showToast({
                    title: '成功复制到剪贴板',
                    icon: 'success',
                    duration: 2000,
                    mask: true
                })
            },
            fail: function () {
                wx.showToast({
                    title: '复制到剪贴板失败',
                    icon: 'none',
                    duration: 2000,
                    mask: true
                })
            }
        })
    },
    openComment:function () {
        let id = this.data.itemData.id;
        wx.navigateTo({
            url: '../comment/comment?id=' + id
        })
    }
})