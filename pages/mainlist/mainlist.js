// pages/mainlist/mainlist.js
const AV = require('../../av-weapp-min.js');
// 获得当前登录用户
const user = AV.User.current();
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      if (user && user.id) {
        this.queryArr();
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
      // 立的flag
      let Document = AV.Object.extend('document');
      let document = new Document();
      document.set('title', '我要8点起');
      document.set('content', '明天我要八点起');
      document.set('userId', user.id);
      document.set('nickName', '桃小东');
      document.set('origin', 'https://www.baidu.com/');
      document.set('avatarUrl', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKic4Sia2vW3FdMJH947Q9Ik8g5TaibQxbgtubP9SwssgibLewftpM2M5sDEz91kCswtgCwP9fGyqCCQQ/0');
      document.save().then(function (item) {
        // 成功保存之后，执行其他逻辑.
        console.log('New object created with objectId: ' + item.id);
      }, function (error) {
        // 异常处理
        console.error('Failed to create new object, with error message: ' + error.message);
      });

      // //最新打脸情况
      // let Actual = AV.Object.extend('actual');
      // let actual = new Actual();
      // actual.set('content', '早上11点才起');
      // actual.set('time', new Date());
      // actual.set('userId', user.id);
      // actual.set('nickName', '桃小东');
      // actual.set('avatarUrl', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKic4Sia2vW3FdMJH947Q9Ik8g5TaibQxbgtubP9SwssgibLewftpM2M5sDEz91kCswtgCwP9fGyqCCQQ/0');
      // actual.set('documentId', '111111');
      // actual.save().then(function (item) {
      //   console.log('New object created with objectId: ' + item.id);
      // }, function (error) {
      //   console.error('Failed to create new object, with error message: ' + error.message);
      // });
      

      // //评论
      // let Commect = AV.Object.extend('comment');
      // let comment1 = new Commect();
      // comment1.set('content', '早上11点才起');
      // comment1.set('time', new Date());
      // comment1.set('userId', user.id);
      // comment1.set('nickName', '桃小东');
      // comment1.set('avatarUrl', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKic4Sia2vW3FdMJH947Q9Ik8g5TaibQxbgtubP9SwssgibLewftpM2M5sDEz91kCswtgCwP9fGyqCCQQ/0');
      // comment1.set('documentId', '111111');
      // comment1.save().then(function (item) {
      //   console.log('New object created with objectId: ' + item.id);
      // }, function (error) {
      //   console.error('Failed to create new object, with error message: ' + error.message);
      // });
      // let comment2 = new Commect();
      // comment2.set('content', '早上11点才起');
      // comment2.set('time', new Date());
      // comment2.set('userId', user.id);
      // comment2.set('nickName', '桃小东');
      // comment2.set('avatarUrl', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKic4Sia2vW3FdMJH947Q9Ik8g5TaibQxbgtubP9SwssgibLewftpM2M5sDEz91kCswtgCwP9fGyqCCQQ/0');
      // comment2.set('documentId', '111111');
      // comment2.save().then(function (item) {
      //   console.log('New object created with objectId: ' + item.id);
      // }, function (error) {
      //   console.error('Failed to create new object, with error message: ' + error.message);
      // });
      // let comment3 = new Commect();
      // comment3.set('content', '早上11点才起');
      // comment3.set('time', new Date());
      // comment3.set('userId', user.id);
      // comment3.set('nickName', '桃小东');
      // comment3.set('avatarUrl', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKic4Sia2vW3FdMJH947Q9Ik8g5TaibQxbgtubP9SwssgibLewftpM2M5sDEz91kCswtgCwP9fGyqCCQQ/0');
      // comment3.set('documentId', '111111');
      // comment3.save().then(function (item) {
      //   console.log('New object created with objectId: ' + item.id);
      // }, function (error) {
      //   console.error('Failed to create new object, with error message: ' + error.message);
      // });
      
      
      
    },
    queryArr : function() {
      var startDateQuery = new AV.Query('document');
      startDateQuery.greaterThanOrEqualTo('createdAt', new Date('2018-01-09 00:00:00'));

      var endDateQuery = new AV.Query('document');
      endDateQuery.lessThan('createdAt', new Date('2018-01-10 00:00:00'));

      var query = AV.Query.and(startDateQuery, endDateQuery);
      query.find().then(function (results) {
        if(results) {
          let comments = JSON.parse(results[0].attributes.comments);
          let title = results[0].attributes.title;
        
        }
      }, function (error) {
      });

    }
})