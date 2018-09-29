Page({
  data: {
    currentTab: 0, //默认显示第一个
    clientHeight: '', //可视区域高度
    headerHeight: '', //顶部高度
    tabHeight: '', //切换高度
    searchHeight: '', //搜索高度
    footerHeight: '', //底部高度
    selectedHeight: '', //选择数据的高度
    initial_selectedHeight: '', //初始化的选择数据的高度
    hidden: true,
    // 人员数据
    personnel: [{
      listName: '李燕燕'
    }, {
      listName: '李燕燕'
    }, {
      listName: '李燕燕'
    }, {
      listName: '李燕燕'
    }, {
      listName: '李燕燕'
    }, {
      listName: '李燕燕'
    }, {
      listName: '李燕燕'
    }],
    // 部门数据
    list: [{
      listName: '财务部',
      item: [{
        itemName: '财务部1-1',
        content: [{
          contentNme: '1-1中的内容1'
        }, {
          contentNme: '1-1中的内容2'
        }]
      }, {
        itemName: '财务部1-2',
        content: [{
          contentNme: '1-2中的内容1'
        }, {
          contentNme: '1-2中的内容2'
        }]
      }, {
        itemName: '财务部1-3',
        content: [{
          contentNme: '1-3中的内容1'
        }, {
          contentNme: '1-3中的内容2'
        }]
      }]
    }, {
      listName: '列表2',
      item: [{
        itemName: '子列表2-1',
        content: [{
          contentNme: '2-1中的内容1'
        }, {
          contentNme: '2-1中的内容2'
        }]
      }, {
        itemName: '子列表2-2',
        content: [{
          contentNme: '2-2中的内容1'
        }, {
          contentNme: '2-2中的内容2'
        }]
      }, {
        itemName: '子列表2-3',
        content: [{
          contentNme: '2-3中的内容1'
        }, {
          contentNme: '2-3中的内容2'
        }]
      }]
    }, {
      listName: '列表3',
      item: [{
        itemName: '子列表3-1',
        content: [{
          contentNme: '3-1中的内容1'
        }, {
          contentNme: '3-1中的内容2'
        }]
      }, {
        itemName: '子列表3-2',
        content: [{
          contentNme: '3-2中的内容1'
        }, {
          contentNme: '3-2中的内容2'
        }]
      }, {
        itemName: '子列表3-3',
        content: [{
          contentNme: '3-3中的内容1'
        }, {
          contentNme: '3-3中的内容2'
        }]
      }]
    }]
  },
  //滑动切换
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //点击切换底部选人数据并重新计算列表数据的高度，保持一屏显示
  selectedListToggle: function() {
    var that = this;
    var hiddenValue = !that.data.hidden;
    var initial_selectedHeight = that.data.initial_selectedHeight;
    // console.log(initial_selectedHeight)
    that.setData({
      hidden: hiddenValue
    });
    if (!hiddenValue) {
      var query = wx.createSelectorQuery();
      query.select('.addressList-selected').boundingClientRect();
      query.exec(function(res) {
        that.setData({
          selectedHeight: res[0].height
        });
      });
    } else if (hiddenValue) {
      that.setData({
        selectedHeight: initial_selectedHeight
      });
    }
  },
  //点击最外层列表展开收起(全部、部门和群组统一一个，项目需要分开)
  listTap(e) {
    console.log('触发了最外层');
    let Index = e.currentTarget.dataset.parentindex, //获取点击的下标值 
      list = this.data.list;
    list[Index].show = !list[Index].show || false; //变换其打开、关闭的状态 
    if (list[Index].show) { //如果点击后是展开状态，则让其他已经展开的列表变为收起状态 
      this.packUp(list, Index);
    }
    this.setData({
      list
    });
  },
  //点击里面的子列表展开收起 
  listItemTap(e) {
    let parentindex = e.currentTarget.dataset.parentindex, //点击的内层所在的最外层列表下标 
      Index = e.currentTarget.dataset.index, //点击的内层下标 
      list = this.data.list;
    // console.log(list[parentindex].item, Index);
    list[parentindex].item[Index].show = !list[parentindex].item[Index].show || false; //变换其打开、关闭的状态 
    if (list[parentindex].item[Index].show) { //如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开 
      for (let i = 0, len = list[parentindex].item.length; i < len; i++) {
        if (i != Index) {
          list[parentindex].item[i].show = false;
        }
      }
    }
    this.setData({
      list
    });
  },
  //让所有的展开项，都变为收起 
  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) { //其他最外层列表变为关闭状态 
      if (index != i) {
        data[i].show = false;
        for (let j = 0; j < data[i].item.length; j++) { //其他所有内层也为关闭状态 
          data[i].item[j].show = false;
        }
      }
    }
  },
  // 加载页面计算列表内容高度
  onLoad: function() {
    var that = this;
    nodeHeight('.page-header', 'headerHeight');
    nodeHeight('.swiper-tab', 'tabHeight');
    nodeHeight('.content-search', 'searchHeight');
    nodeHeight('.form-button', 'footerHeight');
    nodeHeight('.addressList-selected', 'selectedHeight');
    nodeHeight('.addressList-selected', 'initial_selectedHeight');
    wx.getSystemInfo({
      success: function(res) {
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
      query.exec(function(res) {
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
          case 'searchHeight':
            that.setData({
              searchHeight: Math.ceil(res[0].height)
            });
            break;
          case 'footerHeight':
            that.setData({
              footerHeight: res[0].height
            });
            break;
          case 'selectedHeight':
            that.setData({
              selectedHeight: res[0].height
            });
            break;
          case 'initial_selectedHeight':
            that.setData({
              initial_selectedHeight: res[0].height
            });
            break;
        }
      });
    }
  }
})