//����
var adapter = this.JSONPAdapter = {};
    adapter.request = function(url,data,jsonpcallback,callbackFn){
        var callback = 'jsonpAdapter_' + adapter.count(),
            allCallBack = 'adapter.request.' + callback;
        url = tool.hasSearch(url,tool.enCodeURIComponent(data));
        url = tool.hasSearch(url,jsonpcallback+'='+allCallBack);
        adapter.request[callback] = function(data){
            console.log(data);
            try{
                callbackFn(data)
            }finally{//不管成功与失败都删除没用的srcipt
               document.body.removeChild(document.querySelector('#aa'));
               delete adapter.request[callback];
            }
        };
        var script = document.createElement('script');
        script.src = url;
        script.async = 'async';
        script.text = 'text/javascript';
        script.id = 'aa';
        document.body.appendChild(script);
    };
    adapter.count = (function(){
        var time = 0;
        return function(){
            return (++time);
        };
    })();
var tool = {
    enCodeURIComponent: function(data){
       if(!data) return;
       if(typeof data === 'string') return data;
        var arr = [];
        for(var n in data){
            arr.push(encodeURIComponent(n)+'='+encodeURIComponent(data[n]))
        };
        return arr.join('&');
    },
    hasSearch: function(url,dataURI){
        var data = /\?/g.test(url)?('&'+dataURI):('?'+dataURI);
        return url + data;
    }
};
var input = document.querySelector('.box input'),
    ul = document.querySelector('.box ul'),
    box = document.querySelector('.box');
input.onkeyup = function(){
    var that = this;
        content = that.value;
    if(!content) return;
    JSONPAdapter.request('https://gsp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {wd: content, sc: 'hao123'}, 'cb', function (data) {
        backFn(data);
    });
    var backFn = function(data){
        var textFra = document.createDocumentFragment();
        data['s'].forEach(function(val){
            var aHtml = document.createElement('a')
                aHtml.href = 'https://www.baidu.com/s?wd=' + encodeURIComponent(val);
                aHtml.target = '_blank';
                aHtml.innerHTML = val;
            var liH = document.createElement('li');
                liH.appendChild(aHtml);
            textFra.appendChild(liH);
        });
        ul.innerHTML = '';
        ul.appendChild(textFra);
        ul.style.display = 'block';
    };
};
ul.onmouseover = function(event){
    event = event || window.event;
    target = event.target ||event.srcElement;
    if(target.tagName.toLowerCase() == 'a')  input.value =   target.innerHTML;
};
document.documentElement.onclick = function(){
    ul.style.display = 'none';
}
