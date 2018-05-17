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
		var	$this = $(this);
		var	$next = $this.next(); 

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
//点击好友、群组切换
//$(document).on('click','.m_lei_yi',function(){
//	$(this).children('img').attr('src','../images/m-chat.png');
//	$('.m_lei_er').children('img').attr('src','../images/group.png');
//});
//$(document).on('click','.m_lei_er',function(){
//	$(this).children('img').attr('src','../images/m-group.png');
//	$('.m_lei_yi').children('img').attr('src','../images/chat.png');
//});	