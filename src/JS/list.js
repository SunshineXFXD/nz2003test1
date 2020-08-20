
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



















// 1 获取地址栏的数据信息
// console.log(decodeURI(window.location.search))
var valObj = getUrlVal();
console.log(valObj);
// 2.根据获取的参数，向数据库发起请求
getAjaxVal( valObj , 1 , 8 );
function getAjaxVal(object , page , line ){
  $.ajax({
    url:'../server/goods_list.php',
    data: { cat_one_id: object.cat_one_id, page: page, line: line },
    type:'get',
    dataType: 'json',
    success: function (result) {
      console.log(result);

      // 根据查询结果的数组,生成页面内容
      // 生成的li,写入到ul中

      // 根据查询结果的数组,渲染生成对应的html页面内容
      // 点击 查看商品详情 按钮, 跳转至 详情页 detail.html
      // 并且要传参 goods_id 索引数据
  
      let str = "";

      result.forEach((v) => {
        str += `
        <li class="col-md-6 list-item">
            <div class="products-column  panel panel-primary">
                <div class="panel-body">
                    <ol class="breadcrumb">
                    <li><a href="#">${v.cat_one_id} /</a></li>
                    <li><a href="#">${v.cat_two_id} /</a></li>
                    <li class="active">${v.cat_three_id}</li>
                    </ol>
                </div>
                <div class="products-content">
                    <h4 class="products-title">${v.goods_name}</h4>
                    
                    <a href="JavaScript:;">
                         <img src="${v.goods_big_logo}" alt="..." style="width: 230px ;">
                    </a>
                </div>
                <p class="pricetxt">
                  <i class="glyphicon glyphicon-yen"></i>
                  <span>￥${v.goods_price}</span>
                </p>
                <p class="btntxt"><a href="javascript:;" class="btn btn-primary" role="button" style="font-size:20px" >查找相似商品</a> 
                  <a href="./detail.html?goods_id=${v.goods_id}" class="btn btn-danger" role="button" style="font-size:20px">查看商品详情</a>
                </p>
            </div>                      
        </li>
      
      `;

      })

      // 循环结束,将str写入到ul中
      $('.container > ul').html(str);
    
    
      // 请求成功,根据请求结果,生成分页显示内容
      $('.M-box').pagination({
        mode: 'fixed',                   // 固定分页按钮的数量
        pageCount : result[0].sumPage,   // 查询结果中的总页数
        totalData : result[0].row,       // 查询结果中的数据中数据
        current : result[0].page,        // 当前页数
        showData : line,                 // 每页的数据数量
        count : 5 ,                      // 设定总显示的页数
        coping : true,                   // 显示首页末页
        isHide : true,                   // 总页数为0或者1时,隐藏控件
        keepShowPN : true,               // 显示上一页下一页
        homePage : '首页',               // 首页的文本内容
        endPage : '末页',                // 首页的文本内容
        prevContent : '上一页',          
        nextContent : '下一页',
        callback: function(res){
      //     // 在插件定义的回调函数中,形参里存储数据信息

      //     // 获取点击分页显示按钮,要显示的页数信息
      //     // 插件定义好的,直接使用就可以了
          let p = res.getCurrent(); 

      //     // 可以根据新的页数,发起新的请求,渲染生成新的页面内容

          getAjaxVal(valObj , p , 8);
        }
      });
    }        
  })

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
