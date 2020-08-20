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









// <ul class="cart-list"></ul> 中 li是根据购物车数据,动态生成的
// 也就是 根据 localStorage 中 cart 数据信息生成的
// 如果 是 空购物车 生成 一个独立的页面
// 如果 购物车有内容,要根据内容渲染生成页面
// 没有购物车数据  localStorage.getItem( 'cart' ) 结果是是 null

// 页面中的操作,本质上,应该是修改数据中的数据,然后根据新的数据,重新渲染生成页面
// 当前没有购物车的数据库,操作是 localStorage 本地浏览器存储的数据
// 应该是 修改 localStorage 中的 数据,生成新的本地数据,对应的重新渲染,生成新的页面内容

// 获取购物车数组内容,需要把json串,还原为对应的数组
const cartArr = JSON.parse(localStorage.getItem('cart'));

const oFootDiv = document.querySelector('.panel-footer');

const oPanel = document.querySelector('.panel');

setCartList(cartArr, oFootDiv);


// 添加点击事件,实际操作的是 localStorage 中 存储的 cart 数组
// 根据新的数组,渲染生成新的页面

oPanel.addEventListener('click', e => {
if (e.target.getAttribute('name') === 'yes') {
// 点击全选,给数组的所有数值,buy都定义为 true
cartArr.forEach(v => {
v.buy = true;
})
}

if (e.target.getAttribute('name') === 'no') {
// 点击不选,给数组的所有数值,buy都定义为 false
cartArr.forEach(v => {
v.buy = false;
})
}

if (e.target.getAttribute('name') === 'not') {
// 点击反选,给数组的所有数值,buy都定义为 当前值取反
cartArr.forEach(v => {
v.buy = !(v.buy);
})
}


if (e.target.getAttribute('name') === 'che') {
// 点击购物数据前的 复选框,执行效果是,当前状态取反
// 不是修改所有的数据,是修改 数组中 goods_is 与点击标签 goods_id 相同的数据
// 属性值是字符串类型,使用 == 比较
cartArr.forEach(v => {
if (v.goods_id == e.target.getAttribute('goods_id')) {
v.buy = !(v.buy);

}
})
}

if (e.target.getAttribute('name') === 'del') {
// 点击我不要了按钮,执行的是删除操作
let bool = window.confirm('这么好的产品,您真的不要了吗?');

// 去过点击确定,bool存储true,再执行删除操作
if (bool) {

// 找到goods_id相同的数据,执行删除操作
cartArr.forEach((v, k) => {
if (v.goods_id == e.target.getAttribute('goods_id')) {
  cartArr.splice(k, 1);
}
})
}
}

// 执行 + 操作, 不能超过库存
// 方法1: 可以添加判断,如让数值超过库存数值
// 方法2: 如果数值是库存数值,添加禁用属性

if (e.target.getAttribute('name') === 'jia') {
// 找到goods_id相同的数据,购买数量++ num的数据++
cartArr.forEach((v) => {
if (v.goods_id == e.target.getAttribute('goods_id')) {
v.num++;
// if( v.num > v.goods_number){
//   v.num = v.goods_number;
// }
}
})
}

// 执行 - 操作, 不能小于 1
if (e.target.getAttribute('name') === 'jian') {
// 找到goods_id相同的数据,购买数量++ num的数据++
cartArr.forEach((v) => {
if (v.goods_id == e.target.getAttribute('goods_id')) {
v.num--;
// if( v.num < 1){
//   v.num = 1;
// }
}
})
}

// 根据新的数组,生成页面
setCartList(cartArr, oFootDiv);

// 将新的数组,再赋值给 localStorage cart中
localStorage.setItem('cart', JSON.stringify(cartArr));
})


// 总结:
// 修改步骤:
//    1,根据点击的标签,执行不同的修改操作
//    2,修改的是获取的 localStorage 中 存储 购物车数据 的数组
//    3,根据新的数组,生成 新的页面
//    4,把新的数组,重新写入到 localStorage 购物车中去



function setCartList(array, ele) {
// 在生成页面的时候,根据购物车数据信息,生成对应的钱数


// 判断数组,如果是一个空数组,也就是购物车没有数据了
if (array.length === 0) {
// 购物车是空,生成一个独立的页面
let str = `<li><h1>您的男朋友已经给您清空了购物车,赶紧再去选购吧,顺便记得帮他还信用卡</h1></li>`;
$(ele).html(str);
} else {
// 定义变量存储商品种类,商品个数,商品钱数
// 在循环外,定义变量,存储相应的数据
let type = 0;  // 种类
let n = 0;     // 数量
let pay = 0;   // 金额


// 根据购物车数组的数据,循环遍历,生成页面内容
// 不光是 li ,还有 计算的钱数等信息
let str = '';

// 拼接ul的起始部分
str += '<ul class="cart-list">';

// 通过循环拼接li标签
array.forEach(v => {
// v 中存储的是每个中商品的信息
// 如果商品要支付要购买 也就是 buy存储的是 true
// 就是要计算种类,件数,金额
if(v.buy){
// 种类数值+1
type++;
// 增加当前商品对应的件数
n += v.num;
// 购买金额 累加 单价*件数
pay += v.goods_price * v.num;
}

str += `<li class="cart-item clearF">
        <div class="left">
          <input name="che" goods_id="${v.goods_id}" type="checkbox" ${v.buy ? 'checked' : ''}>
        </div>
        <div class="right">
          <div class="media clearF">
            <div class="media-left">
              <a href="#">
                <img class="media-object" src="${v.goods_small_logo}" alt="...">
              </a>
            </div>
            <div class="media-body">
              <h4 class="media-heading">${v.goods_name}</h4>
              <p>
                <i class="glyphicon glyphicon-yen"></i>
                <span>￥ ${v.goods_price}</span>
              </p>
              <div class="btn-group pull-right" role="group" aria-label="...">
                <button type="button" name="jian" goods_id=${v.goods_id}  class="btn btn-default" ${v.num === 1 ? 'disabled' : ''}>-</button>
                <button type="button" class="btn btn-default" disabled>${v.num}</button>
                <button type="button" name="jia" goods_id=${v.goods_id} class="btn btn-default" ${v.num === v.goods_number ? 'disabled' : ''} >+</button>
              </div>
              <button name="del" goods_id=${v.goods_id} class="del btn btn-danger">我不要了</button>

            </div>
          </div>
        </div>
      </li>`;
})

// 拼接ul的结束部分 以及 下面计算的钱数
str += `
</ul>
<div class="pay">
<h2 class="buyall">您购买了<span> ${type} </span>种商品 一共是 <span> ${n} </span> 件货物</h2>
<h2 class="payall">您一共需要支付: <span> ${pay.toFixed(2)} </span> 元  &nbsp; &nbsp;</h2>
</div>
<div class="paystyle">
    <p> 请选择支付方式 </p>
    <div>
        <span>微信</span>
        <span>支付宝</span>
        <span>银行卡</span>
    </div>
</div>`;


$(ele).html(str);
}
}



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