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
      // 声明一个 document 类型
      let Document = AV.Object.extend('document');
      // 新建一个 document 对象
      let document = new Document();
      document.set('title', '我要8点起');
      document.set('content', '明天我要八点起');
      document.set('userid', user.id);
      document.set('nickname', '桃小东');
      document.set('origin', 'https://www.baidu.com/');
      document.set('avatarUrl', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKic4Sia2vW3FdMJH947Q9Ik8g5TaibQxbgtubP9SwssgibLewftpM2M5sDEz91kCswtgCwP9fGyqCCQQ/0');
      let actual = {
        'content':'早上11点才起',
        'time': new Date(),
        'userid': user.id,
        'nickname': '桃小东',
'avatarUrl':'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKic4Sia2vW3FdMJH947Q9Ik8g5TaibQxbgtubP9SwssgibLewftpM2M5sDEz91kCswtgCwP9fGyqCCQQ/0'
      };
      document.set('actual', actual);

      let comment1 = {
        'comment':'哈哈哈',
        'userid': user.id,
        'time': new Date(),
        'nickname': '桃小东'
      };
      let comment2 = {
        'comment': 'oooo',
        'userid': user.id,
        'time': new Date(),
        'nickname': '桃小东'
      };
      let comment3 = {
        'comment': '呵呵呵',
        'userid': user.id,
        'time': new Date(),
        'nickname':'桃小东'
      };
      let comments = [comment1, comment2, comment3];
      document.set('comments', JSON.stringify(comments));
      document.save().then(function (item) {
        // 成功保存之后，执行其他逻辑.
        console.log('New object created with objectId: ' + item.id);
      }, function (error) {
        // 异常处理
        console.error('Failed to create new object, with error message: ' + error.message);
      });
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
          let titles = results[0].attributes;
        }
      }, function (error) {
      });

    }
})