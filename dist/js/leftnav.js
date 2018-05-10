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
	
	//点击修改名字
	$(document).on('click','.m-phone-img',function(){
		$(this).parent().children('a').hide();
		$(this).parent().children('span').hide();
		$(this).parent().children('input').show();
		return false;
	});
	$(document).on('click','body',function(){
		$('.m-phone-img').parent().children('a').show();
		$('.m-phone-img').parent().children('span').css('display','inline-block');
		$('.m-phone-img').parent().children('input').hide();
	});
	$(document).on('click','input',function(){
		return false;
	});
	//	点击打开关闭好友列表
	$(document).on('click','#chitchat',function(){
		$('#friend').show();
	});
	$(document).on('click','.m-search p',function(){
		$('#friend').hide();
	});
	$(document).on('click','#friend',function(){
		$('.m-add ul').hide();		
	});
	//对话框关闭/出现
	$(document).on('click','.m-guan',function(){
		$('#chat').hide();		
	});
	$(document).on('click','.submenu_ul li',function(){		
		$('#chat').show();		
	});
	//对话框x出现/消失
	$(document).on('mousemove','.m-list li',function(){
		$(this).children('.delet-li').show();	
		$(this).children('.delet-li').addClass('delet-li-er');
//		$('.m-num').hide();
	});
	$(document).on('mouseleave','.m-list li',function(){
		$(this).children('.delet-li').hide();
		$(this).children('.delet-li').removeClass('delet-li-er');
//		$('.m-num').hide();
	});
	$(document).on('click','.delet-li-er',function(){
		return false;
	});
});


//好友列表
var avcom=new Vue({
  el: '#accordion',
  data: { 	
    menu: [{
      'title': '华塑汇',
      'name': ['小王', '小李', '小赵', '小城']
    },{
      'title': '化商通',
      'name': ['小王']
    },{
      'title': '中化金服',
      'name': ['小王', '小李']
    },{
      'title': '易商通',
      'name': [ '小潘']
    }], 
  },
  methods: {  
	 
	} 
});
//群组列表
var qun = new Vue({
  el: '#qun-fen',
  data: { 	
    menu: [{
      'title': '华塑汇',
      'name': ['小王', '小李', '小赵', '小城']
    },{
      'title': '化商通',
      'name': ['小王']
    },{
      'title': '中化金服',
      'name': ['小王', '小李']
    },{
      'title': '易商通',
      'name': [ '小潘']
    }], 
  },
  methods: {  
	 
	} 
});
//消息记录弹窗
$(document).on('click','.his-hide',function(){
	$('#history').hide();
});
$(document).on('click','.history',function(){
	$('#history').show();
});
function leftname(){
	var xiao_name=$('.m-list .active .name').text();
	$('.m-na-name').text(xiao_name);
};
leftname();
$(document).on('click','.m-list li',function(){
	leftname();
});

//点击删除聊天对象
$(document).on('click','.delet-li-er',function(){
	
})
//列表消息淡入淡出
var scrollTip = document.querySelector('#accordion li .link');
scrollTip.classList.add('animate');//页面载入时，给它执行一次	
scrollTip.addEventListener('animationend',function(){//监听动画是否结束		
	scrollTip.classList.remove('animate');//动画结束，移除动画的样式类	
	setTimeout(function(){//延时1秒，再将动画加入
	 	scrollTip.classList.add('animate');
	},1000)
})
//点击好友、群组切换
$(document).on('click','.m_lei>li',function(){
	var index=$('.m_lei>li').index(this);
	$('.m_lei>li').removeClass('m-active');
	$(this).addClass('m-active');
	$('.qie_div').hide();
	$('.qie_div').eq(index).show();
});
$(document).on('click','.m_lei_yi',function(){
	$(this).children('img').attr('src','dist/images/m-chat.png');
	$('.m_lei_er').children('img').attr('src','dist/images/group.png');
});
$(document).on('click','.m_lei_er',function(){
	$(this).children('img').attr('src','dist/images/m-group.png');
	$('.m_lei_yi').children('img').attr('src','dist/images/chat.png');
});
//点击添加分组
$(document).on('click','.m-add p',function(e){
	$('.m-add ul').show();
	e.stopPropagation();
});
$(document).on('click','.m-add ul li',function(){
	var va=$(this).text();
	$('.fen_zu_title>span').text(va);
	$('.m-add ul li').attr('class','');
	$(this).attr('class','fen-active');	
	$('.fen_zu').show();
});
var fenzu = new Vue({
  el: '.fenzu_left',
  data: { 	
    menu: [{
      'title': '华塑汇',
      'name': ['小王', '小李', '小赵', '小城']
    },{
      'title': '化商通',
      'name': ['小王']
    },{
      'title': '中化金服',
      'name': ['小王', '小李']
    },{
      'title': '易商通',
      'name': [ '小潘']
    }], 
  },
  methods: {  
	 
	} 
});
//点击追加
var num;
$(function() {
    $(".submenu").children("li").click(function() {
    	
        var clone = $(this).clone();
        clone.append("<span></span>")
            .find("span").click(function () {
            $(this).parent().remove("li");
            num=$('.fenzu_right_ul li').length;
            $('.fenzu_right p span').text(num);
        });
        $(".fenzu_right_ul").append(clone);
        num=$('.fenzu_right_ul li').length;
    	$('.fenzu_right p span').text(num);
    });
});
//创建分组后,提交
$(document).on('click','.fenzu_footer button',function(){
	$('.fenzu_name').show()
});
$(document).on('click','.fen_zu_tier',function(){
	$('.fenzu_name').hide()
});
$(document).on('click','.fen_zu_tiyi',function(){
	$('.fen_zu').hide()
});
