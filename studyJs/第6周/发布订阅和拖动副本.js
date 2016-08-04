/**
 * Created by ciro on 16/4/18.
 */
//订阅
function on(curEle,eventType,eventFn){
    if(!curEle['myFn'+eventType]){
        curEle['myFn'+eventType] = [];
    };
    var ary = curEle['myFn'+eventType];
    //判断这个方法是否已经存在
    for(var i=0; i<ary.length; i++){
        if(ary == i){
            return;
        };
    };
    ary.push(eventFn);

};
//发布
function fire(eventType){
    console.log(this);
    var ary = this['myFn' + eventType];
    if(ary instanceof Array){
        for(var i=0; i<ary.length; i++){
            if(typeof ary[i] == 'function'){
                ary[i].call(this);
            };
        };
    }
};

//拖动
(function(){
    function Drag(opt){
        this.def = {};
        this.opts = $.extend(this.def,opt);
    };
    Drag.prototype = {
        construction: Drag,
        init: function(){
            var that = this,opt = that.opts;
            //绑定事件
            opt.target.bind('mousedown',function(e){
                opt.curEle = $(this);
                that.overFn(e);
                fire.call(document.getElementById('box'),'aa');
            });
        },
        overFn: function(e){
            var that = this,opt = that.opts;
            opt.curEle.startX = e.clientX ;
            opt.curEle.startY = e.clientY ;
            opt.curEle.left =  opt.curEle.offset().left;
            opt.curEle.top =   opt.curEle.offset().top;
            $(document).bind('mousemove',function(e){
                that.moveFn(e);
            });
            $(document).bind('mouseup',function(e){
                that.upFn();
            });
        },
        moveFn: function(e){
            var that = this,opt = that.opts;
            var left = e.clientX - opt.curEle.startX + opt.curEle.left,
                top = e.clientY - opt.curEle.startY + opt.curEle.top,
                maxTop = $(window).height() - opt.curEle.height();
                maxLeft = $(window).width () - opt.curEle.width();
            top = top < 0 ? 0 : (top > maxTop ? maxTop : top);
            left = left < 0 ? 0 : (left > maxLeft ? maxLeft : left);
            opt.curEle.css({
                left: left,
                top: top
            });
        },
        upFn: function(){
            $(document).unbind('mousemove').unbind('mouseup');
        }
    };
    window.Drag =  Drag;
})();
$(function(){
    on(document.getElementById('box'),'aa',bb)
    new Drag({
        target: $('.box')
    }).init();
    function bb(){
        console.log(11111);
    }

})
