$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.v-link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	};

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
		var	$this = $(this);
		var	$next = $this.next(); 

		$next.slideToggle();
		$this.parent().toggleClass('v-open');

		if (!e.data.multiple) {
			$el.find('.v-submenu').not($next).slideUp().parent().removeClass('v-open');
		}
	};
	var accordion = new Accordion($('#v-accordion'), false);
	var accordi = new Accordion($('#v-qun-fen'), false);
	var accor = new Accordion($('.v-fenzu_left'), false);
	$('.submenu li').click(function () {
		$(this).addClass('current').siblings('li').removeClass('v-current');
	});
});
$(document).on('click','.v-m-add ul li',function(){
	var va=$(this).text();
	$('.v-fen_zu_title>span').text(va);
	$('.v-m-add ul li').attr('class','');
	$(this).attr('class','v-fen-active');	
});	
var num;
$(function() {
    $(".v-submenu li i").click(function() {
    	
    	if($(this).is('.v-checkbox_bg_check')){
    		$(this).removeClass('v-checkbox_bg_check');
    	}else{     		
			$(this).addClass('v-checkbox_bg_check');
    		var clone = $(this).parent().clone();          
	        clone.append("<span></span>").find("span").click(function () {
	            $(this).parent().remove("li");
	            num=$('.v-fenzu_right_ul li').length;
	            $('.v-fenzu_right p span').text(num);
	        });
	        $(".v-fenzu_right_ul").append(clone);
	        num=$('.v-fenzu_right_ul li').length;
	    	$('.v-fenzu_right p span').text(num);
	    	$('.v-fenzu_right_ul li i').remove();
    	};    			        
    });
});
$(document).on('click','.v-check-all',function(){	
	if($(this).is('.v-remove-all')||$(this).prev().children().children('i').is('.v-checkbox_bg_check')){
		$(this).prev().children().children('i').removeClass('v-checkbox_bg_check');
		$(this).removeClass('v-remove-all');
	}else{
		$(this).addClass('v-remove-all');
		$(this).prev().children().children('i').addClass('v-checkbox_bg_check');
		var clone = $(this).prev().children().clone();          
	    clone.append("<span></span>").find("span").click(function () {
	        $(this).parent().remove("li");
	        num=$('.v-fenzu_right_ul li').length;
	        $('.v-fenzu_right p span').text(num);
	    });
        $(".v-fenzu_right_ul").append(clone);
        num=$('.v-fenzu_right_ul li').length;
    	$('.v-fenzu_right p span').text(num);
    	$('.v-fenzu_right_ul li i').remove();
	}
	
	
	
})