$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	};

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this);
			$next = $this.next(); 

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		}
	};
	var accordion = new Accordion($('#accordion'), false);
	var accordi = new Accordion($('#qun-fen'), false);
	var accor = new Accordion($('.fenzu_left'), false);
	$('.submenu li').click(function () {
		$(this).addClass('current').siblings('li').removeClass('current');
	});
});

//点击追加
var num;
$(function() {
    $(".submenu li i").click(function() {    	
    	if($(this).is('.checkbox_bg_check')){
    		$(this).removeClass('checkbox_bg_check');
    	}else{     		
			$(this).addClass('checkbox_bg_check');
    		var clone = $(this).parent().clone();          
	        clone.append("<span></span>").find("span").click(function () {
	            $(this).parent().remove("li");
	            
	        });
	        $(".fenzu_right_ul").append(clone);
	        num=$('.fenzu_right_ul>li').length/2;
	    	$('.fenzu_right p span').text(num);
	    	$('.fenzu_right_ul li i').remove();
    	};    			        
    });
});
$(document).on('click','.check-all',function(){	
	if($(this).is('.remove-all')||$(this).prev().children().children('i').is('.checkbox_bg_check')){
		$(this).prev().children().children('i').removeClass('checkbox_bg_check');
		$(this).removeClass('remove-all');
	}else{
		$(this).addClass('remove-all');
		$(this).prev().children().children('i').addClass('checkbox_bg_check');
		var clone = $(this).prev().children().clone();          
	    clone.append("<span></span>").find("span").click(function () {
	        $(this).parent().remove("li");
	        
	    });
        $(".fenzu_right_ul").append(clone);
        num=$('.fenzu_right_ul>li').length/2;
    	$('.fenzu_right p span').text(num);
    	$('.fenzu_right_ul li i').remove();
	}	
})
$(document).on('click','.m-add ul li',function(){
	var va=$(this).text();
	$('.fen_zu_title>span').text(va);
	$('.m-add ul li').attr('class','');
	$(this).attr('class','fen-active');	
	$('.fen_zu').show();
});
$(document).on('click','.fen_zu_tier',function(){
	$('.fenzu_name').hide()
});
$(document).on('click','.fen_zu_tiyi',function(){
	$('.fen_zu').hide()
});





