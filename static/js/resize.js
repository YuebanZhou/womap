window.onload = function () {
  function isIE() { //ie?
     
    if (!!window.ActiveXObject || "ActiveXObject" in window)   return true;  
    else   return false; 
    console.log("IE浏览器");

  }
  if (isIE()) {
    $(".btn-click1").val("按F11进入全屏")
    $(".btn-click1").unbind();
    $(".btn-click1").attr("disabled","disabled");
  }
  //$(".btn-click1").hide()
}