/**
 * Created by Administrator on 2016/6/28 0028.
 */
/*使用说明：
    ball_moveStart()    鼠标按下后回调函数，可以在自己的js中编写
    ball_moving()       鼠标按下后移动的回调函数，可以在自己的js中编写
    ball_moveEnd()      鼠标抬起后回调函数，可以在自己的js中编写
    ball_getSinAng()    获取当前角度的sin值
    ball_getCosAng()    获取当前角度的cos值
    ball_getTanAng()    获取当前角度的tan值
    ball_getMoveRange() 获取移动距离
* */
var $body = document.body;
var $BigBox;
var $SmallBox;
var BigBox_R;
var SmallBox_R;
var sinAng = 0.0;
var cosAng = 0.0;
var tanAng = 0.0;         //角度的三角函数
var moveRange;      //鼠标移动的距离
var IsMouseDown = false;
var startPoint_X;
var startPoint_Y;
ball_init();
/*c初始化方法*/
function ball_init(){
    //添加DOM节点
    $body.innerHTML += '<div id="BigBox" class="BoxHidden"><div id="SmallBox"></div></div>';
    //相关参数初始化
    $BigBox = document.getElementById("BigBox");
    $SmallBox = document.getElementById("SmallBox");
    BigBox_R = $BigBox.offsetWidth / 2;
    SmallBox_R = $SmallBox.offsetWidth / 2;
    $SmallBox.style.top = $SmallBox.style.left = BigBox_R - SmallBox_R + "px";
    //事件绑定
    //鼠标事件
    $body.addEventListener("mousedown",ball_boxShow);
    $body.addEventListener("mouseup",ball_boxHidden);
    $body.addEventListener("mousemove",ball_boxMove);
    //触碰事件
    $body.addEventListener("touchstart",ball_boxShow);
    $body.addEventListener("touchend",ball_boxHidden);
    $body.addEventListener("touchmove",ball_boxMove);
}
/*出现方向控制面板*/
function ball_boxShow(event){
    event.preventDefault();
    IsMouseDown = true;
    //方向面板“定位”
    if(event.type == "touchstart"){
        var touch = event.targetTouches[0];
        startPoint_X = touch.pageX;
        startPoint_Y = touch.pageY;
    }
    else{
        startPoint_X = event.clientX;
        startPoint_Y = event.clientY;
    }
    var BoxLeft = startPoint_X - BigBox_R + "px";
    var BoxTop = startPoint_Y - BigBox_R + "px";
    $BigBox.style.left = BoxLeft;
    $BigBox.style.top = BoxTop;
    //方向面板出现
    $BigBox.className = "BoxShow";
    ball_moveStart();
}
/*隐藏方向控制面板*/
function ball_boxHidden(event){
    event.preventDefault();
    IsMouseDown = false;
    $SmallBox.style.top = $SmallBox.style.left = BigBox_R - SmallBox_R + "px";
    $BigBox.className = "BoxHidden";
    ball_moveEnd();
}
/*方向控制面板方向发生改变*/
function ball_boxMove(event){
    event.preventDefault();
    if(IsMouseDown){
        var thisPoint_X;
        var thisPoint_Y;
        if(event.type == "touchmove"){
            var touch = event.targetTouches[0];
            thisPoint_X = touch.pageX;
            thisPoint_Y = touch.pageY;
        }
        else{
            thisPoint_X = event.clientX;
            thisPoint_Y = event.clientY;
        }
        ball_setAngle(thisPoint_X,thisPoint_Y);
        ball_moveSmallBox();
        ball_moving();      //回调方法
    }
}
/*为与角度有关的参数赋值*/
function ball_setAngle(x,y){
    var Range_X = -x+startPoint_X;
    var Range_Y = -y+startPoint_Y;
    moveRange = Math.sqrt(Range_X * Range_X + Range_Y * Range_Y);   // 鼠标移动距离
    sinAng = Range_Y / moveRange;
    cosAng = Range_X / moveRange;
    tanAng = Range_Y / Range_X;
    if(moveRange > BigBox_R)
        moveRange = BigBox_R;       //方向面板方向球移动的距离
}
/*移动小方块*/
function ball_moveSmallBox(){
    $SmallBox.style.left = BigBox_R - moveRange * cosAng - SmallBox_R + "px";
    $SmallBox.style.top = BigBox_R - moveRange * sinAng - SmallBox_R + "px";
}
/*返回当前方向的三角函数*/
function ball_getSinAng(){
    return sinAng;
}
function ball_getCosAng(){
    return cosAng;
}
function ball_getTanAng(){
    return tanAng;
}
function ball_getMoveRange(){
    return moveRange;
}
/*鼠标移动时触发的“回调方法”，可自行编写*/
function ball_moving(){}
function ball_moveStart(){}
function ball_moveEnd(){}