//判定定时器是否启动的flag
var flag = false;
//判定定时器是否存在
var exit = false;
// 获取canvas盒子
var mainChart = echarts.init(document.getElementById('main-two'));
// 时间数组，用于存放当前时刻以及往前数十秒时刻
var arrtentime = [];

// 用来计数，是否请求十次数据
var num = 0;
// 用来存放arr对应的发送量数组，假数据
var arrdatavalue = [43, 453, 123, 354, 75, 93, 253, 354, 521, 2];
// 获取真数据之前先渲染假数据
drawchartmove(arrdatavalue)
// 用来存放arr对应的发送量数组，真数据
var arrdatavalue2 = [];
// 发送量初始值
var temp = 0;
// 获取时间
dataTime();
console.log(arrtentime);
for (var i = 0; i < arrtentime.length; i++) {
  getmesagemove(arrtentime[i]);
}

//点击查看详情按钮
$(".consul").click(function () {
  //隐藏地图，静态折线图，显示动态折线图
  $("#main").hide();
  $("#movechart").show();
  $(".ibox3").hide();
  //折线图适配屏幕
  // chartsize();
  // getMessage()
  //手动将标识变成true，这样下面的定时器就可以运行
  flag = true;
  settimer();
  console.log('查看详情');
  // 将数据push进数组
  // for (var i = 0; i < arrtentime.length; i++) {
  //   arrdatavalue.push(getmesagemove(arrtentime[i]))
  // }
})
//点击返回全国地图按钮
$(".return").click(function () {
  // 点击返回全国按钮，直接刷新当前页面
  window.location.reload();
  $(".cover").show()
  //清理定时器
  if (exit) {
    econsole()
  }
  exit = false;
})
//重启定时器按钮
$("#restart").click(function () {
  console.log("restart");
  settimer();
})
//窗口宽度发生改变宽度适配
$(window).resize(function () {
  // chartsize()
})
// 绘制折线图
function drawchartmove(arrdatavalue) {
  mainoption = {
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
          color: '#fff'
        }
      },
      textStyle: {
        color: '#fff'
      },
      position: [10, 350],
      extraCssText: 'width: 80%;height:180px',
      // formatter: function (params) {
      //   return params.name + ' : ' + params.value[2];
      // }
    },

    legend: {
      data: ['短信发送量'],
      textStyle: {
        color: '#fff',
        fontSize: 18
      }

    },
    toolbox: {
      show: true,
      feature: {
        dataView: {
          readOnly: false
        },
        restore: {},
        saveAsImage: {}
      },
      iconStyle: {
        color: '#fff'
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
        var len = 10;

        while (len--) {
          //unshift向开头添加一个或多个元素
          //开头添加当前时间
          //将字符串中非数字转换成空
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          //日期为当前日期减去2000
          now = new Date(now - 1000 * 5);
        }
        return res;
      })(),
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff'
        },
        //数据全部展示，不隐藏
        //interval: 0
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
      name: '短信量',
      nameTextStyle: {
        color: '#fff'
      },
      // max: 50000,
      min: 0,
      boundaryGap: [0.2, 0.2],
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
    series: [{
      name: '短信发送量',
      type: 'line',
      // data: (function () {
      //   //临时数组
      //   var res = [];
      //   //数组长度
      //   var len = 0;
      //   while (len < 10) {
      //     //将随机数push进临时数组
      //     //toFixed()将随机数四舍五入，括号中参数表示小数的位数
      //     res.push((Math.random() * 50000).toFixed(1) - 0);
      //     //push进一个随机数，长度就+1
      //     len++;
      //   }
      //   return res;
      // })(),
      data: arrdatavalue

    }],
    dataZoom: [{

      type: 'inside',
      start: 0,
      end: 100,
      //视图刷新
      throttle: 1000
    }, {
      id: 'handle',
      //手柄样式
      handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      handleStyle: {
        color: '#fff',
        //手柄设置阴影，立体效果
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      },
      backgroundColor: '#333',
      dataBackground: {
        areaStyle: {
          color: '#C23531'
        }
      }
    }],
    grid: {
      width: 'auto'
    }
  };
  mainChart.setOption(mainoption);
}


//定时器
function settimer() {
  if (flag) {
    timer = setInterval(function () {
      //toLocalTimeString()将当前时间转换成字符串
      //正则，将非数字转换为空
      axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

      var data0 = mainoption.series[0].data;
      //将数组的第一个元素删除并且返回第一个元素的值
      //data0.shift();
      //Math.round四舍五入
      // data0.push(Math.round(Math.random() * 10));

      var queryDate = dataTimenow();
      var value = getmesagemove(queryDate)
      console.log(value);
      
      if(value==undefined){
        console.log("进入判断");
        value=0;
      }
      data0.push(value);
      //将x轴data第一项删除
      //mainoption.xAxis.data.shift();
      //将当前时间push进data数组
      mainoption.xAxis.data.push(axisData);
      //len是x轴数组push进的数据
      var len = mainoption.xAxis.data.length
      //设置datazoom的start
      //默认显示10个点，10/len表示当前显示的10个点占总内容的百分比
      //100减去上面的结果表示start开始的地方
      var num = 100 - 10 / len * 100
      mainoption.dataZoom[0].start = num

      //绘制chart
      mainChart.setOption(mainoption);

    }, 1000 * 5);

  };
  //调用定时器结束之后，手动将flag恢复原值
  flag = false;
  exit = true;
}
//清理定时器
function econsole() {
  console.log("清理");
  clearInterval(timer)
  //清理完定时器之后，手动将flag变成true，这样定时器就可以再次运行
  flag = true;
}

// 获取当前十个时间
function dataTime() {
  for (var i = 0; i < 10; i++) {
    var d = new Date();
    var ndt = new Date(d.getTime() - 1000 * 5 * i);//将转换之后的时间减去5秒
    var year = ndt.getFullYear() + "";
    var month = ndt.getMonth() + 1 + "";
    var day = ndt.getDate() + "";
    var hour = ndt.getHours() + "";
    var minute = ndt.getMinutes() + "";
    var seconds = ndt.getSeconds() + "";
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
    if (seconds < 10 && seconds >= 0) {
      seconds = "0" + seconds
    }
    today = year + month + day + hour + minute + seconds;
    arrtentime.push(today);

  }
  // 翻转数组
  arrtentime.reverse()

}
// 获取当前时间
function dataTimenow() {
  for (var i = 0; i < 10; i++) {
    var dn = new Date();
    var yearn = dn.getFullYear() + "";
    var monthn = dn.getMonth() + 1 + "";
    var dayn = dn.getDate() + "";
    var hourn = dn.getHours() + "";
    var minuten = dn.getMinutes() + "";
    var seconds = dn.getSeconds() + "";
    if (monthn < 10 && monthn >= 0) {
      monthn = "0" + monthn;
    }
    if (dayn < 10 && dayn >= 0) {
      dayn = "0" + dayn;
    }
    if (hourn < 10 && hourn >= 0) {
      hourn = "0" + hourn;
    }
    if (minuten < 10 && minuten >= 0) {
      minuten = "0" + minuten
    }
    if (seconds < 10 && seconds >= 0) {
      seconds = "0" + seconds
    }
    todayn = yearn + monthn + dayn + hourn + minuten + seconds;
  }
  console.log(todayn);
  return todayn
}

//获取后台数据 
function getmesagemove(queryDate) {
  $.ajax({
    type: 'post',
    // async: false,
    async: true,
    url: "http://10.162.26.182:10002/wo_send/jzyx/getRoamingPhone",
    data: {
      send: queryDate
    },
    success: function (result) {
      console.log("请求成功");
      console.log(result);
      temp = result.code;
      arrdatavalue2.push(temp);
      num += 1;
      if (num == 10) {
        drawchartmove(arrdatavalue2);

      }
    },
    error: function () {
      console.log("请求失败")
    }
  });
}
