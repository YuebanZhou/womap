var queryDate="";
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
  queryDate=today;
}
dataTime();
console.log(queryDate)
var allData;
var chinaCity = [];
$.ajax({
  type: 'post',
  async: false,
  url: "http://10.162.26.182:10001/electronicFence/hallSendQuery",
  data: {
    orderId:'74b2xsa20180523152239',
    hallId:'74b2xsa',
    // queryDate:queryDate,
    queryDate:'2018-05-30',
  },
  success: function (result) {
    console.log(result);
    //allData = result.value;
    //for (var i = 0; i < result.value.length; i++) {
    //  var value = [];
    //  var v1 = parseFloat(result.value[i].hallLng)
    //  var v2 = parseFloat(result.value[i].hallLat)
    //  var v3 = parseFloat(result.value[i].sendnum)
    //  chinaCity.push({
    //    name: result.value[i].hallName,
    //    value: value.concat(v1, v2, v3)
    //  })
    //}
    //renderMap('china', d, chinaCity);
  },
  error: function () {
    console.log("请求失败")
  }
});
console.log(chinaCity);
console.log(allData);
/* 请求后台数据 end */
// endregion