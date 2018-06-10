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
    textStyle:{
      color:'#fff',
      fontSize:12
    }
  },
  // toolbox: {
  //   show: true,
  //   feature: {
  //     dataView: {
  //       readOnly: false
  //     },
  //     restore: {},
  //     saveAsImage: {}
  //   },
  //   iconStyle:{
  //     color:'#fff'
  //   }
  // },
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
        now = new Date(now - 2000);
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
    // name: '短信量',
    // nameTextStyle:{
    //   color:'#fff'
    // },
    max: 50000,
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
  }]
};
/*$(".ibox3>ibox-content").onresize = function () {
    lineChart.resize(); //使第一个图表适应
}*/
lineChart.setOption(lineoption);

//定时器
/*
setInterval(function () {
  //toLocalTimeString()将当前时间转换成字符串
  //正则，将非数字转换为空
  axisData = (new Date()).toLocaleTimeString().replace(/^\D*!/, '');

  var data0 = lineoption.series[0].data;
  //将数组的第一个元素删除并且返回第一个元素的值
  data0.shift();
  //Math.round四舍五入
  data0.push(Math.round(Math.random() * 50000));
  //将x轴data第一项删除
  lineoption.xAxis.data.shift();
  //将当前时间push进data数组
  lineoption.xAxis.data.push(axisData);
  //绘制chart
  lineChart.setOption(lineoption);
}, 2000);*/
