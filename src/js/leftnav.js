import $ from 'jquery'
$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {}
    this.multiple = multiple || false
    // Variables privadas
    var links = this.el.find('.vu_link')
    // Evento
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
  }
  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el
    var	$this = $(this)
    var	$next = $this.next()

    $next.slideToggle()
    $this.parent().toggleClass('vu_open')
    if (!e.data.multiple) {
      $el.find('.vu_submenu').not($next).slideUp().parent().removeClass('vu_open')
    }
  }
  var accordion = new Accordion($('#vu_accordion'), false)
  var accordi = new Accordion($('#vu_qun-fen'), false)
  var accor = new Accordion($('.vu_fenzu_left'), false)
  $('.submenu li').click(function () {
    $(this).addClass('current').siblings('li').removeClass('vu_current')
  })
})

$(document).on('click', '.vu_m-add ul li', function () {
  var va = $(this).text()
  $('.vu_fen_zu_title>span').text(va)
  $('.vu_m-add ul li').attr('class', '')
  $(this).attr('class', 'vu_fen-active')
})
// var num;
// $(function() {
//     $(".vu_submenu li i").click(function() {
//
//     	if($(this).is('.vu_checkbox_bg_check')){
//     		$(this).removeClass('vu_checkbox_bg_check');
//     	}else{
// 			$(this).addClass('vu_checkbox_bg_check');
//     		var clone = $(this).parent().clone();
// 	        clone.append("<span></span>").find("span").click(function () {
// 	            $(this).parent().remove("li");
// 	            num=$('.vu_fenzu_right_ul li').length;
// 	            $('.vu_fenzu_right p span').text(num);
// 	        });
// 	        $(".vu_fenzu_right_ul").append(clone);
// 	        num=$('.vu_fenzu_right_ul li').length;
// 	    	$('.vu_fenzu_right p span').text(num);
// 	    	$('.vu_fenzu_right_ul li i').remove();
//     	};
//     });
// });
// $(document).on('click','.vu_check-all',function(){
// 	if($(this).is('.vu_remove-all')||$(this).prev().children().children('i').is('.vu_checkbox_bg_check')){
// 		$(this).prev().children().children('i').removeClass('vu_checkbox_bg_check');
// 		$(this).removeClass('vu_remove-all');
// 	}else{
// 		$(this).addClass('vu_remove-all');
// 		$(this).prev().children().children('i').addClass('vu_checkbox_bg_check');
// 		var clone = $(this).prev().children().clone();
// 	    clone.append("<span></span>").find("span").click(function () {
// 	        $(this).parent().remove("li");
// 	        num=$('.vu_fenzu_right_ul li').length;
// 	        $('.vu_fenzu_right p span').text(num);
// 	    });
//         $(".vu_fenzu_right_ul").append(clone);
//         num=$('.vu_fenzu_right_ul li').length;
//     	$('.vu_fenzu_right p span').text(num);
//     	$('.vu_fenzu_right_ul li i').remove();
// 	}
//
//
//
// })
