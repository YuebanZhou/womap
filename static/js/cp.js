// 真实数据
var sdata2 = [];
var arr = [];
var sortarr1 = [];
var sortarr2 = [];

//地图容器
var chart = echarts.init(document.getElementById('main'));
//34个省、市、自治区的名字拼音映射数组
var provinces = {
  //23个省
  "台湾": "taiwan",
  "河北": "hebei",
  "山西": "shanxi",
  "辽宁": "liaoning",
  "吉林": "jilin",
  "黑龙江": "heilongjiang",
  "江苏": "jiangsu",
  "浙江": "zhejiang",
  "安徽": "anhui",
  "福建": "fujian",
  "江西": "jiangxi",
  "山东": "shandong",
  "河南": "henan",
  "湖北": "hubei",
  "湖南": "hunan",
  "广东": "guangdong",
  "海南": "hainan",
  "四川": "sichuan",
  "贵州": "guizhou",
  "云南": "yunnan",
  "陕西": "shanxi1",
  "甘肃": "gansu",
  "青海": "qinghai",
  //5个自治区
  "新疆": "xinjiang",
  "广西": "guangxi",
  "内蒙古": "neimenggu",
  "宁夏": "ningxia",
  "西藏": "xizang",
  //4个直辖市
  "北京": "beijing",
  "天津": "tianjin",
  "上海": "shanghai",
  "重庆": "chongqing",
  //2个特别行政区
  "香港": "xianggang",
  "澳门": "aomen"
};

//直辖市和特别行政区-只有二级地图，没有三级地图
var special = ["北京", "天津", "上海", "重庆", "香港", "澳门"];
var mapdata = [];
//分布热点的大小
var ssize = 6;
//绘制全国地图
$.getJSON('static/map/china.json', function (data) {
  d = [];
  for (var i = 0; i < data.features.length; i++) {
    //将地点的名称和cp坐标传入d数组
    d.push({
      name: data.features[i].properties.name,
      value: data.features[i].properties.cp,
    })
  }
  mapdata = d;
  window.onresize = function () {
    chart.resize(); //使第一个图表适应
  }
  //注册地图
  echarts.registerMap('china', data);
  //绘制地图
  renderMap('china', d, sdata2);
});

//地图点击事件
chart.on('click', function (params) {
  if (params.name in provinces) {
    //全国下钻到省级
    console.log("第一级下钻到第二级");
    $.getJSON('static/map/province/' + provinces[params.name] + '.json', function (data) {
      echarts.registerMap(params.name, data);
      var d = [];
      for (var i = 0; i < data.features.length; i++) {
        d.push({
          name: data.features[i].properties.name,
          value: data.features[i].properties.cp,
        })
      }
      // 临时数组，承载本省门店
      var temp = [];
      for (var i = 0; i < sdata2.length; i++) {
        if (params.name == sdata2[i].pro) {
          temp.push({
            name: sdata2[i].name,
            value: sdata2[i].value
          })
        }
      }
      renderMap(params.name, d, temp);
    });
  } else if (params.name in cityMap) {
    //如果是【直辖市/特别行政区】只有二级下钻
    if (special.indexOf(params.name) >= 0) {
      console.log("特殊区域");
      // 临时数组，承载特殊区域门店
      var temp = [];
      for (var i = 0; i < sdata2.length; i++) {
        if (params.name == sdata2[i].pro) {
          temp.push({
            name: sdata2[i].name,
            value: sdata2[i].value
          })
        }
      }

      renderMap('china', mapdata, temp);
    } else {
      //显示县级地图
      console.log("第二级下钻到第三级");
      $.getJSON('static/map/city/' + cityMap[params.name] + '.json', function (data) {
        echarts.registerMap(params.name, data);
        var d = [];
        for (var i = 0; i < data.features.length; i++) {
          d.push({
            name: data.features[i].properties.name,
            value: data.features[i].properties.cp
          })
        }
        renderMap(params.name, d, sdata2);
      });
    }
  } else {
    renderMap('china', mapdata, sdata2);
  }
});

//初始化绘制全国地图配置
var option = {
  //backgroundColor: '#091c3d',
  title: {
    text: '短信活动信息发送数量分布图',
    subtext: '短信活动信息发送数量分布图',
    // link: 'http://www.baidu.com',
    left: 10,
    textStyle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'normal',
      fontFamily: "Microsoft YaHei"
    },
    subtextStyle: {
      color: '#ccc',
      fontSize: 16,
      fontWeight: 'normal',
      fontFamily: "Microsoft YaHei"
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return params.name + ' 短信发送量: ' + params.value[2];
    }
  },
  legend: {
    orient: 'vertical',
    top: 20,
    x: 'center',
    data: ['短信发送量'],
    textStyle: {
      color: '#fff'
    }
  },
  visualMap: {
    min: 0,
    max: 3000,
    top: 'bottom',
    calculable: true,
    inRange: {
      color: ['#DAE004', '#F59701', '#C01C23']
    },
    textStyle: {
      color: '#fff'
    }
  },

};


//渲染地图
function renderMap(map, data, sdata2) {
  //二级标题
  option.title.subtext = map;
  //渲染地图
  option.geo = {
    show: true,
    map: map,
    left: 10,
    top: 'center',
    height: '80%',
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: false,
      }
    },
    roam: false,
    itemStyle: {
      normal: {
        areaColor: '#07265a',
        borderColor: '#1d6475',
        borderWidth: 1,
        shadowColor: 'rgba(63, 218, 255, 0.1)',
        shadowBlur: 20
      },
      emphasis: {
        areaColor: '#07265a',
      }
    }
  };
  //renderMap2中缺少toobox配置部分
  /*option.toolbox= {
      show: false,
      orient: 'vertical',
      left: 10,
      top: 60,
      feature: {
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
      }
  };*/
  //渲染坐标动点

  option.series = [
    {
      name: map,
      type: 'effectScatter',
      map: 'china',
      coordinateSystem: 'geo',
      data: data,
      roam: false,
      left: 10,
      top: 'center',
      height: '80%',
      selectedMode: 'single',
      symbolSize: 6,
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      nameMap: {
        'china': '中国'
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          if (typeof (params.value)[2] == "undefined") {
            return params.name + ' : ' + params.value;
          } else {
            return params.name + ' : ' + params[2].value;
          }
        }
      },
      label: {
        normal: {
          show: true,
          formatter: '{b}',
          position: 'right',
          textStyle: {
            color: "#ffeaea",
            fontSize: 12
          }
        },
        emphasis: {
          show: true,
          textStyle: {
            color: "#51a1a1",
            //renderMap2中的颜色不一样
            // color: "#7fffff",
            fontSize: 12
          }
        }
      },
      itemStyle: {
        normal: {
          color: '#F4E925',
          shadowBlur: 8,
          shadowColor: '#05C3F9'
        }
      },
      zlevel: 1
    },
    {
      //热力散点图
      name: 'dot',
      type: 'scatter',
      map: map,
      // mapType: map,
      //使用地理坐标系
      coordinateSystem: 'geo',
      // data: sdata,
      data: sdata2,
      roam: false,
      //selectedMode: 'single',
      symbolSize: 6,
      zlevel: 0,
    }
  ];

  window.onresize = function () {
    chart.resize(); //使第一个图表适应
  }
  //渲染地图
  chart.setOption(option);
}

// 获取当前年月日
var myDate = new Date();
var year = myDate.getFullYear();
var month = myDate.getMonth() + 1;
var date = myDate.getDate();
// 短横拼接
var queryDate = year + "-" + month + "-" + date;
$.ajax({
  type: 'post',
  url: 'http://10.162.26.182:10001/electronicFence/getHallMessage',
  data: {
    // orderId: '74b2xsa20180523152239',
    // hallId: '74b2xsa',
    // queryDate: queryDate,
    queryDate: '2018-06-01',
  },
  success: function (result) {
    console.log('请求成功');
    console.log(result);
    // 渲染全国散点图 start
    for (var i = 0; i < result.value.length; i++) {
      // 每次都清空arr数组，push效果不会叠加
      var arr = [];
      // 地理位置和发送量
      arr.push(result.value[i].hallLng, result.value[i].hallLat, result.value[i].sendnum);
      // 后台真是数据，包括门店名称，发送量以及地理位置，所属省份名称
      sdata2.push({
        name: result.value[i].hallName,
        value: arr,
        pro: result.value[i].hallProv
      });

    }
    // 获取到后台数据之后默认渲染一遍地图
    renderMap('china', mapdata, sdata2);
    // 渲染全国散点图 end

    // 门店top5数据渲染 start
    for (var i = 0; i < sdata2.length; i++) {
      // 只比较发送量，需要的数据只有门店名称和发送量
      sortarr1.push({
        name: sdata2[i].name,
        value: sdata2[i].value[2]
      })
    }
    // 根据value属性进行排序
    sortarr1.sort(sortBy('value', false));
    // 内容渲染
    for (var i = 1; i < $(".ibox2 tr").length; i++) {
      $(".ibox2").find("tr").eq(i).find("td").eq(0).text(sortarr1[i - 1].name);
      $(".ibox2").find("tr").eq(i).find("td").eq(1).text(sortarr1[i - 1].value);
    }
    // 门店top5数据渲染 end

    // 省份top5数据渲染 start
    var pro31 = ["河北", "山西", "内蒙古", "辽宁", "吉林",
      "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东",
      "河南", "湖北", "湖南", "广东", "广西", "海南", "四川",
      "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏",
      "新疆", "北京", "天津", "上海", "重庆",
    ];
    // 将门店所属省份名称和发送量放到一个对象中
    for (var i = 0; i < result.value.length; i++) {
      sortarr2.push({
        name: result.value[i].hallProv,
        value: result.value[i].sendnum
      })
    }


    // 对照，发送量累加
    var namearr=[];
    var valarr=[];
    for(var i=0;i<sortarr2.length;i++){
      namearr.push(sortarr2[i].name);
      valarr.push(sortarr2[i].value);
    }
    




    // 省份top5数据渲染 end
  },
  error: function () {
    console.log('请求失败');

  },
})
// 对象排序
var sortBy = function (attr, rev) {
  //第二个参数没有传递 默认升序排列
  if (rev == undefined) {
    rev = 1;
  } else {
    rev = (rev) ? 1 : -1;
  }
  return function (a, b) {
    a = a[attr];
    b = b[attr];
    if (a < b) {
      return rev * -1;
    }
    if (a > b) {
      return rev * 1;
    }
    return 0;
  }
}
