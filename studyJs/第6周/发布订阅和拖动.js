(function(){
    function MyEvent(){};
    MyEvent.prototype = {
        construction: MyEvent,
        on: function(type,fn){
            !this['myEvent' + type] ?  this['myEvent' + type] = []: null;
            var ary = this['myEvent' + type];
            for(var i=0; i<ary.length; i++){
                if(ary[i] == fn) return;
            };
            ary.push(fn);
        },
        fire: function(type,e){
            var ary = this['myEvent' + type];
            if(ary && ary instanceof Array){
                for(var i=0; i<ary.length; i++){
                    if(typeof ary[i] == 'function'){
                        //这句有重点
                        ary[i](e);
                    }
                };
            }
        }
    }
    window.MyEvent = new MyEvent;
})();
(function(){
    function Drag(opt){
        this.def = {
            target: $('.box')
        }
    };
    Drag.prototype = {
        construction: Drag,
        init: function(){
            this.opt = $.extend(this.def,opt);
            var that = this, opt = that.opt;
            opt.target.bind('mousedown',function(e){
                opt.curEle = $(this);
                that.downFn(e);
                MyEvent.fire('aa',e)
            });
        },
        downFn: function(e){
            var that = this, opt = that.opt,curEle = opt.curEle;
            //记录鼠标开始位置和偏移位置
            curEle.startX = e.clientX - curEle.offset().left;
            curEle.startY = e.clientY - curEle.offset().top;
            $(document).bind('mousemove',function(e){
                that.moveFn(e)
            });
            $(document).bind('mouseup',function(e){
                that.upFu()
            });
        },
        moveFn:function(e){
            var that = this, opt = that.opt,curEle = opt.curEle;
            curEle.css({
                top: e.clientY - curEle.startY,
                left: e.clientX - curEle.startX
            })
        },
        upFu: function(){
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
        }
    };
    window.Drag = new Drag;
   // MyEvent.on('aa',bb);
    function bb(){
        console.log(event.target);
    }

})();
Drag.init();