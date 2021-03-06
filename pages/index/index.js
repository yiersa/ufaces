//index.js
//获取应用实例
const app = getApp()
const AV = require('../../av-weapp-min.js');
Page({
    data: {
        motto: '专注打脸20年',
        jumpHint: ['正', '正在', '正在跳', '正在跳转'],
        userInfo: {},
        hasUserInfo: false,
    },
    //事件处理函数
    bindViewTap: function () {
        wx.reLaunch({
            url: '../mainlist/mainlist',
        })

    },
    onLoad: function () {
        let that = this;
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
            that.openNextPageDelay();
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let that = this;
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res =>
        {
            this.setData({
                userInfo: res,
                hasUserInfo: true
            })
            setTimeout(function () {
                that.openNextPageDelay();
            }, 2000);

        }
    },
    getUserInfo: function (e) {
        let that = this;
        AV.User.loginWithWeapp().then(user => {
            app.globalData.userInfo = user.attributes;
        app.globalData.userInfo.id = user.id;
        that.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
        })
        that.openNextPageDelay();
    }).catch(console.error);
    },
    openNextPageDelay: function () {
        let that = this;
        let index = 0;
        let timer = setInterval(function () {
            if (index == that.data.jumpHint.length) {
                clearInterval(timer);
                wx.reLaunch({
                    url: '../mainlist/mainlist',
                })
            }
            that.setData({
                motto: that.data.jumpHint[index]
            });
            index++;
        }, 300);


    }
})
