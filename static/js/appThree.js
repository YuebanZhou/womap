// 时间数组，用于存放当前时刻以及前五分钟时刻
var arr = [];
// 用来存放arr对应的发送量数组
var arrdata = [];
// 发送量初始值
var temp = 0;
// 获取时间
dataTime();
console.log(arr);
for (var i = 0; i < arr.length; i++) {
  arrdata.push(getmesage(arr[i]))
}
console.log(arrdata);
// 获取时间函数
function dataTime() {
  for (var i = 0; i < 5; i++) {
    var d = new Date();
    var ndt = new Date(d.getTime() - 1000 * 60 * i);//将转换之后的时间减去一分钟
    var year = ndt.getFullYear() + "";
    var month = ndt.getMonth() + 1 + "";
    var day = ndt.getDate() + "";
    var hour = ndt.getHours() + "";
    var minute = ndt.getMinutes() + "";
    if (month < 10 && month >= 0) {
      month = "0" + month;
    }
    if (day < 10 && day >= 0) {
      day = "0" + day;
    }
    if (hour < 10 && hour >= 0) {
      hour = "0" + hour;
    }
    if (minute < 10 && minute >= 0) {
      minute = "0" + minute
    }
    today = year + month + day + hour + minute;
    arr.push(today);

  }
  // 翻转数组
  arr.reverse()

}
//获取后台数据 
function getmesage(queryDate) {
  $.ajax({
    type: 'post',
    async: false,
    // async: false,
    url: "http://10.162.26.182:10002/wo_send/jzyx/getRoamingPhone",
    data: {
      send: queryDate
    },
    success: function (result) {
      console.log("请求成功");
      console.log(result);
      temp = result.code
    },
    error: function () {
      console.log("请求失败")
    }
  });
  return temp
}
// 绘制折线图

//绘制index页面上静态的折线图
var lineChart = echarts.init(document.getElementById("echarts-line-chart"));
var lineoption = {
  title: {
    text: '动态数据',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      label: {
        backgroundColor: '#283b56',
      },
    },
  },

  legend: {
    data: ['短信发送量'],
    textStyle: {
      color: '#fff',
      fontSize: 12
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    //x轴的时间信息
    data: (function () {
      //获取当前日期
      var now = new Date();
      //临时数组
      var res = [];
      //设置长度是10
      var len = 5;

      while (len--) {
        //unshift向开头添加一个或多个元素
        //开头添加当前时间
        //将字符串中非数字转换成空
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
        //日期为当前日期减去1000毫秒
        // 乘60，表示展示每分钟的数据
        now = new Date(now - 1000 * 60);
      }
      return res;
    })(),
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff'
      },
      //数据全部展示，不隐藏
      interval: 0
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    }
  },
  yAxis: {
    type: 'value',
    scale: true,
    // name: '短信量',
    // nameTextStyle:{
    //   color:'#fff'
    // },
    // max: 100,
    min: 0,
    boundaryGap: [0.1, 0.1],
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff'
      },
      //数据全部展示，不隐藏
      interval: 0
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    }
  },
  grid: {
    x: '50',
    y: '50',
    width: '80%',
    height: '55%'
  },
  series: [{
    name: '短信发送量',
    type: 'line',
    // data: (function () {
    //   //临时数组
    //   var res = [];

    //   for (var i = 0; i < arr.length; i++) {
    //     res.push(getmesage(arr[i]))

    //   }
    //   return res;
    // })()
    data: arrdata
  }]
};
lineChart.setOption(lineoption);

