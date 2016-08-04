/**
 * Created by ciro on 16/4/18.
 */
//检查数据类型
//1.typeof obj == 'function'
//2.obj instanceof Function
//3.obj.construction == Array
//4.Object.prototype.toString.call(obj) == '[object Array]'
//Object.prototype.toString.call(obj) == '[object Array]'

//柯里化函数预处理
var  btn = document.querySelector('.btn');
function fn(){
    console.log(this.name);
};
var obj = {
    name: 'zhou',
    age: 12
};
Function.prototype.bind = function(obj){
    //处理传进来的参数
    var data = [].slice.call(arguments,1);
    var that = this;
    //处理事件默认带的e
    return function(){
        var type = [].slice.call(arguments);
        that.apply(obj,data.concat(type));
    };
};
//setTimeout(fn.bind(obj,11),1000);
btn.addEventListener('click',fn.bind(obj,11),false);
