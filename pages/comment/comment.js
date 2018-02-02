// pages/comment/comment.js
const AV = require('../../av-weapp-min.js');
const util = require('../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        isAgree: false,
        isShowTk: false,
        dataList: [],
        content:'',
        userInfo:{},
        showTopTips:false,
        tips:''
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
            this.setData({
                id: id
            })
            wx.showLoading({
                title: '加载中',
                mask: true
            })
            this.queryComment(this.data.id);
        } else {
            this.showTopTips('参数错误');
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
        let paramsJson = {
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
    addComment:function () {

        let that = this;
        let paramsJson = {
            actionType: '1'
        };
        let comment = {
            'content': this.data.content,
            'userId': this.data.userInfo.id,
            'nickName': this.data.userInfo.nickName,
            'avatarUrl':this.data.userInfo.avatarUrl,
            'articleId': this.data.id
        }
        paramsJson.comment = comment;

        AV.Cloud.run('addComment', paramsJson).then(function (data) {
            // 调用成功，得到成功的应答 data
            wx.hideLoading();
            if (data && data.errorCode == '0') {
                wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 2000
                })
                let datas = that.data.dataList;
                let item = {
                    'content': data.data.content,
                    'nickName': data.data.nickName,
                    'avatarUrl': data.data.avatarUrl,
                    'time': util.formatTime(data.data.createdAt),
                    'id': data.data.objectId,
                    'articleId': data.data.articleId,
                    'userId': data.data.userId
                }
                datas.push(item);
                that.setData({
                    dataList: datas,
                    isShowTk: false
                });
            } else {
                that.showTopTips('提交失败');
            }
        }, function (err) {
            // 处理调用失败
            wx.hideLoading();
            that.showTopTips('提交失败');
        });
    },
    confirm: function (e) {
        if (this.checkInputValue()) {
            this.addComment();
        }
    },
    checkInputValue: function () {
        if (!this.data.id) {
            this.showTopTips('参数错误');
            return false;
        }
        if (!this.data.userInfo.id) {
            this.showTopTips('未登录');
            return false;
        }
        if (!this.data.content) {
            this.showTopTips('请输入内容');
            return false;
        }
        if (this.data.content.length > 300) {
            this.showTopTips('内容过长');
            return false;
        }
        if (!this.data.isAgree) {
            this.showTopTips('须同意使用条款才能使用本功能');
            return false;
        }
        return true;
    },
    openComment: function (event) {
        this.setData({
            isShowTk: true
        });
    },
    closeComment: function (event) {
        this.setData({
            isShowTk: false
        });
    },
    bindContentInput:function (event) {
        this.setData({
            content: event.detail.value
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
})