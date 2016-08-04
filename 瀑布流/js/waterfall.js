
function waterFall(opt){
    var that = this;
    var defaults = {};
        that.opt = $.extend(defaults,opt);

};
waterFall.prototype = {
    constructor: waterFall,
    init: function(){
        var that = this,opt = that.opt;
        opt.num = Math.floor($(window).width() / opt.wItem);//一行放多少个
        opt.curEle.css({
            width: opt.num * opt.wItem,
            margin: '0px auto'
        });
        setTimeout(function(){
        	that.waterFn();
        },100);
		$(window).bind('scroll',function(){
			 if(that.isLoadImg()){
				that.loadImg();
				that.waterFn();
			};
		});
    },
    isLoadImg: function(){
        var that = this,opt = that.opt;
        var lastEle = opt.curEle.find('div:last'),
            data = lastEle.offset().top + Math.floor(lastEle.height()/2),
            maxH = $(window).scrollTop() + $(window).height();
        return data < maxH ? true : false;
    },
    loadImg: function(){//模拟创造假数据
		var that = this,opt = that.opt,
			html = '';
		for(var i=0; i<20; i++){
			var index = Math.floor(Math.random() * 20 );
				html += '<div class="img-item"><div class="img-main"><img src="./images/'+ index +'.jpg"/></div></div>';
		};
		opt.curEle.append(html);
    },
	waterFn: function(){//计算位置
		var that = this,opt = that.opt;
		var $allImg = opt.curEle.find('.img-item'),
			imgIndexAry = [];

		$allImg.each(function(index,value){
			if(index < opt.num){//第一行
				imgIndexAry.push($allImg.eq(index).outerHeight(true));

			}else{
				var  minH = Math.min.apply(null,imgIndexAry),
					 indexing = $.inArray(minH,imgIndexAry);//找到最小高度的索引值
				$(value).css({
					top: minH,
					position: 'absolute',
					left: $allImg.eq(indexing).position().left
				});
				imgIndexAry[indexing] = imgIndexAry[indexing] + $allImg.eq(index).outerHeight(true);
			};
		});
	}
}
$(function(){
	new waterFall({
		curEle: $('.img-list'),
		wItem : $('.img-list .img-item:eq(0)').outerWidth(true)
	}).init();
})

