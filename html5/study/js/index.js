$(function(){
    //console.log($('.box').is('div'));
    //filter
    // console.log($('p').filter('.selected:first').addClass('aaaa'));
    // var draw = document.querySelector('#draw');
    // draw.width = 500 + 'px';
    // draw.height = 500 + 'px';
    //
    // var content = draw.getContext('2d');
    // //��һ��ֱ��
    //  content.moveTo(10,10);
    //  content.lineTo(100,100);
    //  content.stroke();
    //�����¼�
    //$('.box').swipeLeft(function(){
    //
    //}).swipeRight(function(){
    //
    //}).tap(function(){ //����
    //    console.log('你单价了');
    //});
    $('.box').singleTap(function(){
        console.log('你单击了');
    }).doubleTap(function(){
        console.log('你双击了');
    }).longTap(function(){
        console.log('你长按了');
    })



});