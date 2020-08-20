
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
                        // 这个是延时器
                        var tabtime= window.setTimeout(function(){
                            $('.subnav-ul').css({display:'none'});
                        },800)
                        // clearTimeout(tabtime)
                     })
            })
           
        })

       

        //  轮播图
        const oBanner = document.querySelector('.banner');
        const ban = new setOpacity(oBanner);
        ban.init();


        // 内容

        // 点击登录
        const oLogin = document.querySelector('[name="login"]');
        oLogin.addEventListener('click',()=>{
            window.location.href = `./pages/login.html?url=${window.location.href}`
        })

        // 推出登录
        const oBack = document.querySelector('[name="back"]');
        // console.log(oBack);
        oBack.addEventListener('click',()=>{
            mySetCookie('login',1,-1);
            window.alert('退出登录成功');
        })

        // 购物车
        const oBuyCar = document.querySelector('[name="buyCar"]');
        oBuyCar.addEventListener('click',()=>{
            // 获取cookie对象
            var cookieObj = myGetCookie();

            // 如果没有login,调用结果是undefined
            if( cookieObj.login === undefined){
                let bool = window.confirm('您还没有登录,点击确认,跳转登录页面,点击取消,没有跳转');
                
            if(bool === true){
                // 如果没有cookie信息就跳转到登录页面
                window.location.href = `./pages/login.html?url=${window.location.href}`;
            }

            }else{
                //反之跳转到购物车
                window.location.href = './pages/cart.html';
            }
        })

        // 点击跳转详情列表
        const oMorepro = document.querySelector('.moreproducts');
        const oDuibi = document.querySelector('.duibi');
       
    //    console.log(oMorepro);
    //    console.log(oDuibi)
        oMorepro.addEventListener('click',()=>{
            window.location.href = "./pages/list.html?cat_one_id=手机相机";
        })
        oDuibi.addEventListener('click',()=>{
            window.location.href = "./pages/list.html?cat_one_id=手机相机";
        })


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