var calendar = require('../../utils/getMonthData.js');
Page({
  data: {
    currentTab: 0, //默认显示第一个
    clientHeight: '', //可视区域高度
    headerHeight: '', //顶部高度
    tabHeight: '', //切换高度
    footerHeight: '', //底部高度
    year: '', //当前年份
    month: '', //当前月份
    days: '', //当前月天数数据
    getDate: '', //当天日期
    getMonth: '', //当前月份
    calendarHeight: 'auto', //日历高度
    arrow: '', //判断箭头
    selectDate: '', //判断是否选择(日期)
    selectMonth: '', //判断是否选择(月份)
    // 底部tab数据
    tabItems: [{
      text: '首页',
      icon: '../../images/home.png',
      url: '../../pages/index/index',
      actived: ''
    },
    {
      text: '流程',
      icon: '../../images/flow.png',
      url: '../../pages/flow/flow',
      actived: ''
    },
    {
      text: '我的',
      icon: '../../images/mine.png',
      url: '../../pages/setting/setting',
      actived: ''
    }
    ]
  },
  // 滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  // 点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  calendarLayout: function(e) {
    var that = this;
    var query = wx.createSelectorQuery();
    query.select('.day').boundingClientRect();
    query.exec(function (res) {
      if (that.data.calendarHeight == 'auto') {
        that.setData({
          calendarHeight: '60rpx',
          arrow: 'arrow-down'
        })
      } else if (that.data.calendarHeight == '60rpx') {
        that.setData({
          calendarHeight: 'auto',
          arrow: ''
        })
      }
    });
  },
  clickDate: function(e) {
    this.setData({
      selectDate: e.target.dataset.date,
      selectMonth: e.target.dataset.month
    })
  },
  // 加载页面计算列表内容高度
  onLoad: function () {
    // console.log(this.data);
    var that = this;
    nodeHeight('.page-header', 'headerHeight');
    nodeHeight('.swiper-tab', 'tabHeight');
    nodeHeight('.page-footer', 'footerHeight');
    var date = new Date(); //获取当前日期
    // console.log(days.showDate);
    this.setData({
      year: calendar.getMonthData().year,
      month: calendar.getMonthData().month,
      days: calendar.getMonthData().days,
      getDate: date.getDate(),
      getMonth: date.getMonth() + 1
    });
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.windowHeight);
        that.setData({
          // 可视区域高度
          clientHeight: res.windowHeight
        });
      }
    });
    // 获取节点高度
    function nodeHeight(nodeName, nodeHeight) {
      var nodeHeight;
      var query = wx.createSelectorQuery();
      query.select(nodeName).boundingClientRect();
      query.exec(function (res) {
        switch (nodeHeight) {
          case 'headerHeight':
            that.setData({
              headerHeight: res[0].height
            });
            break;
          case 'tabHeight':
            that.setData({
              tabHeight: res[0].height
            });
            break;
          case 'footerHeight':
            that.setData({
              footerHeight: res[0].height
            });
            break;
        }
      });
    };
  }
})