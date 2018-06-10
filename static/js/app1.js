//数据纯属虚构
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
var special = ["北京","天津","上海","重庆","香港","澳门"];


var option = {
    backgroundColor:'#5b5a5e',
    title: {
        text: '短信活动信息发送数量分布图',
        textStyle: {
            fontSize: 30
        },
        x: 'center'
    },
    tooltip: {
        show: true,
        formatter: function(params) {
            return params.name + '：' + params.data['value']
        },
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data:['短信发送数量']
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    visualMap: {
        min: 0,
        max: 5000,
        left: 'left',
        top: 'center',
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: true,
        inRange:{
            color:['#ffffff','#d00000']
        }
    },
    series: [
        {
            name: '短信发送数量',
            type: 'map',
            mapType: 'china',
            roam: false,
            left:100,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {name: '北京',value: 2000 },
                {name: '天津',value: 2346 },
                {name: '上海',value: 3086 },
                {name: '重庆',value: 4012 },
                {name: '河北',value: 2506},
                {name: '河南',value: 3086 },
                {name: '云南',value: 2000},
                {name: '辽宁',value: 1053 },
                {name: '黑龙江',value: 3086 },
                {name: '湖南',value: 5000 },
                {name: '安徽',value: 2346 },
                {name: '山东',value: 1053},
                {name: '新疆',value: 3086 },
                {name: '江苏',value: 1053 },
                {name: '浙江',value: 2000 },
                {name: '江西',value: 490},
                {name: '湖北',value: 4012 },
                {name: '广西',value: 2506 },
                {name: '甘肃',value: 1053 },
                {name: '山西',value: 2346},
                {name: '内蒙古',value: 4671 },
                {name: '陕西',value: 3086 },
                {name: '吉林',value: 4671 },
                {name: '福建',value: 2000},
                {name: '贵州',value: 4671 },
                {name: '广东',value: 2506 },
                {name: '青海',value: 697 },
                {name: '西藏',value: 4671 },
                {name: '四川',value: 2000 },
                {name: '宁夏',value: 3086},
                {name: '海南',value: 5000 },
                {name: '台湾',value: 2346 },
                {name: '香港',value: 2506 },
                {name: '澳门',value: 4012}
            ]
        },
        /*{
            name: 'Top 10',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data:[
                {name: '北京',value: 2000 },
                {name: '天津',value: 2346 },
                {name: '上海',value: 3086 },
                {name: '重庆',value: 4012 },
                {name: '河北',value: 2506},
                {name: '河南',value: 3086 },
                {name: '云南',value: 2000},
                {name: '辽宁',value: 1053 },
                {name: '黑龙江',value: 3086 },
                {name: '湖南',value: 5000 },
                {name: '安徽',value: 2346 },
                {name: '山东',value: 1053},
                {name: '新疆',value: 3086 },
                {name: '江苏',value: 1053 },
                {name: '浙江',value: 2000 },
                {name: '江西',value: 490},
                {name: '湖北',value: 4012 },
                {name: '广西',value: 2506 },
                {name: '甘肃',value: 1053 },
                {name: '山西',value: 2346},
                {name: '内蒙古',value: 4671 },
                {name: '陕西',value: 3086 },
                {name: '吉林',value: 4671 },
                {name: '福建',value: 2000},
                {name: '贵州',value: 4671 },
                {name: '广东',value: 2506 },
                {name: '青海',value: 697 },
                {name: '西藏',value: 4671 },
                {name: '四川',value: 2000 },
                {name: '宁夏',value: 3086},
                {name: '海南',value: 5000 },
                {name: '台湾',value: 2346 },
                {name: '香港',value: 2506 },
                {name: '澳门',value: 4012}
            ],
            symbolSize: 12,
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#F4E925',
                    shadowBlur: 10,
                    shadowColor: '#05C3F9'
                }
            },
            zlevel: 1
        },*/
    ],

    animationDuration:1000,
    animationEasing:'cubicOut',
    animationDurationUpdate:1000
};
//绘制全国地图
star(option);
var mapdata = [];
function star(option){
    chart.clear();
    $.getJSON('static/map/china.json', function(data){
        d = [];
        for( var i=0;i<data.features.length;i++ ){
            d.push({
                name:data.features[i].properties.name,
                value:data.features[i].properties.cp,
            })
        }
        mapdata = d;
        //注册地图
        echarts.registerMap('china', data);
        //绘制地图
        chart.setOption(option);
    });
}

chart.on('click', function (params) {
    if( params.name in provinces ){
        //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
        $.getJSON('static/map/province/'+ provinces[params.name] +'.json', function(data){
            echarts.registerMap( params.name, data);
            var d = [];
            for( var i=0;i<data.features.length;i++ ){
                d.push({
                    name:data.features[i].properties.name,
                    value:data.features[i].properties.cp,
                })
            }
            renderMap(params.name,d);
        });
    }else if( params.name in cityMap ){
        //如果是【直辖市/特别行政区】只有二级下钻
        if(  special.indexOf( params.name ) >=0  ){
            star(option);
        }else{
            //显示县级地图
            $.getJSON('static/map/city/'+ cityMap[params.name] +'.json', function(data){
                echarts.registerMap( params.name, data);
                var d = [];
                for( var i=0;i<data.features.length;i++ ){
                    d.push({
                        name:data.features[i].properties.name,
                        value:data.features[i].geometry.coordinates[0][0][0]
                    })
                }
                renderMap(params.name,d);
            });
        }
    }else{
        star(option);
    }
});


function renderMap(map,data){
    option.title.subtext = map;
    option.geo = {
        show: true,
        map: map,
        left: 80,
        top:'center',
        height:'80%',
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
                borderColor: '#3fdaff',
                borderWidth: 2,
                shadowColor: 'rgba(63, 218, 255, 0.1)',
                shadowBlur: 30
            },
            emphasis: {
                areaColor: '#2B91B7',
            }
        }
    };
    option.toolbox= {
        show: true,
        orient: 'vertical',
        left: 'left',
        top: 60,
        feature: {
            dataView: {readOnly: false},
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

    option.series = [
        {
            name: map,
            type: 'effectScatter',
            map:'china',
            coordinateSystem: 'geo',
            data: data,
            roam: false,
            left:'center',
            top:'center',
            height: '80%',
            selectedMode: 'single',
            symbolSize: 12,
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            nameMap:{
                'china':'中国'
            },
            tooltip:{
                trigger: 'item',
                formatter:  function (params) {
                    if(typeof(params.value)[2] == "undefined"){
                        return params.name + ' : ' + params.value;
                    }else{
                        return params.name + ' : ' + params[2].value;
                    }
                }
            },
            label: {
                normal: {
                    show: true,
                    formatter: '{b}',
                    position: 'right',
                    textStyle:{
                        color:"#fff60a",
                        fontSize:13
                    }
                },
                emphasis: {
                    show: true,
                    textStyle:{
                        color:"#e946ff",
                        fontSize:13
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#F4E925',
                    shadowBlur: 10,
                    shadowColor: '#05C3F9'
                }
            },
            zlevel: 1
        },
        /*{
            name: 'Top 10',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: data,
            symbolSize: 12,
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#F4E925',
                    shadowBlur: 10,
                    shadowColor: '#05C3F9'
                }
            },
            zlevel: 1
        },*/
        {
            name: 'mapSer',
            type: 'map',
            left:'center',
            top:'center',
            height: '80%',
            roam: false,
            geoIndex: 0,
            label: {
                show: false,
            },
            data: data
        }
    ];
    //渲染地图
    chart.setOption(option);
}


var mapStack = [];
var timeFn = null;
var curMap = {};
loadMap('100000', 'china');
Chart.on('mapselectchanged', function(params) {
    clearTimeout(timeFn);
    //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
    timeFn = setTimeout(function(){
        var name = params.batch[0].name;
        var mapCode = cityMap[name];
        if (!mapCode) {
            alert('无此区域地图显示');
            return;
        }
        loadMap(mapCode, name);
        //将上一级地图信息压入mapStack
        mapStack.push({
            mapCode: curMap.mapCode,
            mapName: curMap.mapName
        });
    }, 250);
});

Chart.on('dblclick', function(params) {
    //当双击事件发生时，清除单击事件，仅响应双击事件
    clearTimeout(timeFn);
    var map = mapStack.pop();
    if (!mapStack.length && !map) {
        alert('已经到达最上一级地图了');
        return;
    }
    loadMap(map.mapCode, map.mapName);
});
