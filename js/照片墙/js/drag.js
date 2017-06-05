/*
** on 订阅（订阅计划）
** fire 发布和通知(执行每个函数)
** off  移除计划
*/
(function(){
    var apiEvent = function(){};
    apiEvent.prototype = {
        constructor: apiEvent,
        on: function(type,eventFn){
            if(!this['myEvent' + type]){
                this['myEvent' + type] = [];
            };
            var ary = this['myEvent' + type];
            for(var i=0; i<ary.length; i++){
                if(ary[i] == eventFn){
                    return;
                };
            };
            ary.push(eventFn);
        },
        fire: function(cueEle,type,e){//执行已经订阅容器中的每个事件
            var ary = this['myEvent' + type];
            if(ary && ary instanceof Array){
                for(var i=0; i<ary.length; i++){
                    var tempFn = ary[i];
                    if(tempFn instanceof Function){
                         tempFn.call(cueEle,e);
                    }else{
                        ary.splice(i,1);
                        i--;
                    };
                };
            };  
        },
        off: function(type,eventFn){
            var ary = this['myEvent' + type];
            if(ary && ary instanceof Array){
                for(var i=0; i<ary.length; i++){
                    var tempFn = ary[i];
                    if(tempFn == eventFn){
                        ary[i] = null;
                        return;
                    };
                };
            };  
        }
    };
    window.apiEvent = apiEvent;
})();
(function(){
    var Drag = function(curEle){
        var that = this;
        this.startX = null;
        this.startY = null;
        this.curEle = curEle;
        this.curEleTop = null;
        this.curEleLeft = null;
        this.curEle.onmousedown = function(e){
            that.down(e);
        };
    };
    Drag.prototype = new apiEvent;
    Drag.prototype.down = function(e){
        var that = this;
        e = e || window.event;
        //鼠标和盒子的开始位置
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.curEleTop = this.curEle.offsetTop;
        this.curEleLeft = this.curEle.offsetLeft;
        document.onmousemove = function(e){
            that.move(e);
        };
        document.onmouseup = function(){
            that.up();
        }
    };
    Drag.prototype.move = function(e){
        var that = this;
        e = e || window.event;
        var curL = e.clientX - this.startX + this.curEleLeft,
            curT = e.clientY - this.startY + this.curEleTop;
        this.curEle.style.top = curT + 'px';
        this.curEle.style.left = curL + 'px';
        that.fire(that.curEle,'mouseMoveFn');
    };
    Drag.prototype.up = function(){
        document.onmousemove = null;
        document.onmouseup = null;
        that.fire(that.curEle,'mouseEndFn');
    };
    window.Drag = Drag;
})();
 
 