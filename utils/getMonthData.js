// 获取月份数据
function getMonthData() {
    var ret = []; //用于储存当前月份、日期（会小于1和大于31）和真实日期

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1; //js获取的月份会自动少1（比如9月份显示8）

    var firstDay = new Date(year, month - 1, 1); //获取该月份第一天
    var firstDayWeekDay = firstDay.getDay(); //获取月份第一天是星期几
    if (firstDayWeekDay === 0) { //周日显示0，为了计算，换算为7
        firstDayWeekDay = 7;
    }
    year = firstDay.getFullYear();
    month = firstDay.getMonth() + 1;
    var lastDayOfLastMonth = new Date(year, month - 1, 0); //获取上个月最后一天
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate(); //获取上个月最后一天的日期
    var preMonthDayCount = firstDayWeekDay - 1; //计算上个月显示几天（比如该月份第一天是周二，上个月就显示1天（2-1））
    var lastDay = new Date(year, month, 0); //获取该月份的最后一天
    var lastDate = lastDay.getDate(); //获取该月份最后一天的日期
    var weekCount = Math.ceil((preMonthDayCount + lastDate) / 7); //获取每个月多少周

    for (var i = 0; i < 7 * weekCount; i++) {
        var date = i + 1 - preMonthDayCount; //为了让月份第一天显示日期1
        var showDate = date; //showDate用于计算跨界问题
        var thisMonth = month;
        if (date <= 0) {
            // 上一月
            thisMonth = month - 1; //获取上个月的月份
            showDate = lastDateOfLastMonth + date; //修正上个月的日期（减去相应天数）
        } else if (date > lastDate) {
            // 下一月
            thisMonth = month + 1; //获取下个月的月份
            showDate = date - lastDate; //修正下个月的日期
        }
        if (thisMonth === 0) {
            thisMonth = 12; //上一年12月份
        }
        if (thisMonth === 13) {
            thisMonth = 1; //下一年的1月份
        }
        // console.log(thisMonth);
        ret.push({
            month: thisMonth,
            date: date,
            showDate: showDate
        });
    }
    return {
        year: year, //显示当前年份
        month: month, //显示当前月份
        days: ret
    };
}

module.exports = {
    getMonthData: getMonthData
};