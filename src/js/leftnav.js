import $ from 'jquery'
$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {}
    this.multiple = multiple || false
    // Variables privadas
    var links = this.el.find('.vu_link')
    // Evento
    //$(document).on('click', $(links), {el: this.el, multiple: this.multiple}, this.dropdown)
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
  $('.submenu li').click(function () {
    $(this).addClass('current').siblings('li').removeClass('vu_current')
  })
});
$(function () {
  var Acco = function (el, multiple) {
    this.el = el || {}
    this.multiple = multiple || false
    // Variables privadas
    var links = this.el.find('.vu_link')
    // Evento
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
  }
  Acco.prototype.dropdown = function (e) {
    var $el = e.data.el
    var	$this = $(this)
    var	$next = $this.next()
    $next.slideToggle()
    $this.parent().toggleClass('vu_open')
    if (!e.data.multiple) {
//    $el.find('.vu_submenu').not($next).slideUp().parent().removeClass('vu_open')
    }
  }
  var accor = new Acco($('.vu_fenzu_left'), false)
  $('.submenu li').click(function () {
    $(this).addClass('current').siblings('li').removeClass('vu_current')
  })
})

$(document).on('click', '.vu_m-add ul li', function () {
  $('.vu_m-add ul li').attr('class', '')
  $(this).attr('class', 'vu_fen-active')
})
