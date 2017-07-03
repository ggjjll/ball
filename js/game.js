/**
 * Created by Administrator on 2016/6/30 0030.
 */
var $body = document.body;
var body_w = $body.offsetWidth;
var body_h = $body.offsetHeight;
var $MyBox = document.getElementById("MyBox");
var MyBox_R = $MyBox.offsetWidth / 2;
var BoomMach = 1;
var EatMach = 0;        //吃了多少个
var timer = null;
game_inti();
function game_inti(){
    //MyBox居中
    $MyBox.style.left = body_w / 2 - MyBox_R + "px";
    $MyBox.style.top = body_h / 2 - MyBox_R + "px";
    $MyBox.style.visibility = "visible";
    for(var i = 0; i < BoomMach; i ++)
        makeBoom();
    for(var i = 0; i < 10; i ++)
        makeFood();
}
function ball_moveStart(){
    clearInterval(timer);
    timer = setInterval(MyBoxMove,100);
}
function ball_moveEnd(){
    clearInterval(timer);
}
//MyBox移动
function MyBoxMove(){
    var moveR = ball_getMoveRange() * 0.3;
    var BoxLeft = $MyBox.offsetLeft - moveR * ball_getCosAng();
    var BoxTop = $MyBox.offsetTop - moveR * ball_getSinAng();
    //触边检测
    if(BoxLeft <= 0)
        BoxLeft = 0;
    if(BoxLeft >= body_w - MyBox_R * 2)
        BoxLeft = body_w - MyBox_R * 2;
    if(BoxTop <= 0)
        BoxTop = 0;
    if(BoxTop >= body_h - MyBox_R * 2)
        BoxTop = body_h - MyBox_R * 2;
    $MyBox.style.left = BoxLeft + "px";
    $MyBox.style.top = BoxTop + "px";
    var Booms = document.getElementsByClassName("Boom");
    //检查有没有被炸
    for(var i = 0; i < Booms.length; i ++){
        var this_x = Booms[i].offsetLeft;
        var this_y = Booms[i].offsetTop;
        if(isEat(this_x,this_y)){
            Booms[i].remove();
            changeBoxSize(-10);
        }
    }
    var MyFoods = document.getElementsByClassName("MyFood");
    //检查有没有吃到
    for(var i = 0; i < MyFoods.length; i ++){
        var this_x = MyFoods[i].offsetLeft;
        var this_y = MyFoods[i].offsetTop;
        if(isEat(this_x,this_y)){
            MyFoods[i].remove();
            while(MyFoods.length < 10){
                makeFood();
                EatMach += 1;
            }
            changeBoxSize(1);
        }
    }
    if(EatMach >= 10){

        BoomMach += 1;
        EatMach -= 10;
        while(Booms.length < BoomMach)
            makeBoom();
    }
    isGameOver();
}
//生产食物
function makeFood(){
    //坐标
    var food_X = makeRandomNum(MyBox_R,body_w - MyBox_R);
    var food_Y = makeRandomNum(MyBox_R,body_h - MyBox_R);
    //如果已经是“被吃”状态
    if(isEat(food_X,food_Y))
        makeFood();
    //颜色
    var color = makeRandomColor();
    document.getElementById("FoodPoll").innerHTML += '<div class="MyFood" style="top:'+food_Y+'px; left:'+food_X+'px; background-color: '+color+'"></div>'
}
//生产炸弹
function makeBoom(){
    //坐标
    var food_X = makeRandomNum(MyBox_R,body_w - MyBox_R);
    var food_Y = makeRandomNum(MyBox_R,body_h - MyBox_R);
    //如果已经是“被吃”状态
    if(isEat(food_X,food_Y))
        makeBoom();
    document.getElementById("BoomPoll").innerHTML += '<div class="Boom" style="top:'+food_Y+'px; left:'+food_X+'px;"></div>';
}
//产生规定范围随机数
function makeRandomNum(start,end){
    return Math.floor(Math.random() * (end - start)) + start ;
}
//产生随机颜色
function makeRandomColor(){
    var color_r = makeRandomNum(100,200);
    var color_g = makeRandomNum(100,200);
    var color_b = makeRandomNum(100,200);
    return "rgb("+color_r+","+color_g+","+color_b+")";
}
//是否吃到
function isEat(x,y){
    //MyBox圆心坐标
    var cx = $MyBox.offsetLeft + MyBox_R;
    var cy = $MyBox.offsetTop + MyBox_R;
    var dir = getdis(x,y,cx,cy);
    //被吃了
    if(dir <= MyBox_R + 2)
        return true;
    else
        return false;
}
//两点之间的距离
function getdis(x1,y1,x2,y2){
    return parseInt(Math.sqrt((x1-x2) * (x1-x2) + (y1-y2) * (y1-y2)));
}
//改变MyBoxd的尺寸
function changeBoxSize(value){
    MyBox_R += value;
    $MyBox.style.width = $MyBox.style.height = MyBox_R * 2 +"px";
}
function isGameOver(){
    if(MyBox_R >= 0.4 * body_w || MyBox_R >= 0.4 * body_h){
        alert("你太胖了，重新开始吧");
        location.reload();
    }
    else if(MyBox_R <= 0.01 * body_w || MyBox_R <= 0.01 * body_h){
        alert("你太小了，重新开始吧");
        location.reload();
    }
}