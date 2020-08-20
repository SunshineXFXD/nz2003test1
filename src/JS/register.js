 // 选国家的的时候文本框出现
 const oRight = document.querySelector('.input-right');
        
 const oText = document.querySelector('.hwid-text');
 oRight.addEventListener('click',()=>{
     oText.style.display = 'block';
     oText.addEventListener('mouseleave',()=>{
     oText.style.display = 'none';
 })
 })
 oText.addEventListener('mouseenter',()=>{
     oText.style.display = 'block';
 })

 //    点击输入框的时候 整个框改变颜色 包含外面父级的边框
const oPhone = document.querySelector('.phone');
const oHwid_inputs = document.querySelectorAll('.hwid-input-container');

 oPhone.addEventListener('focus',()=>{
     oHwid_inputs[1].style.border="1px solid #007dff";
 })
 oPhone.addEventListener('blur',()=>{
     oHwid_inputs[1].style.border="";
 })
 const oPhone_code =document.querySelector('.phone-code');
 oPhone_code.addEventListener('focus',()=>{
     oHwid_inputs[2].style.border="1px solid #007dff";
 })
 oPhone_code.addEventListener('blur',()=>{
     oHwid_inputs[2].style.border="";
 })
 const oPwd =document.querySelector('.password');
 const oRePwd =document.querySelector('.repassword');
 

 oPwd.addEventListener('focus',()=>{
     oHwid_inputs[3].style.border="1px solid #007dff";
 })
 oPwd.addEventListener('blur',()=>{
     oHwid_inputs[3].style.border="";
 })

 oRePwd.addEventListener('focus',()=>{
     oHwid_inputs[4].style.border="1px solid #007dff";
 })
 oRePwd.addEventListener('blur',()=>{
     oHwid_inputs[4].style.border="";
 })


 // 
 // 点击获取验证码 出现随机验证码

 const getVc = document.querySelector('[name="getVc"]');
 const vcSpan = document.querySelector('[name="vcSpan"]');
 // 帐号错误的提示信息
 const phoneSpanError = document.querySelector('.phoneSpanError');

 // console.log(getVc);
 // console.log(phoneSpanError );

 getVc.addEventListener('click',()=>{
     vcSpan.innerHTML = mySetVc();
 })

 // 验证帐号是否已经存在
 

 let bool;

 //  本来这里是先验证帐号是否存在的，但是发送请求后，会出错，后端的代码不对

 oPhone.addEventListener('change',()=>{
     let name = oPhone.value;
     
     // console.log(name);
     // 发送Ajax请求 向后台查询
     $.ajax({
         url:'../server/goods_select.php',
         type:'post',
         data:{userName:name},
         dataType:'json',
         success:result=>{
             // 根据执行结果,写入提示信息
             if(result.res === 1){
             // 正好可以使用
             phoneSpanError.innerHTML = '账号可以使用';
             bool = true;
             }else{
                 phoneSpanError.innerHTML = '账号不能使用';
             bool = false;
             }
         }
     })
 })
 
 

 // 点击注册按钮的事件
 const oRegBtn = document.querySelector('.register-btn');
 // console.log(oRegBtn);
 const oIptPwd1 = document.querySelector('[name="pwd1"]');
 const oIptPwd2 = document.querySelector('[name="pwd2"]');
 const oIptVc = document.querySelector('[name="vc"]');
 // const phoneSpanError =document.querySelector('.phoneSpanError');
 const pwd1error = document.querySelector('.pwd1error');
 const pwd2error = document.querySelector('.pwd2error');
 const vcerror   = document.querySelector('.vcerror');



 oRegBtn.addEventListener('click',()=>{

     if(bool === false){
         return;
     }

     // 获取输入的数据
     let nameVal = oPhone.value;
     let pwd1Val = oIptPwd1.value;
     let pwd2Val = oIptPwd2.value;
     let vcVal   = oIptVc.value;
     //验证数据是否符合

     // console.log(nameVal);
     //验证帐号是否为空
     if(nameVal === ""){
         phoneSpanError.innerHTML = '<b style="color:red">帐号不能为空</b>';
         return;
     }else{
         phoneSpanError.innerHTML = "";
     }
      // 验证码不能为空
     if(vcVal===""){
         vcerror.innerHTML = '<b style="color:red">验证码不能为空</b>';
         return;
     }else{
         vcerror.innerHTML = '';
     }
      // 验证码不区分大小写 验证码相等
     if(vcVal.toUpperCase() !== vcSpan.innerHTML.toUpperCase()){
         vcerror.innerHTML = '验证码错误';
         return;
     }else{
         vcerror.innerHTML="";
     }


     // 验证 密码是否为空
     if(pwd1Val=== ""){
         pwd1error.innerHTML='<b style="color:red">密码不能为空</b>';
         return;
     }else{
         pwd1error.innerHTML ="";
     }

     // 验证确认密码 是否为空
     if(pwd2Val ===""){
         pwd2error.innerHTML = '<b style="color:red">确认密码不能为空</b>';
         return;
     }else{
         pwd2error.innerHTML = '';
     }

    
     
     // 密码 喝 确认密码必须相等
     if(pwd1Val !== pwd2Val){
         pwd2error.innerHTML = '<b style="color:red">密码和确认密码不一致</b>';
         return;
     }else{
         pwd2error.innerHTML = '';
     }

    
     // 以上的格式都正确
     // 向后台发送Ajax 请求
     // 发送请求
     // console.log(nameVal);
     // console.log(pwd1Val);

     $.ajax({
         url:'../server/goods_res.php',
         type:'post',
         data:{userName:nameVal,userPwd:pwd1Val},
         dataType:'json',
         success:(result)=>{
             console.log(result);
             // 注册成功返回首页面 登录
             // 注册失败 继续注册
             if(result.res === 1){
                 window.alert('注册成功，点击确定，跳转至登录页面');
                 window.location.href="./login.html";
             }else{
                 window.alert('注册失败，用户名重复')
             }
                 }
     })


     // 数据交互完成且正确 跳转到登录页面
     // window.location.href="./login.html"
 })

