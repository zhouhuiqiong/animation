var box = document.querySelector('#box'),
    boxLis = box.querySelectorAll('li'),
    winW = document.documentElement.clientWidth,
    winH = document.documentElement.clientHeight,
    desW = 640,
    desH = 960;
if(winW / winH <= desW / desH){
    box.style.webkitTransform = 'scale('+ winH/desH+')';
}else{
    box.style.webkitTransform = 'scale('+winW/desW+')';
}