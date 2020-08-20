
// 返回顶部效果
$(window).scroll( ()=>{
    if($(window).scrollTop()>700){
        $('.backTop').fadeIn(1000)
    }else{
        $('.backTop').fadeOut(1000)
    }
})
$('.backTop').click( ()=>{
    $('html').animate({
        scrollTop:0
    },1000)
})





// 头部选项卡 
      
class SetTabES6 {
    constructor(element) {
        this.ele = element;
        // 找到 要点击的 a
        this.oUllis = document.querySelectorAll('.tab');
        // 找到 要显示的内容
        this.oDivs = document.querySelectorAll('.subnav-lists');
    }
  
    fun() {
        let oldThis = this;
        this.ele.addEventListener('click', function (e) {
            e = e || window.event;
            if (e.target.getAttribute('name') === 'ulli') {
                oldThis.oUllis.forEach(function (item, key) {
                    // forEach中,this的指向是 window 
                    // ul  li
                    // item.className = '';
                    // ol li
                    oldThis.oDivs[key].className = 'subnav-lists';
                })
                // e.target.className = 'active';
                console.log(e.target);
                console.log( oldThis.oDivs[e.target.getAttribute('index')]);

                oldThis.oDivs[e.target.getAttribute('index')].className = 'subnav-lists active';
               
            }
        })
    }
}

// 父级
const oFatherUl = document.querySelector('.subnav-ul');
// 调用函数 完成选项卡
const SetTab = new SetTabES6(oFatherUl);
SetTab.fun();


 //   鼠标划过 出现下拉菜单 使用jQuery 的上卷
document.querySelector('.has-child').addEventListener('mouseenter',()=>{
    $('.subnav-ul').css({display:'block'});
    $('.subnav-lists').parent().slideDown(1000);
    $('.subnav-lists').first().slideDown(1500);
   
    document.querySelectorAll('.subnav-lists').forEach(function(item,key){
            item.addEventListener('mouseleave',()=>{
                $('.subnav-lists').first().slideUp(500);

                // 加了这句所有的都会上卷 但是会出现bug 就是上面的点击切换有的会失灵
                $('.subnav-lists').slideUp(500);
                
                $('.subnav-lists').parent().slideUp(1000);
                var tabtime= window.setTimeout(function(){
                    $('.subnav-ul').css({display:'none'});
                },800)
                // clearTimeout(tabtime)
             })
    })
   
})

//
//
// 实际项目中,登录要执行,哪儿来的回哪儿去的效果
// 也就是从哪个页面跳转来的,再回去哪个页面
// 实现方式:跳转至登录页面时,携带当前页面地址信息


// 1,通过函数,获取地址栏参数
const valObj = getUrlVal();

// 定义变量,存储响应体数据
let res = {};

// 2,发送ajax请求,渲染生成页面内容
$.ajax({
url:'../server/goods_detail.php',
data:{ goods_id : valObj.goods_id },
type: 'post',
dataType: 'json',
success:function(result){
    // 给全局变量res 赋值 , 存储 result 结果,也就是当前商品信息
    res = result;
    console.log(result);
    let str = `
    <div class="panel-body">
    <div class="media">
        <div class="media-left show">
            <a href="#" class="show">
                <img class="media-object" src="${result.goods_small_logo}" name="picture" alt="...">
                <div class="mask"></div>
            </a>
        </div>
        <div class="glass">
            <img class="bigimg" src="${result.goods_big_logo}"  alt="...">
        </div>
        <div class="media-body">
        <h4 class="media-heading">${result.goods_name}</h4>
        <p class='price'>
            <i class="glyphicon glyphicon-yen"></i>
            <span>￥ ${result.goods_price}</span>
        </p>
        <div class="btn-group" role="group" aria-label="...">
            <button type="button" class="btn btn-default">XL</button>
            <button type="button" class="btn btn-default">L</button>
            <button type="button" class="btn btn-default">M</button>
            <button type="button" class="btn btn-default">S</button>
            <button type="button" class="btn btn-default">XS</button>
        </div>
        <p class="btn-buy">
            <a href="javascript:;" class="btn btn-warning btn-lg" role="button">立即购买</a>
            <a href="javascript:;" class="btn btn-danger btn-lg" name="join" role="button" id="addToCart">加入购物车</a>
            <a href="../pages/cart.html" class="cart" id="shopCart"> 
                <span>点击</span>
                <span id="shopNum">0</span>
                
                购物车
                
            </a>
        </p>
        </div>
    </div>
    <ul class="nav nav-tabs">
        <li role="presentation" ><a href="#" style="background:#ccc">商品详细信息</a></li>
        <li role="presentation"><a href="#">商品参数信息</a></li>
        <li role="presentation"><a href="#">相关商品</a></li>
    </ul>
    <div>
        ${result.goods_introduce}
    </div>
    </div>
    `;

    $('.panel').append( str );
}
})

    // 页面内容是动态生成的,要通过事件委托,执行点击事件
    // 不能直接获取标签对象,加载事件
    // 因为 ajax请求是 异步执行的

    const oFather = document.querySelector('.panel');
    console.log(oFather);
    // 加个放大镜效果
    //鼠标移入父级 先让图片的出现边框 让遮盖层显示
    oFather.addEventListener('mouseenter',e=>{
    const omedia = document.querySelector('.media');
    const oZoom = new SetZoom(omedia);
        oZoom.init();
    })





oFather.addEventListener('click' , e=>{
if(e.target.getAttribute('name') === 'join'){
    // 1先判断,是否已经登录,看有没有 cookie 中的 login
    const cookieObj = myGetCookie();

    // 2,创建一个数组,存储购物车数据内容
    let arr = [];
    
    if( cookieObj.login === undefined ){
    // 没有登录,先登录
    let bool = window.confirm('您还没有登录,点击确定,跳转登录,点击取消,啥也不干');

    if(bool){
        // 跳转登录页面,携带当前页面信息
        // 跳转的地址是 登录页面地址携带当前页面地址信息参数
        window.location.href = `./login.html?url=${window.location.href}`;
    }
    }else{
    // 已经登录,要把商品信息添加到购物车中
    // 如果没有这个商品信息,执行新增商品信息
    // 如果已经有这个商品,购买数量+1
    // 实现购物车效果,应该是在数据库中做相关的操作
    // 现在没有数据库,而且购物车的数据库,执行非常复杂
    // 使用 localStorage 来模拟 购物车数据库

    // 1, 购物车信息不存在 调用结果是 null ,直接写入商品信息
    if( localStorage.getItem( 'cart' ) === null){
        // 当前商品的所有信息都存储在 result 形参中 是对象形式
        // 需要添加一些属性值 购买数量1 , 默认购买
        // 在 全局变量res,操作当前商品信息
        res.num = 1;     // 购买数量是1
        res.buy = true;  // 默认购买

        
        // 将新增数据之后的result对象,写入到数组中
        arr.push(res);
    }else{
        // 加个抛物线特效
        // 抛物线
        var btn = document.querySelector('#addToCart')
        var shopCart = document.querySelector('#shopCart')
        var shopNum = document.querySelector('#shopNum')
        
        
        btn.onclick = function (e) {
            // 计算抛物线上的三个坐标
            // 1、鼠标坐标；2、购物车终点坐标；3、最高点坐标（自己定）
            e = e || window.event
            var x1 = e.clientX,
                y1 = e.clientY,
                x2 = shopCart.offsetLeft,
                y2 = shopCart.offsetTop,
                x3 = x2 - 200,
                y3 = y2 - 100
            
            // 根据数学公式计算抛物线三个系数（这里不用管，拿来用就行）
            var a = -((y2-y3)*x1 - (x2-x3)*y1 + x2*y3 - x3*y2) / ((x2-x3) * (x1-x2) * (x1-x3));
            var b = ((y2-y3)*x1*x1 + x2*x2*y3 - x3*x3*y2 - (x2*x2 - x3*x3)*y1) / ((x2-x3)*(x1-x2)*(x1-x3));
            var c = ((x2*y3 - x3*y2)*x1*x1 - (x2*x2*y3 - x3*x3*y2)*x1 + (x2*x2*x3 - x2*x3*x3)*y1) / ((x2-x3)*(x1-x2)*(x1-x3));
        
            // 创建一个div，添加到页面上
            var div = document.createElement('div')
            div.className = 'active'
            document.body.appendChild(div)
            // 让div沿着抛物线运动
            // 先给div一个初始坐标
            div.style.left = x1 + 'px'
            div.style.top = y1 + 'px'
            var timer = setInterval(() => {
            // 横坐标匀速运动
            x1 += 10
            // 纵坐标按照抛物线公式代入x1计算就行
            y1 = a * x1 * x1 + b * x1 + c
            div.style.left = x1 + 'px'
            div.style.top = y1 + 'px'
            if (x1 >= x2) {
                // 清除定时器
                clearInterval(timer)
                // div移除
                div.remove()
                // 购物车数量++
                shopNum.innerHTML = Number(shopNum.innerHTML) + 1
            }
            }, 30)
        }





        // 如果有购物车数据
        // 如果没有当前商品,新增商品信息
        // 如果有当前商品,当前商品数量+1

        // 定义一个变量
        let bool = true;

        arr = JSON.parse(localStorage.getItem('cart'))  ;

        arr.forEach((v,k)=>{
        // 找是否有与当前商品相同的goods_id
        // 有相同的goods_id,证明商品已经存在,数值+1
        // 没有相同的goods_id,证明商品不存在,直接设定,写入新的商品信息
        if(v.goods_id === res.goods_id){
            // 有商品,购买数量+1
            v.num++;
            bool = false;
        }

        // 循环结束如果 bool 还是true,证明购物车中没有当前商品
        // 执行新增商品操作
        if(bool){
            res.num = 1;
            res.buy = true;
            arr.push(res);
        }

        })
    }
    
    // 将arr存储到localStorage 中
    localStorage.setItem( 'cart' , JSON.stringify(arr) );
    }
}
})

