
      
        // 点击登录按钮
        const oSubmit = document.querySelector('.hwid-submit');
        oSubmit.addEventListener('click',()=>{

            //先验证提交信息 是否符合格式
            //  获取页面元素
            const oIptName = document.querySelector('.hwid')
            const oIptPwd  = document.querySelector('.hwpwd')
            const nameErrSpan = document.querySelectorAll('.errorDiv>span')[0];
            const pwdErrSpan = document.querySelectorAll('.errorDiv>span')[1];

            // console.log(pwdErrSpan)

           
            let oIptNameVal  = oIptName.value;
            let oIptPwdVal   = oIptPwd.value;

            // console.log(oIptPwdVal)
            //验证帐号
            if(oIptNameVal ===""){
                nameErrSpan.innerHTML = '<b style="color:red"> &nbsp;&nbsp;&nbsp;&nbsp; 帐号不能为空</b>';
                // return;
            }else{
                nameErrSpan.innerHTML = "";
            }

            //验证密码
            if(oIptPwdVal ===""){
                
                pwdErrSpan.innerHTML = '<b style="color:red"> &nbsp;&nbsp;&nbsp;&nbsp; 密码不能为空</b>';
                return;
            }else{
                pwdErrSpan.innerHTML = "";
            }

            // 发送数据请求 数据交互
            $.ajax({
                url: '../server/goods_login.php',
                type: 'post',
                data: { userName: oIptNameVal, userPwd: oIptPwdVal },
                dataType: 'json',
                success: result => {
                    if (result.res === 1) {

                        // 登录成功,设定登录的cookie信息,并且跳转首页面
                        // 设定cookie也有同源问题
                        // 默认设定的cookie只有同一个文件夹中的文件都可以使用
                        // 当前文件夹外的文件,默认是不能使用cookie
                        // 给 cookie 添加新的属性 path=/ 
                        // 让所有www中的文件都可以访问这个cookie
                        mySetCookie('login', 1, 7 * 24 * 60 * 60);
                        window.alert('登录成功,点击确定,哪儿来的回哪儿去');
                        // 获取地址栏中的参数信息,因为来的地址,有可能也有参数,不能使用函数获取了
                        // decodeURI() 获取 window.location.search 转化为正常的中文显示
                        // 找第一个 = 等号 之后, 是 要跳转的地址
                        // 也就是从第一个 =等号之后,下一个索引下标开始截取
                        console.log(window.location.search)
                        let url = decodeURI( window.location.search ).substr( decodeURI( window.location.search ).indexOf('=')+1 );
                        console.log(url)
                        window.location.href =url;
                        // window.location.href = "../index.html";

                        // 5秒后跳转首页面 
                        // let int = 5;
                        // setInterval(()=>{
                        //     pwdErrSpan.innerHTML = `您登录成功,${int}秒之后,跳转首页面`;
                        //     int--;
                        //     if(int === 0){
                        //         window.location.href = './index.html';
                        //     }
                        // } , 1000 )

                        
                    }else{
                        window.alert('登录失败,请您检查账号密码,继续玩命登录');
                    }
                }
            })


            // 交互成功后，跳转到首页面

            // window.location.href = "../index.html";
            }
        )
        
        // 点击注册按钮进入注册界面

        const oRegBtn = document.querySelector('.hwid-link');
        
        oRegBtn.addEventListener('click',()=>{
            window.location.href="./register.html";
        })
