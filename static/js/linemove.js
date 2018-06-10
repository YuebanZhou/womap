var mainChart = echarts.init(document.getElementById('main-two'));
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
    }
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
        //now = new Date(now - 2000);
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
    max: 50000,
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
    data: (function () {
      //临时数组
      var res = [];
      //数组长度
      var len = 0;
      while (len < 10) {
        //将随机数push进临时数组
        //toFixed()将随机数四舍五入，括号中参数表示小数的位数
        res.push((Math.random() * 50000).toFixed(1) - 0);
        //push进一个随机数，长度就+1
        len++;
      }
      return res;
    })()
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
};


//定时器
timer = setInterval(function () {

  //console.log(mainoption.xAxis.data.length);
  //x轴push进的数据的个数
  //toLocalTimeString()将当前时间转换成字符串
  //正则，将非数字转换为空
  axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

  var data0 = mainoption.series[0].data;
  //将数组的第一个元素删除并且返回第一个元素的值
  //data0.shift();
  //Math.round四舍五入
  data0.push(Math.round(Math.random() * 50000));
  //将x轴data第一项删除
  //mainoption.xAxis.data.shift();
  //将当前时间push进data数组
  mainoption.xAxis.data.push(axisData);
  //绘制chart
  //len是x轴数组push进的数据
  var len = mainoption.xAxis.data.length
  //设置datazoom的start
  //默认显示10个点，10/len表示当前显示的10个点占总内容的百分比
  //100减去上面的结果表示start开始的地方
  var num = 100 - 10 / len * 100
  //设置start
  mainoption.dataZoom[0].start = num
  mainChart.setOption(mainoption);
}, 1000);



function econsole() {
  console.log("object");
  clearInterval(timer)
}
$("#restart").click(function () {
  console.log("restart");
  timer = setInterval(function () {

    //console.log(mainoption.xAxis.data.length);
    //x轴push进的数据的个数
    //toLocalTimeString()将当前时间转换成字符串
    //正则，将非数字转换为空
    axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

    var data0 = mainoption.series[0].data;
    //将数组的第一个元素删除并且返回第一个元素的值
    //data0.shift();
    //Math.round四舍五入
    data0.push(Math.round(Math.random() * 50000));
    //将x轴data第一项删除
    //mainoption.xAxis.data.shift();
    //将当前时间push进data数组
    mainoption.xAxis.data.push(axisData);
    //绘制chart
    //len是x轴数组push进的数据
    var len = mainoption.xAxis.data.length
    //设置datazoom的start
    //默认显示10个点，10/len表示当前显示的10个点占总内容的百分比
    //100减去上面的结果表示start开始的地方
    var num = 100 - 10 / len * 100
    //设置start
    mainoption.dataZoom[0].start = num
    mainChart.setOption(mainoption);
  }, 1000);
})