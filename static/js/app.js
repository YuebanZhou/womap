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
var ssize = 2;
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
  renderMap('china', d, chinaCity);
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
      // 经度纬度发送量的数组
      var prow = [];
      for (var i = 0; i < allData.length; i++) {
        var value = [];
        // 后台数据的省份名称匹配上name属性
        if (allData[i].hallProv == params.name) {
          var v1 = parseFloat(allData[i].hallLng)
          var v2 = parseFloat(allData[i].hallLat)
          var v3 = parseFloat(allData[i].sendnum)
          prow.push({
            name: allData[i].hallName,
            value: value.concat(v1, v2, v3)
          })
        }
      }
      renderMap(params.name, d, prow);
    });
  } else if (params.name in cityMap) {
    //如果是【直辖市/特别行政区】只有二级下钻
    if (special.indexOf(params.name) >= 0) {
      console.log("特殊区域");
      var prow2 = [];
      for (var i = 0; i < allData.length; i++) {
        var value = [];
        if (allData[i].hallProv == params.name) {
          var v1 = parseFloat(allData[i].hallLng)
          var v2 = parseFloat(allData[i].hallLat)
          var v3 = parseFloat(allData[i].sendnum)
          prow2.push({
            name: allData[i].hallName,
            value: value.concat(v1, v2, v3)
          })
        }
      }

      renderMap2('china', mapdata, prow2);
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
        var city = [];
        for (var i = 0; i < allData.length; i++) {
          var value = [];
          var a = params.name.split("市").join("");
          if (allData[i].hallCity == a) {
            var v1 = parseFloat(allData[i].hallLng)
            var v2 = parseFloat(allData[i].hallLat)
            var v3 = parseFloat(allData[i].sendnum)
            city.push({
              name: allData[i].hallName,
              value: value.concat(v1, v2, v3)
            })
          }
        }
        renderMap2(params.name, d, city);
      });
    }
  } else {
    renderMap('china', mapdata, chinaCity);
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
      return params.name + ' : ' + params.value[2];
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
      color: ['#06ebff', '#EAC70A', '#D90A0A']
    },
    textStyle: {
      color: '#fff'
    }
  },

};


//渲染地图
function renderMap(map, data, cityData) {
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

  option.series = [{
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
    name: '短信发送量',
    type: 'scatter',
    coordinateSystem: 'geo',
    data: cityData,
    symbolSize: ssize,
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      emphasis: {
        borderColor: '#fff',
        borderWidth: 1
      }
    }
  }
  ];

  window.onresize = function () {
    chart.resize(); //使第一个图表适应
  }
  //渲染地图
  chart.setOption(option);
}

function renderMap2(map, data, cityData) {
  option.title.subtext = map;
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
        borderColor: '#1a4f62',
        borderWidth: 1,
        shadowColor: 'rgba(63, 218, 255, 0.1)',
        shadowBlur: 20
      },
      emphasis: {
        areaColor: '#07265a',
      }
    }
  };
  option.toolbox = {
    show: true,
    orient: 'vertical',
    left: 10,
    top: 60,
    feature: {
      dataView: {
        readOnly: false
      },
      restore: {},
      saveAsImage: {}
    }
  };
  /*option.visualMap={
      type: 'continuous',
      text: ['高', '低'],
      showLabel: true,
      seriesIndex: [0],
      min: 0,
      max: 100000,
      left:'left',
      top: 'center',
      calculable: true,
      inRange: {
      color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096', ]
      },
      textStyle: {
          color: '#215096'
      },
  };*/
  option.series = [{
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
          color: "#7fffff",
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
    name: '短信发送量',
    type: 'scatter',
    coordinateSystem: 'geo',
    data: cityData,
    // symbolSize: function (val) {
    //   return val[2] / 300
    // },
    symbolSize: 5,
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      emphasis: {
        borderColor: '#fff',
        borderWidth: 1
      }
    }
  }
  ];

  window.onresize = function () {
    chart.resize(); //使第一个图表适应
  }
  //渲染地图
  chart.setOption(option);

}



var queryDate = "";
function dataTime() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var dt = d.getDate();
  if (dt < 10) {
    dt = "0" + dt;
  }
  var today = year + "-" + month + "-" + dt;
  queryDate = today;
}
dataTime();
console.log(queryDate)
var allData;
var chinaCity = [];
$.ajax({
  type: 'post',
  // async: false,
  // url: "http://10.162.26.182:10001/electronicFence/hallSendQuery",
  url: "http://10.162.26.182:10001/electronicFence/getHallMessage",
  data: {
    orderId: '74b2xsa20180523152239',
    hallId: '74b2xsa',
    // queryDate:queryDate,
    queryDate: '2018-06-19',
  },
  success: function (result) {
    console.log(result);
    allData = result.value;
    for (var i = 0; i < result.value.length; i++) {
      var value = [];
      var v1 = parseFloat(result.value[i].hallLng)
      var v2 = parseFloat(result.value[i].hallLat)
      var v3 = parseFloat(result.value[i].sendnum)
      chinaCity.push({
        name: result.value[i].hallName,
        value: value.concat(v1, v2, v3)
      })
    }
    // renderMap('china', d, chinaCity);
  },
  error: function () {
    console.log("请求失败")
  }
});
console.log(chinaCity);
console.log(allData);
/* 请求后台数据 end */
// endregion