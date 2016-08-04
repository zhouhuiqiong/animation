var http = require('http');
var fs = require('fs'),
    mime = require('mime');
//console.log(mime);
var server = http.createServer(function (req, res) {
    //设置header
    res.setHeader('Content-Type',mime.lookup(req.url)+';charset=utf-8');
    fs.readFile('.' + req.url,function(err,data){
        res.write(data);//向客户端发响应体
        res.end();//结束响应 挂掉电话
    });


});
//在本机监听8080端口
server.listen(8080);
