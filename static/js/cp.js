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
  renderMap('china', d);
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

      renderMap(params.name, d);
    });
  } else if (params.name in cityMap) {
    //如果是【直辖市/特别行政区】只有二级下钻
    if (special.indexOf(params.name) >= 0) {
      console.log("特殊区域");
      renderMap('china', mapdata);
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
        renderMap(params.name, d);
      });
    }
  } else {
    renderMap('china', mapdata);
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
function renderMap(map, data) {
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

// 真实数据
var sdata2 = [];
var arr = [];
var sortarr = [];
// 获取当前年月日
var myDate = new Date();
var year = myDate.getFullYear();
var month = myDate.getMonth() + 1;
var date = myDate.getDate();
// 短横拼接
var queryDate = year + "-" + month + "-" + date;
console.log(queryDate);

$.ajax({
  type: 'post',
  url: 'http://10.162.26.182:10001/electronicFence/getHallMessage',
  data: {
    orderId: '74b2xsa20180523152239',
    hallId: '74b2xsa',
    // queryDate: queryDate,
    queryDate: '2018-05-24',
  },
  success: function (result) {
    console.log('请求成功');
    console.log(result);
    // 渲染全国散点图 start
    for (var i = 0; i < result.value.length; i++) {
      // 每次都清空arr数组，push效果不会叠加
      var arr = [];
      arr.push(result.value[i].hallLng, result.value[i].hallLat, result.value[i].sendnum);
      sdata2.push({
        // name:result.value[i].hallName,
        name: result.value[i].hallCity + "门店",
        value: arr
      });

    }
    renderMap('china', mapdata);
    // 渲染全国散点图 end

    // 门店top5数据渲染 start
    for (var i = 0; i < sdata2.length; i++) {
      sortarr.push({
        name: sdata2[i].name,
        value: sdata2[i].value[2]
      })
    }
    sortarr.sort(sortBy('value', false));

    for (var i = 1; i < $(".ibox2 tr").length; i++) {
      $(".ibox2").find("tr").eq(i).find("td").eq(0).text(sortarr[i - 1].name);
      $(".ibox2").find("tr").eq(i).find("td").eq(1).text(sortarr[i - 1].value);
    }
    // 门店top5数据渲染 end

    // 省份top5数据渲染 start
    $.getJSON('static/map/china.json', function (data) {
      // 1.按照省份名称不同，归类，将省份名称一样的，放在一起
      // 2.归类的时候，直接对发送量进行累加，这样就不用对对象进行累加计算
      // 3.归类后的数组，进行此项和后一项的对比，如果不一样，记录这一项的省份名称和发送量（此时发送量已是最终累加结果）
      // 4.对比后的数组放入新数组，进行数据渲染

      
      // 发送量递增，初始值设置为0
      var num=0;
      // 归类之后的对象数组
      var temp=[];

      // 遍历本地json文件，获取31个省份名称，方便对比
      for (var i = 0; i < data.features.length; i++) {
        // console.log(data.features[i].properties.name);
        
        for (var j = 0; j < result.value.length; j++) {
          // 遍历后台数据，获取省份名称，和31个省份对比
          if(result.value[j].hallProv==data.features[i].properties.name){
            // 这里自动按照省份名称归类排序
            temp.push({
              key:result.value[j].hallProv,
              // 发送量累加
              val:parseInt(num+=result.value[j].sendnum)
            })
          }
        }
      }
      // console.log(temp);
      // temp为对象数组，不能直接比较相邻两项的值
      // 新建一个临时数组，只比较temp中的key
      var tempchild=[];
      // 最终数组
      var arr=[];
      for(var i=0;i<temp.length;i++){
        tempchild.push(temp[i].key);
      }
      for(var i=0;i<tempchild.length;i++){
        if(tempchild[i]!=tempchild[i+1]){
          // console.log(i);
          arr.push({
            name:tempchild[i],
            sendnum:temp[i].val
          })
        }
      }
      
      arr.sort(sortBy('sendnum', false));
      console.log(arr);
      for (var i = 1; i < $(".ibox1 tr").length; i++) {
        $(".ibox1").find("tr").eq(i).find("td").eq(0).text(arr[i - 1].name);
        $(".ibox1").find("tr").eq(i).find("td").eq(1).text(arr[i - 1].sendnum);
      }
  
    });

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
