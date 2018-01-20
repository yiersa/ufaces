// pages/mainlist/mainlist.js
const AV = require('../../av-weapp-min.js');
const app = getApp()
const util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
  data: {
    dataList : [],
    userInfo: {},
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
      if (this.data.userInfo && this.data.userInfo.id) {
        this.queryArr(0);
        // this.init();
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
    init : function() {
      // // 立的flag
      // let Document = AV.Object.extend('ArticleList');
      // let document = new Document();
      // document.set('title', '我要8点起');
      // document.set('content', '明天我要八点起');
      // document.set('userId', this.data.userInfo.id);
      // document.set('nickName', '桃小东');
      // document.set('avatarUrl', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKic4Sia2vW3FdMJH947Q9Ik8g5TaibQxbgtubP9SwssgibLewftpM2M5sDEz91kCswtgCwP9fGyqCCQQ/0');
      // document.set('label', '百度');
      
      // document.set('origin', 'https://www.baidu.com/');
      // let actual = {
      //   'content': '早上11点才起',
      //   'url':'https://www.baidu.com/',
      //   'time': new Date()
      // };
      // document.set('actual', actual);
      // document.set('state', '1');
      // document.set('commentCount', 3);
      // document.save().then(function (item) {
      //   // 成功保存之后，执行其他逻辑.
      //   console.log('New object created with objectId: ' + item.id);
      // }, function (error) {
      //   // 异常处理
      //   console.error('Failed to create new object, with error message: ' + error.message);
      // });
      

      // //评论
      // let Commect = AV.Object.extend('comment');
      // let comment1 = new Commect();
      // comment1.set('content', '哈哈哈哈哈哈笑死我了');
      // comment1.set('time', new Date());
      // comment1.set('userId', this.data.userInfo.id);
      // comment1.set('nickName', '桃小东');
      // comment1.set('avatarUrl', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKic4Sia2vW3FdMJH947Q9Ik8g5TaibQxbgtubP9SwssgibLewftpM2M5sDEz91kCswtgCwP9fGyqCCQQ/0');
      // comment1.set('articleId', '5a5f5aa20b61600044a78fc8');
      // comment1.save().then(function (item) {
      //   console.log('New object created with objectId: ' + item.id);
      // }, function (error) {
      //   console.error('Failed to create new object, with error message: ' + error.message);
      // });
      // let comment2 = new Commect();
      // comment2.set('content', 'heheh');
      // comment2.set('time', new Date());
      // comment2.set('userId', this.data.userInfo.id);
      // comment2.set('nickName', '桃小东');
      // comment2.set('avatarUrl', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKic4Sia2vW3FdMJH947Q9Ik8g5TaibQxbgtubP9SwssgibLewftpM2M5sDEz91kCswtgCwP9fGyqCCQQ/0');
      // comment2.set('articleId', '5a5f5aa20b61600044a78fc8');
      // comment2.save().then(function (item) {
      //   console.log('New object created with objectId: ' + item.id);
      // }, function (error) {
      //   console.error('Failed to create new object, with error message: ' + error.message);
      // });
      // let comment3 = new Commect();
      // comment3.set('content', '哦哦哦哦');
      // comment3.set('time', new Date());
      // comment3.set('userId', this.data.userInfo.id);
      // comment3.set('nickName', '桃小东');
      // comment3.set('avatarUrl', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKic4Sia2vW3FdMJH947Q9Ik8g5TaibQxbgtubP9SwssgibLewftpM2M5sDEz91kCswtgCwP9fGyqCCQQ/0');
      // comment3.set('articleId', '5a5f5aa20b61600044a78fc8');
      // comment3.save().then(function (item) {
      //   console.log('New object created with objectId: ' + item.id);
      // }, function (error) {
      //   console.error('Failed to create new object, with error message: ' + error.message);
      // });
      
      
      
    },
    queryArr : function(page) {
      var that = this;
      if (page < 0) {
        page = 0;
      }
      var paramsJson = {
        type: "list",
        page: page
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
              'time': data.data[i].createdAt,
              'id': data.data[i].objectId,
              'commentCount': data.data[i].commentCount
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
        url: '../mine/mine',
      })
    }
})