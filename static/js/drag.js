/**
 * author levi
 * url http://levi.cg.am
 */
$(function () {
  $(document).mousemove(function (e) {
    if (!!this.move) {
      var posix = !document.move_target ? {
          'x': 0,
          'y': 0,
        } : document.move_target.posix,
        callback = document.call_down || function () {
          $(this.move_target).css({
            'top': e.pageY - posix.y,
            'left': e.pageX - posix.x,
          });
          if (parseInt($(this.move_target).css('left')) < 0) {
            $(this.move_target).css('left', 0);
          } else if (parseInt($(this.move_target).css('top')) < 0) {
            $(this.move_target).css('top', 0);
          } else if (parseInt($(this.move_target).css('left')) > $(window).width() - $(this.move_target).width()) {
            $(this.move_target).css('left', ($(window).width() - $(this.move_target).width()));
          } else if (parseInt($(this.move_target).css('top')) > $(window).height() - $(this.move_target).height()) {
            $(this.move_target).css('top', ($(window).height() - $(this.move_target).height()));
          } else if (parseInt($(this.move_target).css('left')) < 0 && parseInt($(this.move_target).css('top')) < 0) {
            $(this.move_target).css('left', 0);
            $(this.move_target).css('top', 0);
            // console.log("1")
          } else if (parseInt($(this.move_target).css('top')) < 0 && parseInt($(this.move_target).css('left')) > $(window).width() - $(this.move_target).width()) {
            $(this.move_target).css('top', 0);
            $(this.move_target).css('left', ($(window).width() - $(this.move_target).width()));
            // console.log("2")
          } else if (parseInt($(this.move_target).css('left')) > $(window).width() - $(this.move_target).width() && parseInt($(this.move_target).css('top')) > $(window).height() - $(this.move_target).height()) {
            $(this.move_target).css('left', ($(window).width() - $(this.move_target).width()));
            $(this.move_target).css('top', ($(window).height() - $(this.move_target).height()));
            // console.log("3")
          } else if (parseInt($(this.move_target).css('left')) < 0 && parseInt($(this.move_target).css('top')) > $(window).height() - $(this.move_target).height()) {
            $(this.move_target).css('left', 0);
            $(this.move_target).css('top', ($(window).height() - $(this.move_target).height()));
            // console.log("4")
          }

        };
      callback.call(this, e, posix);
    }

  }).mouseup(function (e) {
    if (!!this.move) {
      var callback = document.call_up || function () {};
      callback.call(this, e);
      $.extend(this, {
        'move': false,
        'move_target': null,
        'call_down': false,
        'call_up': false
      });
    }
  });

  function drag(box, coor) {
    //获取当前元素，注册鼠标按下事件
    var $box = box.on("mousedown", function (e) {
      //offset左上角距离页面左上角的定位，top值和left值
      var offset = $(this).offset();
      //获取偏移量
      this.posix = {
        'x': e.pageX - offset.left,
        'y': e.pageY - offset.top
      };
      // console.log(this.posix);
      //extend合并对象，将新对象合并到原有对象中
      $.extend(document, {
        'move': true,
        'move_target': this
      });
    }).on('mousedown', coor, function (e) {
      //注册代理事件，coor元素
      //元素的宽高，元素距离页面的左边距和上边距
      var posix = {
        'w': $box.width(),
        'h': $box.height(),
        'x': e.pageX,
        'y': e.pageY
      };
      //拼接新对象到原有对象中
      $.extend(document, {
        'move': true,
        'call_down': function (e) {
          $box.css({
            'width': Math.max(30, e.pageX - posix.x + posix.w),
            'height': Math.max(30, e.pageY - posix.y + posix.h)
          });
        }
      });
      // console.log($box.height());
      // console.log($box.width());

      return false;

    });
    //收起放出
    $(".collapse-link").on("click", function () {
      $(this).find("i").toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
      if ($(this).find("i").hasClass("fa-chevron-up")) {
        $(this).parent().parent().parent().find(".ibox-content").show()
        $(this).parent().parent().parent().css({
          "min-height":"270px",
          "height":"270px"
        })
        // $(this).parent().parent().parent().width("300px");
      } else if ($(this).find("i").hasClass("fa-chevron-down")) {
        $(this).parent().parent().parent().find(".ibox-content").hide()
        $(this).parent().parent().parent().css({
          "min-height":"48px",
          "height":"48px"
        })
        $(this).parent().parent().parent().height("48px")
      }
    })
  }
  drag($(".ibox1"), '.coor1');
  drag($(".ibox2"), '.coor2');
  drag($(".ibox3"), '.coor3');
});