var calendar = require('../../utils/weeklyCalendar.js');
var date = new Date(); //获取当前日期
var currDay = date.getDay(); //返回表示星期的某一天的数字
Page({
  data: {
    currentTab: 0, //默认显示第一个
    clientHeight: '', //可视区域高度
    headerHeight: '', //顶部高度
    tabHeight: '', //切换高度
    footerHeight: '', //底部高度
    weeks: '', //当前周天数数据
    currentDate: '', //当天日期
    currentMonth: '', //当前月份
    currentYear: '', //当前年份
    showMonth: '', //标题的月份
    showYear: '', //标题的年份
    selectDate: '', //判断是否选择(日期)
    selectMonth: '', //判断是否选择(月份)
    selectYear: '', //判断是否选择（年份）
    clickedTimes: 0, //计算上一周和下一周数据
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
      });
    }
  },
  clickPrevWeek: function() {
    var getWeeks = calendar.changeWeek(++this.data.clickedTimes, date, currDay);
    // console.log(getWeeks);
    this.setData({
      weeks: getWeeks,
      showYear: getWeeks[0].year,
      showMonth: getWeeks[0].month
    });
    // console.log(this.data.clickedTimes);
  },
  clickNextWeek: function () {
    var getWeeks = calendar.changeWeek(--this.data.clickedTimes, date, currDay);
    this.setData({
      weeks: getWeeks,
      showYear: getWeeks[0].year,
      showMonth: getWeeks[0].month
    });
    // console.log(this.data.clickedTimes);
  },
  clickDate: function(e) {
    this.setData({
      selectDate: e.target.dataset.date,
      selectMonth: e.target.dataset.month,
      selectYear: e.target.dataset.year
    });
  },
  // 加载页面计算列表内容高度
  onLoad: function () {
    // console.log(this.data);
    var that = this;
    nodeHeight('.page-header', 'headerHeight');
    nodeHeight('.swiper-tab', 'tabHeight');
    nodeHeight('.page-footer', 'footerHeight');
    // console.log(calendar.getWeeklyCalendar());
    var month = date.getMonth() + 1;
    this.setData({
      weeks: calendar.getWeeklyCalendar(-currDay, date),
      currentDate: date.getDate(),
      currentMonth: month < 10 ? '0' + month : month,
      currentYear: date.getFullYear(),
      showMonth: month < 10 ? '0' + month : month,
      showYear: date.getFullYear()
    });
    console.log(this.data.weeks[6].month);
    console.log(this.data.currentMonth);
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
    }
  }
});