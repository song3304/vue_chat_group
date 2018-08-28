/* 
 * 将echart和数据封装起来
 */


//通过时间戳计算分钟的时间戳
function time2minutes(timestamp) {
    return timestamp - timestamp % 60;
}

//通过obj来初始化
function Offer(json) {
    for (var key in json) {
        this.key = json[key];
    }
}

var has_flag = function(str){
	return (typeof(rest_time_area) == 'undefined')?false:(str == (rest_time_area[0]+'/'+rest_time_area[1]));
}

function StaticBrid(){
	this.yesterday_data = [];
	this.today_data = [];
	this.obj = null;
        
	this.init = function(obj){
		if(obj.hasOwnProperty('yesterday_data')){
			this.yesterday_data = obj.yesterday_data;
		}
		
		if(obj.hasOwnProperty('today_data')){
			this.today_data = obj.today_data;
		}
		
		if(obj.hasOwnProperty('obj')){
			this.obj = jQuery('#'+obj.obj);
		}
	}
	this.render = function(obj){
		if(obj){
			this.obj = jQuery('#'+obj);
		}
		if(this.obj == null) return ;
		var html = '<div class="trend-static-name base_font1">今日战报</div>'
		+'<div class="trend-content">'
			+' <table>'
			+'<tr>'
				+'<td>'+(this.today_data!=null?this.today_data.buy:'--')+'</td>'
				+'<td><img src="/static/img/match/buy-1.png" /><span>买</span></td>'
			+'</tr>'
		+'<tr>'
            +'<td>'+(this.today_data!=null?this.today_data.sell:'--')+'</td>'
            +'<td><img src="/static/img/match/buy-1.png" /><span>卖</span></td>'
		+'</tr>'
		+'<tr>'
            +'<td>'+(this.today_data!=null?this.today_data.order:'--')+'</td>'
            +'<td><img src="/static/img/match/buy-1.png" /><span>成交</span></td>'
		+'</tr>'
		+'</table>'
            +'</div>'
		+'<div class="trend-static-name base_font1 trend-static-name-yesterday">昨日战报</div>'
        +'<div class="trend-content">'
			+'<table>'
			+'<tr>'
            +'<td>'+(this.yesterday_data!=null?this.yesterday_data.buy:'--')+'</td>'
            +'<td><img src="/static/img/match/buy-1.png" /><span>买</span></td>'
			+'</tr>'
		+'<tr>'
            +'<td>'+(this.yesterday_data!=null?this.yesterday_data.sell:'--')+'</td>'
            +'<td><img src="/static/img/match/buy-1.png" /><span>卖</span></td>'
		+'</tr>'
		+'<tr>'
            +'<td>'+(this.yesterday_data!=null?this.yesterday_data.order:'--')+'</td>'
            +'<td><img src="/static/img/match/buy-1.png" /><span>成交</span></td>'
		+'</tr>'
		+'</ul>';
		this.obj.html(html);
	}
}

function Price(arr) {
    this.timestamp = time2minutes(arr[3]);
    
    this.data = [
        parseInt(arr[0])==0?'-':arr[0], 
        parseInt(arr[1])==0?'-':arr[1],
        parseInt(arr[2])==0?'-':arr[2]
    ];
}

if (typeof PriceType === "undefined") {
    var PriceType = {
        Sell: 0,
        Buy: 1,
        Order: 2
    };
}

function OfferBird()
{
	this.current_price = 0;
	this.buy_price = [];
	this.sell_price = [];
	this.trade_price = [];
	this.length_cnt = 0;
	this.obj = null;
	this.dyncObj = null;
    this.zhiboObj = null;    	
    this.priceSort = function (x, y) {
    	return parseInt(x.trade_price) > parseInt(y.trade_price);
    };
    this.priceSortAsc = function (x, y) {
        return parseInt(x.trade_price) < parseInt(y.trade_price);
    };
	this.init = function(obj){
		if(obj.hasOwnProperty('current_price')){
			this.current_price = obj.current_price;
		}
		if(obj.hasOwnProperty('buy')){
			this.buy_price = obj.buy;
            this.buy_price.sort(this.priceSortAsc);
		}
		if(obj.hasOwnProperty('sell')){
			this.sell_price = obj.sell;
            this.sell_price.sort(this.priceSort);
		}
		if(obj.hasOwnProperty('order')){
			this.trade_price = obj.order;
		}
		if(obj.hasOwnProperty('obj')){
			this.obj = jQuery('#'+obj.obj);
		}		
		if(obj.hasOwnProperty('dyncObj')){
			this.dyncObj = jQuery('#'+obj.dyncObj);
		}
		if(obj.hasOwnProperty('zhiboObj')){
			this.zhiboObj = jQuery('#'+obj.zhiboObj);
		}
		if(obj.hasOwnProperty('length_cnt')){
			this.length_cnt = obj.length_cnt;
		}
	}
	this.renderPrice = function(obj){
		var html = '<div class="info_sub"><em></em><span></span>'+
		        '<ul class="list-group">'+
            (obj.product.name=='' || obj.product.name == null ?'' : '<li><span>品种:</span>&emsp;<span class="content">'+obj.product.name+'</span></li>')+
//		    	'<li><span>交易方:</span>&emsp;<span class="content">'+((obj.trader==null||obj.trader.name==false)?'--':obj.trader.name)+'</span></li>'+
            (obj.trader_type_tag=='' || obj.trader_type_tag == null ?'' : '<li><span>操作:</span>&emsp;<span class="content">'+obj.trader_type_tag+'</span></li>')+
            (obj.trade_price=='' || obj.trade_price == null ?'' : '<li><span>价格:</span>&emsp;<span class="content">￥'+obj.trade_price+'</span></li>')+
            //'<li><span>数量:</span>&emsp;<span class="content">'+'500吨'+'</span></li>'+
            ((parseInt(obj.trade_amount)==0 || obj.trade_amount == '')?'<li><span>数量:</span>&emsp;<span class="content">500吨</span></li>' :'<li><span>数量:</span>&emsp;<span class="content">'+obj.trade_amount+'吨'+'</span></li>')+
            (obj.stock.name=='' || obj.stock.name == null ?'' : '<li><span>仓库:</span>&emsp;<span class="content">'+obj.stock.name+'</span></li>')+
            (obj.delivery_tag=='' || obj.delivery_tag == null ?'' :'<li><span>交货方式:</span>&emsp;<span class="content">'+obj.delivery_tag+'</span></li>')+
            (obj.withdraw_tag==''  || obj.withdraw_tag==null ?'' :'<li><span>结算方式:</span>&emsp;<span class="content">'+obj.withdraw_tag+'</span></li>')+
          /*  (obj.factory == ''||obj.factory == null?'':'<li><span>厂商:</span>&emsp;<span class="content">'+obj.factory+'</span></li>')+*/
            (obj.is_range == '' || obj.is_range==null ?'':'<li><span>允许5%的差值:</span>&emsp;<span class="content">'+(parseInt(obj.is_range)==0?'否':'是')+'</span></li>')+
            (obj.bond == ''|| obj.bond == null  ?'':'<li><span>保证金:</span>&emsp;<span class="content">'+(obj.bond==' '?'- -':obj.bond)+'</span></li>')+
            (obj.delivery_start == ''|| obj.delivery_start== '0000-00-00' ?'':'<li><span>交割期:</span>&emsp;<span class="content">'+obj.delivery_start.replace(new RegExp("-","gm"),".")+'&sim;'+obj.delivery_end.replace(new RegExp("-","gm"),".")+'</span></li>')+
            /*(obj.phone == '' || obj.phone==null ? '':'<li><span>联系方式:</span>&emsp;<span class="content">'+obj.phone+'</span></li>')+
            (obj.qq == '' || obj.qq ==null ?'':'<li><span>QQ:</span>&emsp;<span class="content">'+obj.qq+'</span></li>')+
            (obj.note == null || obj.note==''?'':'<li><span>备注:</span>&emsp;<span class="content">'+obj.note+'</span></li>')+*/
		    '</ul>'+
		    '</div>';
		return html;
	}	
	this.render = function(obj){
		if(obj){
			this.obj = jQuery('#'+obj);
		}
		if(this.obj==null || this.obj.length<1) return;
		$bird_sell = jQuery('.bird_sell',this.obj);
		$current_price = jQuery('.current_price',this.obj);
		$bird_buy = jQuery('.bird_buy',this.obj);
		//处理卖价
		$bird_sell.empty();
		for(var i=0;i<this.length_cnt;i++){
            if (i>=this.sell_price.length){//i<this.sell_price.length
                var html = '<li><div class="row">'+'<div class="col-md-4 col-xs-4 no-padding-r no-padding-r-mai no-padding-r-sell">卖'+(i+1)+'</div><div class="col-md-3 col-xs-3 no-padding-r no-padding-r-price" style="color:#00d700;text-align:center;padding:0;width:24%;">'+'--'+'</div>'+'<div class="col-md-3 col-xs-3 no-padding-r no-padding-r-amount" style="color:blue;text-align:center;">&nbsp;&nbsp;'+'--'+'</div>'+'</div></li>';
            } else {
                var html = '<li><div class="row">'+'<div class="col-md-4 col-xs-4 no-padding-r no-padding-r-mai no-padding-r-sell">卖'+(i+1)+'</div>'+'<div class="col-md-3 col-xs-3 no-padding-r no-padding-r-price no-padding-r-price-sell" style="color:#00d700;width:20%;text-align:right;">'+parseInt(this.sell_price[i].trade_price)+'</div>'+'<div class="col-md-3 col-xs-3 no-padding-r no-padding-number no-padding-r-amount" style="color:blue;text-align:right;padding:0;">&nbsp;&nbsp;'+((parseInt(this.sell_price[i].trade_amount)==0 || this.sell_price[i].trade_amount=='')?'500':this.sell_price[i].trade_amount)+'</div>'+
                        '<div class="col-md-1 col-xs-1 tubiao" style="height:22px;padding-right:0;padding-left:6px;width:10%;padding-top: 2px;"><a class="detail-a"><i class="fa fa-icon-gengduo" style="font-size:20px;font-weight:600;color:#666666;"></i>'+
                        this.renderPrice(this.sell_price[i])+
                        '</a></div>'+
                        '</div></li>';
            }
            $bird_sell.prepend(html);
		}
		//处理当前价
		if(this.current_price != 0){
			$current_price.html('当前价:&nbsp;'+this.current_price);
		}else{
			$current_price.html('');
		}
		//处理买价
		$bird_buy.empty();
		for(var i=0;i<this.length_cnt;i++){//i<this.buy_price.length
            if (i>=this.buy_price.length){
                var html = '<li><div class="row">'+'<div class="col-md-4 col-xs-4 no-padding-r no-padding-r-mai no-padding-r-buy">买'+(i+1)+'</div><div class="col-md-3 col-xs-3 no-padding-r no-padding-r-price" style="color:red;text-align:center;padding:0;width:24%;">'+'--'+'</div>'+'<div class="col-md-3 col-xs-3 no-padding-r no-padding-r-amount" style="color:blue;text-align:center;">&nbsp;&nbsp;'+'--'+'</div>'+'</div></li>';
            } else {
                var html = '<li><div class="row">'+'<div class="col-md-4 col-xs-4 no-padding-r no-padding-r-mai no-padding-r-buy">买'+(i+1)+'</div>'+'<div class="col-md-3 col-xs-3 no-padding-r no-padding-r-price no-padding-r-price-sell" style="color:red;width:20%;text-align:right;">'+parseInt(this.buy_price[i].trade_price)+'</div>'+'<div class="col-md-3 col-xs-3 no-padding-r no-padding-number no-padding-r-amount" style="color:blue;text-align:right;padding:0;">&nbsp;&nbsp;'+((parseInt(this.buy_price[i].trade_amount)==0 || this.buy_price[i].trade_amount=='')?'500':this.buy_price[i].trade_amount)+'</div>'+
                        '<div class="col-md-1 col-xs-1 tubiao" style="height:22px;padding-right:0;padding-left:6px;width:10%;padding-top: 2px;"><a class="detail-a">'+'<i class="fa fa-icon-gengduo" style="font-size:20px;font-weight:600;color:#666666;"></i>'+
                        this.renderPrice(this.buy_price[i])+
                        '</a></div>'+
                        '</div></li>';
            }
            $bird_buy.append(html);
		}
	}
	this.rendermobile= function(obj){
		if(obj){
			this.obj = jQuery('#'+obj);
		}
		if(this.obj==null || this.obj.length<1) return;
		$bird_sell = jQuery('.bird_sell',this.obj);
		$bird_buy = jQuery('.bird_buy',this.obj);
		//处理卖价
		$bird_sell.empty();
		for(var i=0;i<this.length_cnt;i++){
            if (i>=this.sell_price.length){//i<this.sell_price.length
                var html = '<li><div class="row">'+'<div class="col-md-4 col-xs-4 no-padding-r no-padding-r-mai no-padding-r-msell">卖'+(i+1)+'</div><div class="col-md-3 col-xs-3 no-padding-r no-padding-r-price" style="color:#00d700;text-align:center;padding:0;width:24%;">'+'--'+'</div>'+'<div class="col-md-3 col-xs-3 no-padding-r no-padding-r-amount" style="color:blue;text-align:center;">&nbsp;&nbsp;'+'--'+'</div>'+'</div></li>';
            } else {
                var html = '<li><div class="row">'+'<div class="col-md-4 col-xs-4 no-padding-r no-padding-r-mai no-padding-r-msell">卖'+(i+1)+'</div>'+'<div class="col-md-3 col-xs-3 no-padding-r no-padding-r-price" style="color:#00d700;width:20%;text-align:right;">'+parseInt(this.sell_price[i].trade_price)+'</div>'+'<div class="col-md-3 col-xs-3 no-padding-r no-padding-number no-padding-r-amount" style="color:blue;text-align:right;padding:0;">&nbsp;&nbsp;'+((parseInt(this.sell_price[i].trade_amount)==0 || this.sell_price[i].trade_amount=='')?'500':this.sell_price[i].trade_amount)+'</div>'+
                        '<div class="col-md-1 col-xs-1" style="height:22px;padding-right:0;padding-left:6px;width:10%;padding-top: 2px;"><a class="detail-a"><i class="fa fa-icon-gengduo" style="font-size:20px;font-weight:600;color:#666666;"></i>'+
                        this.renderPrice(this.sell_price[i])+
                        '</a></div>'+
                        '</div></li>';
            }
            $bird_sell.append(html);
		}

		//处理买价
		$bird_buy.empty();
		for(var i=0;i<this.length_cnt;i++){//i<this.buy_price.length
            if (i>=this.buy_price.length){
                var html = '<li><div class="row">'+'<div class="col-md-4 col-xs-4 no-padding-r no-padding-r-mai no-padding-r-mbuy">买'+(i+1)+'</div><div class="col-md-3 col-xs-3 no-padding-r no-padding-r-price" style="color:red;text-align:center;padding:0;width:24%;">'+'--'+'</div>'+'<div class="col-md-3 col-xs-3 no-padding-r no-padding-r-amount" style="color:blue;text-align:center;">&nbsp;&nbsp;'+'--'+'</div>'+'</div></li>';
            } else {
                var html = '<li><div class="row">'+'<div class="col-md-4 col-xs-4 no-padding-r no-padding-r-mai no-padding-r-mbuy">买'+(i+1)+'</div>'+'<div class="col-md-3 col-xs-3 no-padding-r no-padding-r-price" style="color:red;width:20%;text-align:right;">'+parseInt(this.buy_price[i].trade_price)+'</div>'+'<div class="col-md-3 col-xs-3 no-padding-r no-padding-number no-padding-r-amount" style="color:blue;text-align:right;padding:0;">&nbsp;&nbsp;'+((parseInt(this.buy_price[i].trade_amount)==0 || this.buy_price[i].trade_amount=='')?'500':this.buy_price[i].trade_amount)+'</div>'+
                        '<div class="col-md-1 col-xs-1" style="height:22px;padding-right:0;padding-left:6px;width:10%;padding-top: 2px;"><a class="detail-a">'+'<i class="fa fa-icon-gengduo" style="font-size:20px;font-weight:600;color:#666666;"></i>'+
                        this.renderPrice(this.buy_price[i])+
                        '</a></div>'+
                        '</div></li>';
            }
            $bird_buy.append(html);
		}
	}
	this.renderDync = function(dyncObj){
		if(dyncObj){
			this.dyncObj = jQuery('#'+dyncObj);
		}
		if(this.dyncObj==null || this.dyncObj.length<1) return;
        //合并买卖数据，并按时间倒序排列
        var temp_push_price = [];
        temp_push_price=this.sell_price.concat(this.buy_price);
        temp_push_price.sort(function(a,b){return b.create_time<a.create_time?1:-1});
        this.dyncObj.empty();
        for(var i=0;i<temp_push_price.length;i++){
            var item = temp_push_price[i];
            var html = '<li>';
                html+='			<span class="vue-realtime-auto-time">'+(item.create_time).substr(-8,5)+'</span>';
                html+='			<span class="vue-realtime-auto-company">'+item.mather_name+'</span>';
                html+='			<span class="'+(parseInt(item.trade_type)==1?'vue-realtime-buy':'vue-realtime-sell')+'">'+(parseInt(item.trade_type)==1?'买':'卖')+'</span>';
                html+='			<span class="'+(parseInt(item.trade_type)==1?'vue-realtime-buy vue-realtime-buy_price':'vue-realtime-sell vue-realtime-sell_price')+'">'+parseInt(item.trade_price)+'</span>';
                html+='			<span class="vue-realtime-auto-data">'+item.delivery_start+'至'+item.delivery_end+'</span>';
                html+='			<span class="vue-realtime-auto-num">'+((parseInt(item.trade_amount)==0 || item.trade_amount=='')?'500':item.trade_amount)+'</span>';
                html+='	</li>';
            this.dyncObj.prepend(html);
        }
		if(this.buy_price.length==0&&this.sell_price.length==0){
			var html = '<li style="margin-left:20px;font-size:12px;">暂无数据</li>';
            this.dyncObj.prepend(html);
		}
	}
	
	this.renderZhibo = function(zhiboObj){
		if(zhiboObj){
			this.zhiboObj = jQuery('#'+zhiboObj);
		}
		if(this.zhiboObj==null || this.zhiboObj.length<1) return;
		//处理报价
		this.zhiboObj.empty();
		var temp_push_price = [];
		temp_push_price=this.sell_price.concat(this.buy_price);
		temp_push_price.sort(function(a,b){return b.create_time<a.create_time});		
		
		for(var i=0;i<this.sell_price.length;i++){
			//if(temp_push_price[i].trade_type==1){
				var html = '<li class="pop-title" title="'+(this.sell_price[i].note!=null?this.sell_price[i].note:'--')+'">';
				html+='<div class="zhibo_div_div">';
				html+='			<span class="mai_zhibo"><span>卖</span></span>';
				html+='			<span class="zhibo_price">'+parseInt(this.sell_price[i].trade_price)+'</span>';
				html+='			<span class="zhibo_num">'+((parseInt(this.sell_price[i].trade_amount)==0 || this.sell_price[i].trade_amount=='')?'500':this.sell_price[i].trade_amount)+'吨</span>';
				html+='			<div class="zhibo_div_yinc"><p>'+(this.sell_price[i].note!=null?this.sell_price[i].note:'--')+'</p></div>';
				html+='		</div>';
				html+='	</li>';	
			//}									
			this.zhiboObj.prepend(html);
		}		
		for(var i=0;i<this.buy_price.length;i++){
			//if(temp_push_price[i].trade_type==-1){
				var html = '<li class="pop-title" title="'+(this.buy_price[i].note!=null?this.buy_price[i].note:'--')+'">';
				html+='<div class="zhibo_div_div">';
				html+='			<span class="zhibo_mai"><span>买</span></span>';
				html+='			<span class="zhibo_price">'+parseInt(this.buy_price[i].trade_price)+'</span>';
				html+='			<span class="zhibo_num">'+((parseInt(this.buy_price[i].trade_amount)==0 || this.buy_price[i].trade_amount=='')?'500':this.buy_price[i].trade_amount)+'吨</span>';
				html+='			<div class="zhibo_div_yinc"><p>'+(this.buy_price[i].note!=null?this.buy_price[i].note:'--')+'</p></div>';
				html+='		</div>';
				html+='	</li>';				
			//}						
			this.zhiboObj.append(html);
		}
		if(typeof(temp_push_price[0])!='undefined'){
			var $_zhibo_time = jQuery('.'+this.zhiboObj.attr('id')+'_time');
			if($_zhibo_time==null || $_zhibo_time.length<1) return;
			$_zhibo_time.html(temp_push_price[temp_push_price.length-1].create_time.substr(10));
		}
		if(this.buy_price.length==0&&this.sell_price.length==0){
			var html = '<li><div class="zhibo_div_div"><span class="zhibo_mai"><span>--</span></span><span class="zhibo_price">--</span><span class="zhibo_num">--</span><p>暂无报价</p></div></li>';
            this.zhiboObj.prepend(html);
		}
	}
}


function OfferStore() {
    //报价详细信息只保留实时数据，用数组保存即可
    this.offers = new Array();
    //报价信息包括历史数据和当前实时数据，采用{时间：数据}来保存
    //卖、买、成交
    this.prices = [new Array(), new Array(), new Array()];
    this.sell_begin_price=0;
    this.buy_begin_price=0;

    this.is_rest_area = function(timestamp){
    	var current_date = new Date(timestamp * 1000);
    	var current_time = current_date.getHours()+':'+current_date.getMinutes();
    	return (typeof(rest_time_area) == 'undefined')?false:(current_time>=rest_time_area[0]&&current_time<rest_time_area[1]);
    }
    	
    this.priceAccordingTime = function (timestamp, price_type) {
        var priceArray = this.prices[price_type];
        for (var i = 0; i < priceArray.length; i++) {
            x = priceArray[i];
            if (x.timestamp === timestamp) {
                //找到了
                return i;
            }
        }
        //没有值，返回null
        return null;
    };

    this.addPrice = function (arr, price_type) {
        var price = new Price(arr);
        var index = this.priceAccordingTime(price.timestamp, price_type);
        if(!this.is_rest_area(price.timestamp)){
	        if (index === null) {
	            //赋值
	            this.prices[price_type].push(price);
	        } else {
	            //有则更新
	            this.prices[price_type][index] = price;
	        }
        }
    };

    this.priceSummary = function (timestamp, price_type) {
        var index = this.priceAccordingTime(time2minutes(timestamp));
        if (index === null) {
            //没有找到
            return [0, 0, 0];
        } else {
            return this.prices[price_type][index].data;
        }
    };

    this.priceSort = function (x, y) {
        return x.timestamp - y.timestamp;
    };

    //根据历史价格数据，返回需要的数组数据
    this.priceArr = function (price_type) {
        var prices = this.prices[price_type];
        //排序
        prices.sort(this.priceSort);
        var data = new Array();
        for (var i = 0; i < prices.length; i++) {
            x = prices[i];
            d = {name: x.timestamp, value: x.data[2], data: x.data};
            data.push(d);
        }
        if (data.length == 0) {
            x = new Price([0, 0, 0, 0]);
            d = {name: x.timestamp, value: x.data[2], data: x.data};
            data.push(d);
        }
        return data;
    };

    //历史数据
    this.priceHistory = function (json) {
        //买历史
        var i = 0, loop = 5;
        if(typeof(json.data.sell) != "undefined"){
	        for (var i = 0; i < json.data.sell.length; i++) {
	            this.addPrice(json.data.sell[i], PriceType.Sell);
	        }
    	}
        if(typeof(json.data.buy) != "undefined"){
	        for (var i = 0; i < json.data.buy.length; i++) {
	            this.addPrice(json.data.buy[i], PriceType.Buy);
	        }
        }
        if(typeof(json.data.order) != "undefined"){
	        for (var i = 0; i < json.data.order.length; i++) {
	            this.addPrice(json.data.order[i], PriceType.Order);
	        }
        }
    };
	
	//默认填充
    this.defaultInit = function (timestamp) {//9点的时间戳
        for (var i = timestamp; i < timestamp + 3600*9; i += 60) {
            var tmp = ['-','-','-',i];
            this.addPrice(tmp, PriceType.Sell);
            this.addPrice(tmp, PriceType.Buy);
            this.addPrice(tmp, PriceType.Order);
        }
    }
}

/*
 * echart封装
 */
function MyChart(product_id, user_id, ninestamp, company_id) {
    this.productId = product_id;
    this.userId = user_id;
    this.offerStore = new OfferStore();
	this.offerStore.defaultInit(ninestamp);
    this.OfferBird = new OfferBird();
    this.staticBrid = new StaticBrid();
    this.myDataChart;
    this.url = (parseInt(this.userId)>0)?"/api/person_pan/index?pid="+this.productId+"&uid="+this.userId:"/api/product_pan/index?pid="+this.productId;
    if (typeof(company_id) != "undefined") {
        this.url = "/api/company_product_pan/index?pid="+this.productId+"&cid="+company_id;
    }
    this.initialize = function () {
        //初始化数据
        var mychart = this;
        mychart.offerStore.sell_begin_price="-";
        mychart.offerStore.buy_begin_price="-";
        jQuery.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: this.url,
                dataType: "json",
                //async:false,
                complete: function () { },
                success: function (result) {
                    mychart.offerStore.priceHistory(result);
                    if(result.data.open_price){
                        mychart.offerStore.sell_begin_price=result.data.open_price[1]==null?"-":result.data.open_price[1];
                        mychart.offerStore.buy_begin_price=result.data.open_price[0]==null?"-":result.data.open_price[0];
                    }
                    mychart.refreshChart();
                    //初始化报价
                    /*if(result != null && result.data != null && result.data.bird_info != null){
	                    mychart.OfferBird.init(result.data.bird_info);
	                    mychart.OfferBird.render();
                    }*/
                  //初始化统计
                    if(result != null && result.data != null && result.data.static_info != null){
	                    mychart.staticBrid.init(result.data.static_info);
	                    mychart.staticBrid.render();
                    }
//                    mychart.OfferBird.render();
                    mychart.OfferBird.renderDync();
                },
                error: function (result, status) { 
                }
            });
    };

    this.init_static = function(staticPriceId){
    	 this.staticBrid.init({obj:staticPriceId});
    }
    
    this.init_mobile_price = function(mobelObj){
    	 this.OfferBird.init({mobelObj:mobelObj});
    }
    this.init_dync_price = function(dyncObj){
    	 this.OfferBird.init({dyncObj:dyncObj});
    }
    
    this.init_zhibo_price = function(zhiboObj){
    	this.OfferBird.init({zhiboObj:zhiboObj});
    }
    
    this.init = function (elementId,birdPriceId,length_cnt,self_option) {
        this.myDataChart = echarts.init(document.getElementById(elementId));
        if(!length_cnt){
        	length_cnt = 5; 
		}
        this.OfferBird.init({obj:birdPriceId,length_cnt:length_cnt});
        if(!self_option && typeof(self_option) != 'undefined'){
        	option = self_option;
        }else{
        	option = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                           // sell = buy = order = undefined;
                            for(var i = 0; i < params.length; i++) {
                                if (params[i].seriesName === '卖出')
                                    sell = params[i];
                                else if (params[i].seriesName === '买入')
                                    buy = params[i];
                                else if (params[i].seriesName === '成交')
                                    order = params[i];
                                else
                                    continue;
                            }
                            var str = "";
                            if(params[0]!=undefined)
                                str = params[0].name;
                            if (sell != undefined && sell.data != undefined) {
                                str += '<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#3fce43"></span>卖出：' + sell.data.data[2] + '&nbsp;&nbsp;&nbsp;' + '&nbsp;&nbsp;&nbsp;最大：' + sell.data.data[0] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最小：' + sell.data.data[1];
                            }
                            if (buy != undefined && buy.data != undefined) {
                                str += '<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ff1400"></span>买入：' + buy.data.data[2] + '&nbsp;&nbsp;&nbsp;' + '&nbsp;&nbsp;&nbsp;最大：' + buy.data.data[0] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最小：' + buy.data.data[1];
                            }
                            if (order != undefined && order.data != undefined) {
                                str += '<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#4385f5"></span>成交：' + order.data.data[2] + '&nbsp;&nbsp;&nbsp;' + '&nbsp;&nbsp;&nbsp;最大：' + order.data.data[0] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最小：' + order.data.data[1];
                            }
                            return str;
                        },
                        axisPointer: {
                            animation: false
                        },
                    },

                grid: {
                	top: '8%',
                	left: '1%',
                	right: '3%',
                	bottom: '7%',
                	containLabel: true
                },
                    legend: {
                    	orient: 'horizontal',
                    	right:'2%',
                    	top:'0',
                    	itemWidth: 8,
                        data: [{
                                name: '卖出',
                                // 强制设置图形为圆。
                                icon: 'circle',                                
                                // 设置文本为黑色
                                textStyle: {                               
                                    color: '#ffffff'
                                }
                            }, {
                                name: '买入',
                                // 强制设置图形为圆。
                                icon: 'circle',
                                // 设置文本为红色
                                textStyle: {
                                    color: '#ffffff'
                                }
                            }, {
                                name: '成交',
                                // 强制设置图形为圆。
                                icon: 'circle',
                                // 设置文本为红色
                                textStyle: {
                                    color: '#ffffff',
                                }
                            }
                        ]/*,
                        selected:{
                            '成交': false
                        }*/
                    },

                    backgroundColor: '#ffffff',
                    xAxis: {
                        type: 'category',

                        splitLine: {
                            show:true,
                            lineStyle: {  
                                color: ['#262930']  
                            },
                            interval: function (index, value) {
                                if (value == "09:00"
                                	|| value == "09:30"
                                    || value == "10:00"
                                    || value == "10:30"
                                    || value == "11:00"
                                    || value == "11:30"
                                    || value == "12:00"
                                    || value == "12:30"
                                    || value == "13:00"
                                    || value == "13:30"
                                    || value == "14:00"
                                    || value == "14:30"
                                    || value == "15:00"
                                    || value == "15:30"
                                    || value == "16:00"
                                    || value == "16:30"
                                    || value == "17:00"
                                    || value == "17:30"
                                    || value == "18:00"||has_flag(value)) {
                                    return true;
                                } else
                                    return false;
                            }
                        },
                        axisTick: {
                            show: true,
                            interval: function (index, value) {
                                if (value == "09:00"
                                	|| value == "09:30"
                                    || value == "10:00"
                                    || value == "10:30"
                                    || value == "11:00"
                                    || value == "11:30"
                                    || value == "12:00"
                                    || value == "12:30"
                                    || value == "13:00"
                                    || value == "13:30"
                                    || value == "14:00"
                                    || value == "14:30"
                                    || value == "15:00"
                                    || value == "15:30"
                                    || value == "16:00"
                                    || value == "16:30"
                                    || value == "17:00"
                                    || value == "17:30"
                                    || value == "18:00"||has_flag(value)) {
                                    return true;
                                } else
                                    return false;
                            }
                        },
                        axisLabel: {
                            show: true,  
                            interval: 5,
//	                         rotate:-45,
//	                         margin:6,
	                        fontSize:9,
                            formatter: function (value, index) {
                                if (value == "09:00"
                                    || value == "10:30"
                                    //|| value == "11:00"
                                    || value == "12:00"
                                    || value == "13:00"
                                    //|| value == "14:00"
                                    || value == "15:00"
                                    || value == "16:30"
                                    //|| value == "17:00"
                                    || value == "18:00"||has_flag(value)) {
                                    return value;
                                } else {
                                    return "";
                                }
                            },
                            textStyle: {
                                color: '#90939a'
                            }
                        },
                        data: categoryData,
                        axisLine: {onZero: true},
                        axisLine:{  
                            lineStyle:{  
                                color:'#262930',    
                            }  
                        }
                    },
//                   grid: { // 控制图的大小，调整下面这些值就可以，
//			             x:40,
//			             x2:40,
//			             y2:50,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
//			         },
                    yAxis: {
                        type: 'value',
                        scale: true,
                        splitLine: {
                            show: true,
                            lineStyle: {  
                                color: ['#262930']  
                            },
                        },
                        splitArea: {
                            show:false
                        },
                        min: function(value) {
                            return parseInt(value.min-value.max*0.003);
                        },
                        max: function(value) {
                            return parseInt(value.max+value.max*0.003);//(value.max+value.max*0.004
                        },
                        axisLabel : {
                            textStyle: {
                                color: '#90939a'
                            }
                        },
                        axisLine:{  
                            lineStyle:{  
                                color:'#262930',  
                            }  
                        }  
                    },
                    series: [
                        {
                            name: '卖出',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: false,
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: '#3fce43',
                                    lineStyle: {
                                        color: '#3fce43',
                                        type: 'solid',
                                        width: 1,
                                    },
                                }
                            },
                        },
                        {
                            name: '买入',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: false,
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: '#ff1400',
                                    lineStyle: {
                                        color: '#ff1400',
                                        type: 'solid',
                                        width: 1,
                                    }
                                }
                            }
                        },
                        {
                            name: '成交',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: false,
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: '#4385f5',
                                    lineStyle: {
                                        color: '#4385f5',
                                        type: 'solid',
                                        width: 1,
                                    }
                                }
                            },
                        }]
                };
        }

        this.myDataChart.setOption(option);
        this.initialize();
    };
    this.refreshChart = function () {
        var sell_data = this.offerStore.priceArr(PriceType.Sell);
        var buy_data = this.offerStore.priceArr(PriceType.Buy);
        var order_data = this.offerStore.priceArr(PriceType.Order);
        var sell_begin_price=this.offerStore.sell_begin_price;
        var buy_begin_price=this.offerStore.buy_begin_price;
        (typeof(this.myDataChart)!='undefined')&&this.myDataChart.setOption({
            series: [{
                    data: sell_data,
                    markLine: {
                        data: [
                            {name: '卖出起始价', xAxis: 0, yAxis: sell_begin_price},
                        ]
                    }
                },
                {
                    data: buy_data,
                    markLine: {
                        data: [
                            {name: '买入起始价', xAxis: 0, yAxis: buy_begin_price},
                        ]
                    }
                },
                {
                    data: order_data
                }
            ]
        });
    };
}

/*
 * k线echart封装
 */
function MyKChart(product_id, user_id) {
    this.productId = product_id;
    this.userId = user_id;
    this.categoryData = this.buyData = this.sellData = this.orderData = [];
    this.pan_title = '';
    this.initialize = function () {
        //初始化数据，获取图表需要展示的数据
         var mychart = this;
         jQuery.ajax({
             type: "POST",
             contentType: "application/json;charset=utf-8",
             url: "/api/person_quarter_pan/index?pid=" + this.productId + "&uid=" + this.userId,
             dataType: "json",
             async: false,
             complete: function () {
             },
             success: function (result) {
                 //初始化报价
                 if (result != null && result.data != null) {
                	 mychart.categoryData = result.data.x_data;
                	 mychart.buyData = result.data.buy;
                	 mychart.sellData = result.data.sell;
                	 mychart.orderData = result.data.order;
                 }
                 mychart.pan_title = result.pan_name;
             },
             error: function(result, status){}
         });
         return this;
    };

    this.render = function (elementId,pan_title) {
    	var mychart = this;
    	if(!pan_title){pan_title=mychart.pan_title;}
        var upColor = '#ec0000';
        var upBorderColor = '#8A0000';
        var downColor = '#00da3c';
        var downBorderColor = '#008F28';
        this.myDataChart = echarts.init(document.getElementById(elementId));
        option = {
            title: {
                text: "",
                left: 0
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
            },
            legend: {
                data: [{
                    name: '卖出',
                    icon: 'circle'
                }, {
                    name: '买入',
                    icon: 'circle'
                }, {
                    name: '成交',
                    icon: 'circle'
                }],
                /*selected:{
                    '成交': false
                },*/
                selectedMode:"single"

            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: mychart.categoryData,
                scale: true,
                boundaryGap : false,
                axisLine: {onZero: false},
                splitLine: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            },
            yAxis: {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            series: [
                {
                    name: '卖出',
                    type: 'candlestick',
                    data: mychart.sellData,
                    itemStyle: {
                        normal: {
                            color: upColor,
                            color0: downColor,
                            borderColor: upBorderColor,
                            borderColor0: downBorderColor
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (param) {
                            var res = "时间:"+param['name'];
                                res += '<br/>  开盘 : ' + param['data'][1] + '<br/>  收盘 : ' + param['data'][2];
                                res += '<br/>  最低 : ' + param['data'][3] + '<br/>  最高 : ' + param['data'][4];
                                return res;
                        }
                    },
                    markPoint: {
                        label: {
                            normal: {
                                formatter: function (param) {
                                    return param != null ? Math.round(param.value) : '';
                                }
                            }
                        },
                        data: [
                            {
                                name: '最高值',
                                type: 'max',
                                valueDim: 'highest'
                            },
                            {
                                name: '最低值',
                                type: 'min',
                                valueDim: 'lowest'
                            },
                            {
                                name: '收盘平均价',
                                type: 'average',
                                valueDim: 'close'
                            }
                        ],
                        tooltip: {
                            trigger: 'item',
                            formatter: function (param) {
                                return param.name + '<br>' + (param.data.coord || '');
                            }
                        }
                    },
                    markLine: {
                        symbol: ['none', 'none'],
                        data: [
                            [
                                {
                                    name: 'from lowest to highest',
                                    type: 'min',
                                    valueDim: 'lowest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        normal: {show: false},
                                        emphasis: {show: false}
                                    }
                                },
                                {
                                    type: 'max',
                                    valueDim: 'highest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        normal: {show: false},
                                        emphasis: {show: false}
                                    }
                                }
                            ],
                            {
                                name: '收盘最小值',
                                type: 'min',
                                valueDim: 'close'
                            },
                            {
                                name: '收盘最大值',
                                type: 'max',
                                valueDim: 'close'
                            }
                        ]
                    }
                },
                {
                    name: '买入',
                    type: 'candlestick',
                    data: mychart.buyData,
                    itemStyle: {
                        normal: {
                            color: upColor,
                            color0: downColor,
                            borderColor: upBorderColor,
                            borderColor0: downBorderColor
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (param) {
                            var res = "时间:"+param['name'];
                            res += '<br/>  开盘 : ' + param['data'][1] + '<br/>  收盘 : ' + param['data'][2];
                            res += '<br/>  最低 : ' + param['data'][3] + '<br/>  最高 : ' + param['data'][4];
                            return res;
                        }
                    },
                    markPoint: {
                        label: {
                            normal: {
                                formatter: function (param) {
                                    return param != null ? Math.round(param.value) : '';
                                }
                            }
                        },
                        data: [
                            {
                                name: '最高值',
                                type: 'max',
                                valueDim: 'highest'
                            },
                            {
                                name: '最低值',
                                type: 'min',
                                valueDim: 'lowest'
                            },
                            {
                                name: '收盘平均值',
                                type: 'average',
                                valueDim: 'close'
                            }
                        ],
                        tooltip: {
                            trigger: 'item',
                            formatter: function (param) {
                                return param.name + '<br>' + (param.data.coord || '');
                            }
                        }
                    },
                    markLine: {
                        symbol: ['none', 'none'],
                        data: [
                            [
                                {
                                    name: 'from lowest to highest',
                                    type: 'min',
                                    valueDim: 'lowest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        normal: {show: false},
                                        emphasis: {show: false}
                                    }
                                },
                                {
                                    type: 'max',
                                    valueDim: 'highest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        normal: {show: false},
                                        emphasis: {show: false}
                                    }
                                }
                            ],
                            {
                                name: '收盘最小值',
                                type: 'min',
                                valueDim: 'close'
                            },
                            {
                                name: '收盘最大值',
                                type: 'max',
                                valueDim: 'close'
                            }
                        ]
                    }
                },
                {
                    name: '成交',
                    type: 'candlestick',
                    data: mychart.orderData,
                    itemStyle: {
                        normal: {
                            color: upColor,
                            color0: downColor,
                            borderColor: upBorderColor,
                            borderColor0: downBorderColor
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (param) {
                            var res = "时间:"+param['name'];
                            res += '<br/>  开盘 : ' + param['data'][1] + '<br/>  收盘 : ' + param['data'][2];
                            res += '<br/>  最低 : ' + param['data'][3] + '<br/>  最高 : ' + param['data'][4];
                            return res;
                        }
                    },
                    markPoint: {
                        label: {
                            normal: {
                                formatter: function (param) {
                                    return param != null ? Math.round(param.value) : '';
                                }
                            }
                        },
                        data: [
                            {
                                name: '最高值',
                                type: 'max',
                                valueDim: 'highest'
                            },
                            {
                                name: '最低值',
                                type: 'min',
                                valueDim: 'lowest'
                            },
                            {
                                name: '收盘平均值',
                                type: 'average',
                                valueDim: 'close'
                            }
                        ],
                        tooltip: {
                            trigger: 'item',
                            formatter: function (param) {
                                return param.name + '<br>' + (param.data.coord || '');
                            }
                        }
                    },
                    markLine: {
                        symbol: ['none', 'none'],
                        data: [
                            [
                                {
                                    name: 'from lowest to highest',
                                    type: 'min',
                                    valueDim: 'lowest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        normal: {show: false},
                                        emphasis: {show: false}
                                    }
                                },
                                {
                                    type: 'max',
                                    valueDim: 'highest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        normal: {show: false},
                                        emphasis: {show: false}
                                    }
                                }
                            ],
                            {
                                name: '收盘最大值',
                                type: 'min',
                                valueDim: 'close'
                            },
                            {
                                name: '收盘最小值',
                                type: 'max',
                                valueDim: 'close'
                            }
                        ]
                    }
                }
            ]
        };
        this.myDataChart.setOption(option);

    };

}

/*
 * 柱状图echart封装
 */
function MyColumnarChart() {
    this.dateData = this.buyData = this.sellData = this.dealData = [];
    this.pan_title = '';
    this.myDataChart;
    this.initialize = function (dateData,buyData,sellData,dealData) {
        //初始化数据，获取图表需要展示的数据
        var mychart = this;
        mychart.dateData = dateData;
        mychart.buyData = buyData;
        mychart.sellData = sellData;
        mychart.dealData = dealData;
        return this;
    };

    this.render = function (elementId,pan_title) {
        var mychart = this;
        if(!pan_title){pan_title=mychart.pan_title;}
        this.myDataChart = echarts.init(document.getElementById(elementId));
        option = {
            title: {
                text: pan_title,
                left: 0
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['卖出', '买入', '成交']
                /*selected:{
                    '成交': false
                }*/
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: mychart.dateData,
                axisPointer: {
                    type: 'shadow'
                },
            },
            yAxis: {
                type: 'value',
                name: '数量',
                axisLabel: {
                    formatter: '{value}',
                },
                splitLine: {
                    lineStyle:{color:'#eee'},
                },
            },
            series: [
                {
                    name:'卖出',
                    type:'bar',
                    data:mychart.sellData,
                    itemStyle: {
                        //通常情况下：
                        normal:{
                            color: 'rgb(0, 166, 90)'
                        },
                    },
                },
                {
                    name:'买入',
                    type:'bar',
                    data:mychart.buyData,
                    itemStyle: {
                        //通常情况下：
                        normal:{
                            color: 'rgb(221, 75, 57)'
                        },
                    },
                },
                {
                    name:'成交',
                    type:'bar',
                    data:mychart.dealData,
                    itemStyle: {
                        //通常情况下：
                        normal:{
                            color: 'rgb(0, 192, 239)'
                        },
                    },
                }
            ]
        };
        this.myDataChart.setOption(option);

    };
}
/*
 * 线性图echart封装
 */
function MyLineChart() {
    this.myDataChart;
    this.render = function (elementId,pan_title) {
        var mychart = this;
        this.myDataChart = echarts.init(document.getElementById(elementId));
        return this;
    };
}

//历史数据盘
/*
 * echart封装
 */
function MyOldChart(product_id, user_id, ninestamp) {
    this.productId = product_id;
    this.userId = user_id;
    this.offerStore = new OfferStore();
	this.offerStore.defaultInit(ninestamp);
    this.myDataChart;
  
    this.init = function (elementId,self_option) {
        this.myDataChart = echarts.init(document.getElementById(elementId));
        
        if(!self_option && typeof(self_option) != 'undefined'){
        	option = self_option;
        }else{
        	option = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            sell = buy = order = undefined;
                            for(var i = 0; i < params.length; i++) {
                                if (params[i].seriesName === '卖出')
                                    sell = params[i];
                                else if (params[i].seriesName === '买入')
                                    buy = params[i];
                                else if (params[i].seriesName === '成交')
                                    order = params[i];
                                else
                                    continue;
                            }
                            var str = "";
                            if(params[0]!=undefined)
                                str = params[0].name;
                            if (sell != undefined && sell.data != undefined) {
                                str += '<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#3fce43"></span>卖出：' + sell.data.data[2] + '&nbsp;&nbsp;&nbsp;' + '&nbsp;&nbsp;&nbsp;最大：' + sell.data.data[0] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最小：' + sell.data.data[1];
                            }
                            if (buy != undefined && buy.data != undefined) {
                                str += '<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ff1400"></span>买入：' + buy.data.data[2] + '&nbsp;&nbsp;&nbsp;' + '&nbsp;&nbsp;&nbsp;最大：' + buy.data.data[0] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最小：' + buy.data.data[1];
                            }
                            if (order != undefined && order.data != undefined) {
                                str += '<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#4385f5"></span>成交：' + order.data.data[2] + '&nbsp;&nbsp;&nbsp;' + '&nbsp;&nbsp;&nbsp;最大：' + order.data.data[0] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最小：' + order.data.data[1];
                            }
                            return str;
                        },
                        axisPointer: {
                            animation: false
                        },
                    },

                    grid: {
                    	top: '8%',
                    	left: '1%',
                    	right: '3%',
                    	bottom: '1%',
                    	containLabel: true
                    },
                    legend: {
                    	orient: 'horizontal',
                    	right:'2%',
                    	top:'0',
                    	itemWidth: 8,
                        data: [{
                                name: '卖出',
                                // 强制设置图形为圆。
                                icon: 'circle',
                                // 设置文本为黑色
                                textStyle: {
                                    color: '#ffffff'
                                }
                            }, {
                                name: '买入',
                                // 强制设置图形为圆。
                                icon: 'circle',
                                // 设置文本为红色
                                textStyle: {
                                    color: '#ffffff'
                                }
                            }, {
                                name: '成交',
                                // 强制设置图形为圆。
                                icon: 'circle',
                                // 设置文本为红色
                                textStyle: {
                                    color: '#ffffff',
                                }
                            }
                        ]
                        /*selected:{
                            '成交': false
                        }*/
                    },

                    backgroundColor: '#ffffff',
                    xAxis: {
                        type: 'category',

                        splitLine: {
                            show:true,
                            lineStyle: {  
                                color: ['#262930']  
                            },
                            interval: function (index, value) {
                                if (value == "09:00"
                                	|| value == "09:30"
                                    || value == "10:00"
                                    || value == "10:30"
                                    || value == "11:00"
                                    || value == "11:30"
                                    || value == "12:00"
                                    || value == "12:30"
                                    || value == "13:00"
                                    || value == "13:30"
                                    || value == "14:00"
                                    || value == "14:30"
                                    || value == "15:00"
                                    || value == "15:30"
                                    || value == "16:00"
                                    || value == "16:30"
                                    || value == "17:00"
                                    || value == "17:30"
                                    || value == "18:00"||has_flag(value)) {
                                    return true;
                                } else
                                    return false;
                            }
                        },
                        axisTick: {
                            show: true,
                            interval: function (index, value) {
                                if (value == "09:00"
                                	|| value == "09:30"
                                    || value == "10:00"
                                    || value == "10:30"
                                    || value == "11:00"
                                    || value == "11:30"
                                    || value == "12:00"
                                    || value == "12:30"
                                    || value == "13:00"
                                    || value == "13:30"
                                    || value == "14:00"
                                    || value == "14:30"
                                    || value == "15:00"
                                    || value == "15:30"
                                    || value == "16:00"
                                    || value == "16:30"
                                    || value == "17:00"
                                    || value == "17:30"
                                    || value == "18:00"||has_flag(value)) {
                                    return true;
                                } else
                                    return false;
                            }
                        },
                        axisLabel: {
                            show: true,  
                            interval: 0,
//	                         rotate:-45,
//	                         margin:6,
	                        fontSize:9,
                            formatter: function (value, index) {
                                if (value == "09:00"
                                	|| value == "10:30"
                                    //|| value == "11:00"
                                    || value == "12:00"
                                    || value == "13:00"
                                    //|| value == "14:00"
                                    || value == "15:00"
                                    || value == "16:30"
                                    //|| value == "17:00"
                                    || value == "18:00"||has_flag(value)) {
                                    return value;
                                } else {
                                    return "";
                                }
                            },
                            textStyle: {
                                color: '#90939a'
                            }
                        },
                        data: categoryData,
                        axisLine: {onZero: true},
                        axisLine:{  
                            lineStyle:{  
                                color:'#262930',    
                            }  
                        }
                    },
                    yAxis: {
                        type: 'value',
                        scale: true,
                        splitLine: {
                            show: true,
                            lineStyle: {  
                                color: ['#262930']  
                            },
                        },
                        splitArea: {
                            show:false
                        },
                        min: function(value) {
                            return parseInt(value.min-value.max*0.002);
                        },
                        max: function(value) {
                            return parseInt(value.max+value.max*0.002);//(value.max+value.max*0.004
                        },
                        axisLabel : {
                            textStyle: {
                                color: '#90939a'
                            }
                        },
                        axisLine:{  
                            lineStyle:{  
                                color:'#262930',  
                            }  
                        }  
                    },
                    series: [
                        {
                            name: '卖出',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: false,
                            smooth: true,
                            width:2,
                            itemStyle: {
                                normal: {
                                    color: '#3fce43',
                                    lineStyle: {
                                        color: '#3fce43',
                                        type: 'solid',
                                        width: 1,
                                    }
                                }
                            }
                        },
                        {
                            name: '买入',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: false,
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: '#ff1400',
                                    lineStyle: {
                                        color: '#ff1400',
                                        type: 'solid',
                                        width: 1,
                                    }
                                }
                            }
                        },
                        {
                            name: '成交',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: false,
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: '#4385f5',
                                    lineStyle: {
                                        color: '#4385f5',
                                        type: 'solid',
                                        width: 1,
                                    }
                                }
                            },
                        }]
                };
        }
        
        this.myDataChart.setOption(option);
    };
    this.refreshChart = function () {
        var sell_data = this.offerStore.priceArr(PriceType.Sell);
        var buy_data = this.offerStore.priceArr(PriceType.Buy);
        var order_data = this.offerStore.priceArr(PriceType.Order);
        var sell_begin_price=this.offerStore.sell_begin_price;
        var buy_begin_price=this.offerStore.buy_begin_price;
        this.myDataChart.setOption({
            series: [{
                    data: sell_data,
                    markLine: {
                        data: [
                            {name: '卖出起始价', xAxis: 0, yAxis: sell_begin_price},
                        ]
                    }
                },
                {
                    data: buy_data,
                    markLine: {
                        data: [
                            {name: '买入起始价', xAxis: 0, yAxis: buy_begin_price},
                        ]
                    }
                },
                {
                    data: order_data
                }
            ]
        });
    };
}
!function($){
$(document).on('mouseover','.detail-a',function(){
	var righ=$(this).offset().left;
	if(righ<=1340){  
		$('.info_sub').css('right','30px');
		$('.info_sub em').css({'left':'250px','border-style':'solid dashed dashed','border-color':'transparent transparent transparent #e0e0e0'});  
		$('.info_sub>span').css({'left':'248px','border-style':'solid dashed dashed','border-color':'transparent transparent transparent #ffffff'});  
	}else{
		$('.info_sub').css('right','-260px');
		$('.info_sub em').css({'left':'-20px','border-style':'solid dashed dashed','border-color':'transparent #e0e0e0 transparent transparent'});
		$('.info_sub>span').css({'left':'-17px','border-style':'solid dashed dashed','border-color':'transparent #ffffff transparent transparent '}); 
	}        	       	
});
}(jQuery);
