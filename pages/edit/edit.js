// pages/edit/edit.js
const AV = require('../../av-weapp-min.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
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
        this.setData({
            userInfo: app.globalData.userInfo
        })
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
    queryDetail: function(id) {
        var paramsJson = {
            id: id
        };
        AV.Cloud.run('getArticle', paramsJson).then(function (data) {
            // 调用成功，得到成功的应答 data
            if (data && data.errorCode == '0') {
                that.setData({
                    id: data.objectId,
                    showTopTips: false,
                    isAgree: false,
                    label: data.label,
                    origin: data.origin,
                    title: data.title,
                    content: data.content,
                });
            } else {
                that.setData({
                    id: '',
                    showTopTips: false,
                    isAgree: false,
                    label: '',
                    origin: '',
                    title: '',
                    content: '',
                    tips: ''
                });
            }
        }, function (err) {
            // 处理调用失败
            that.setData({
                id: '',
                showTopTips: false,
                isAgree: false,
                label: '',
                origin: '',
                title: '',
                content: '',
                tips: ''
            });
        });
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
                'userId': this.userInfo.id,
                'nickName': this.userInfo.nickName,
                'avatarUrl': this.userInfo.avatarUrl,
                'label': this.data.label,
                'origin':this.data.origin,
            }
        };
        if (this.data.id) {
            paramsJson.type = '2';
            paramsJson.objectId = this.data.id;
        } else {
            paramsJson.type = '1';
        }

        AV.Cloud.run('getArticle', paramsJson).then(function (data) {
            // 调用成功，得到成功的应答 data
            wx.hideLoading();
            if (data && data.errorCode == '0') {

            } else {

            }
        }, function (err) {
            // 处理调用失败

        });
    },
    showTopTips: function () {
        var that = this;
        this.setData({
            showTopTips: true
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
            this.setData({
                tips: '请输入标签'
            });
            this.showTopTips();
            return false;
        }
        if (this.data.label.length > 20) {
            this.setData({
                tips: '标签过长'
            });
            this.showTopTips();
            return false;
        }
        if (!this.data.origin) {
            this.setData({
                tips: '请输入网址'
            });
            this.showTopTips();
            return false;
        }
        if (this.data.origin.length > 500) {
            this.setData({
                tips: '网址过长'
            });
            this.showTopTips();
            return false;
        }
        if (!this.data.title) {
            this.setData({
                tips: '请输入标题'
            });
            this.showTopTips();
            return false;
        }
        if (this.data.title.length > 50) {
            this.setData({
                tips: '标题过长'
            });
            this.showTopTips();
            return false;
        }
        if (!this.data.content) {
            this.setData({
                tips: '请输入内容'
            });
            this.showTopTips();
            return false;
        }
        if (this.data.content.length > 3000) {
            this.setData({
                tips: '内容过长'
            });
            this.showTopTips();
            return false;
        }
        if (!this.data.isAgree) {
            this.setData({
                tips: '未同意使用条款'
            });
            this.showTopTips();
            return false;
        }
        return true;
    }
})