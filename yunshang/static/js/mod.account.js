	/*******************************
 * @Copyright:云上教育
 * @Author:渔夫科技-info@yufukeji.com
 *******************************/
$(function(){
    var r_mail=$('#r_mail');
    var r_passwd=$('#r_passwd');
    var r_passwd_r=$('#r_passwd_r');
    var r_nicename=$('#r_nicename');
    var r_code=$('#r_code');
    var regSubmit=$('#J_regSubmit');
    var r_rule=$('#r_rule');
    //登录邮箱
	r_mail.on('blur',function(){
        var str=$.trim($(this).val());
        var tips=$(this).nextAll('.validtips');
        tips.removeClass('tips-success tips-error').text('');
        if(!isMail(str)){
            tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 邮箱格式不正确！');
            return false;
        }else{
            var type = 'email';
            //验证邮箱是否存在
            $.post(validateUrl,{email:str,type:type},function(data){
                if(data.status==200){
                    tips.addClass('tips-success').html('<i class="iconfont">&#xe612;</i> 邮箱可注册！');
                }else if(data.status==300) {
                    tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 邮箱不能为空！');
                }else if(data.status==400) {
                    tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 邮箱已注册！');
                }else{
                    tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 网络错误，请重试！');
                }
            },'json');
        }
    });
    //密码
    r_passwd.on('blur',function(){
        var str=$(this).val();
        var tips=$(this).nextAll('.validtips');
        tips.removeClass('tips-success tips-error').text('');
        if(!isPsw(str)){
            tips.removeClass('tips-success').addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 密码格式不正确！');
            return false;
        }else{
            tips.removeClass('tips-error tips-success').html('');
            tips.addClass('tips-success');
        }
    });
    //重复密码
    r_passwd_r.on('blur',function(){
        var str=$(this).val();
        var tips=$(this).nextAll('.validtips');
        tips.removeClass('tips-success tips-error').text('');
        if(str!=r_passwd.val()){
            tips.removeClass('tips-success').addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 两次密码输入不一致');
            return false;
        }else{
            tips.removeClass('tips-error tips-success').html('');
            tips.addClass('tips-success');
        }
    });
    //昵称
	r_nicename.on('blur',function(){
        var str=$.trim($(this).val());
        var tips=$(this).nextAll('.validtips');
        tips.removeClass('tips-success tips-error').text('');
        if(!isRealName(str)){
            tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 昵称格式不正确！');
            return false;
        }else{
            var type = 'nickname';
            //验证邮箱是否存在
            $.post(validateUrl,{nickname:str,type:type},function(data){
                if(data.status==200){
                    tips.addClass('tips-success').html('<i class="iconfont">&#xe612;</i> 昵称可用！');
                }else if(data.status==300) {
                    tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 昵称不能为空！');
                }else if(data.status==400) {
                    tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 昵称已存在！');
                }else{
                    tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 网络错误，请重试！');
                }
            },'json');
        }
    });
    //验证码
	r_code.on('blur',function(){
        var str=$.trim($(this).val());
        var tips=$(this).nextAll('.validtips');
        tips.removeClass('tips-success tips-error').text('');
        if(str.length!=4){
            tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 验证码格式不正确！');
            return false;
        }else{
        	var type = 'verify';
            //验证验证码
            $.post(validateUrl,{verify:str,type:type},function(data){
                if(data.status==200){
                    tips.addClass('tips-success').html('');
                }else if(data.status==500) {
                    tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 验证码不正确！');
                }else{
                    tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 网络错误，请重试！');
                }
            },'json');
            //tips.removeClass('tips-error tips-success').html('');
            //tips.addClass('tips-success');
        }
    });

    //提交验证
    regSubmit.on('click',function(){
    	var self=this;
        var tips=$('.wlf-row .validtips');
        var tipstxt=['<i class="iconfont">&#xe614;</i> 请输入邮箱！','<i class="iconfont">&#xe614;</i> 请输入密码！','<i class="iconfont">&#xe614;</i> 请再次输入密码！','<i class="iconfont">&#xe614;</i> 请输入昵称！','<i class="iconfont">&#xe614;</i> 请输入验证码！'];
        tips.each(function(k){
            if(!($(this).hasClass('tips-success')) || $(this).hasClass('tips-error')){
                $(this).addClass('tips-error').html(tipstxt[k]);
            }
        });
        //延迟500ms
        setTimeout(function(){
            var error=tips.filter('.tips-error');
            //提交注册
            if(error.length==0){
            	if(!r_rule.prop('checked')){
	            	dialog({content:'请同意网站服务条款！'}).showModal();
	            	return false;
	            }
            	var DATA={};
                DATA.email=$.trim(r_mail.val());
                DATA.password=r_passwd.val();
                DATA.nickname=$.trim(r_nicename.val());
                DATA.code=r_code.val();

                $(self).prop('disabled',true).addClass('btn-disabled').val('努力注册中...');
                $.ajax({
                    url:registerUrl,
                    type:'POST',
                    dataType:'json',
                    data:DATA,
                    success:function(data){
                        /*
                        status:200
                        url:注册成功后跳转的页面
                        */
                        if(data.status==200){
                            window.location.href=data.url;
                        }else{
                            dialog({content:'网络错误，请重试！'}).showModal();
                        }
                    },
                    complete:function(){
                        $(this).prop('disabled',false).removeClass('btn-disabled').val('注册');
                    }
                });
            }
        },500);
    });

    //登录
    var l_usermail=$('#l_usermail');
    var l_passwd=$('#l_passwd');
    var J_loginForm=$('#J_loginForm');
    var l_autologin=$('#l_autologin');
    //登录邮箱
	l_usermail.on('blur',function(){
        var str=$.trim($(this).val());
        var tips=$(this).nextAll('.validtips');
        tips.removeClass('tips-success tips-error').text('');
        if(!isMail(str)){
            tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 邮箱格式不正确！');
            return false;
        }else{
        	tips.removeClass('tips-error tips-success');
            tips.addClass('tips-success').html('');
        }
    });
    //密码
    l_passwd.on('blur',function(){
        var str=$(this).val();
        var tips=$(this).nextAll('.validtips');
        tips.removeClass('tips-success tips-error').text('');
        if(!isPsw(str)){
            tips.removeClass('tips-success').addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 密码格式不正确！');
            return false;
        }else{
            tips.removeClass('tips-error tips-success').html('');
            tips.addClass('tips-success').html('');
        }
    });
    J_loginForm.on('click',function(){
    	var self=this;
        var tips=$('.wlf-row .validtips');
        var tipstxt=['<i class="iconfont">&#xe614;</i> 请输入邮箱','<i class="iconfont">&#xe614;</i> 请输入密码'];
        tips.each(function(k){
            if(!($(this).hasClass('tips-success')) || $(this).hasClass('tips-error')){
                $(this).addClass('tips-error').html(tipstxt[k]);
            }
        });
        l_usermail.trigger('blur');
        l_passwd.trigger('blur');
        //延迟500ms
        setTimeout(function(){
            var error=tips.filter('.tips-error');
            if(error.length>0){
            	return false;
    		}
            //提交注册
            if(error.length==0){
            	var DATA={};
                DATA.email=$.trim(l_usermail.val());
                DATA.password=l_passwd.val();
                DATA.autologin=(l_autologin.prop('checked') == true)?1:0;
                $(self).prop('disabled',true).addClass('btn-disabled').val('努力登录中...');
                $.ajax({
                    url:loginUrl,
                    type:'POST',
                    dataType:'json',
                    data:DATA,
                    success:function(data){
                        /*
                        status:200
                        url:注册成功后跳转的页面
                        */
                        if(data.status==200){
                            window.location.href=data.url;
                        }else{
                            notify.warn(data.message);
                            $(self).removeAttr('disabled').removeClass('btn-disabled').val('立即登录');
                        }
                    },
                    complete:function(){
                        $(this).prop('disabled',false).removeClass('btn-disabled').val('注册');
                    }
                });
            }
        },500);
    });

    //找回密码
    var f_mail=$('#f_mail');
    var f_code=$('#f_code');
    var J_forgetForm=$('#J_forgetForm');
    //登录邮箱
	f_mail.on('blur',function(){
        var str=$.trim($(this).val());
        var tips=$(this).nextAll('.validtips');
        tips.removeClass('tips-success tips-error').text('');
        if(!isMail(str)){
            tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 邮箱格式不正确！');
            return false;
        }else{
            var type = 'email';
            //验证邮箱是否存在
            $.post(validateUrl,{email:str,type:type},function(data){
                if(data.status==400){
                    tips.addClass('tips-success').html('<i class="iconfont">&#xe612;</i> 邮箱正确！');
                }else if(data.status==300) {
                    tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 邮箱不能为空！');
                }else if(data.status==200) {
                    tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 邮箱不存在！');
                }else{
                    tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 网络错误，请重试！');
                }
            },'json');
        }
    });
    //验证码
	f_code.on('blur',function(){
        var str=$.trim($(this).val());
        var tips=$(this).nextAll('.validtips');
        tips.removeClass('tips-success tips-error').text('');
        if(str.length!=4){
            tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 验证码格式不正确！');
            return false;
        }else{
        	var type = 'verify';
            //验证验证码
            $.post(validateUrl,{verify:str,type:type},function(data){
                if(data.status==200){
                    tips.addClass('tips-success').html('');
                }else if(data.status==500) {
                    tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 验证码不正确！');
                }else{
                    tips.addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 网络错误，请重试！');
                }
            },'json');
        }
    });
    J_forgetForm.on('submit',function(){
    	var self=this;
        var tips=$('.wlf-row .validtips');
        var tipstxt=['<i class="iconfont">&#xe614;</i> 请输入注册时填写的邮箱','<i class="iconfont">&#xe614;</i> 请输入验证码'];
        tips.each(function(k){
            if(!($(this).hasClass('tips-success')) || $(this).hasClass('tips-error')){
                $(this).addClass('tips-error').html(tipstxt[k]);
            }
        });
    	var error=tips.filter('.tips-error');
        if(error.length>0){
        	return false;
		}
    });
    //重置密码
    var reset_passwd=$('#reset_passwd');
    var reset_passwd_r=$('#reset_passwd_r');
    var J_resetForm=$('#J_resetForm');
    //密码
    reset_passwd.on('blur',function(){
        var str=$(this).val();
        var tips=$(this).nextAll('.validtips');
        tips.removeClass('tips-success tips-error').text('');
        if(!isPsw(str)){
            tips.removeClass('tips-success').addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 密码格式不正确！');
            return false;
        }else{
            tips.removeClass('tips-error tips-success').html('');
            tips.addClass('tips-success');
        }
    });
    //重复密码
    reset_passwd_r.on('blur',function(){
        var str=$(this).val();
        var tips=$(this).nextAll('.validtips');
        tips.removeClass('tips-success tips-error').text('');
        if(str!=reset_passwd.val()){
            tips.removeClass('tips-success').addClass('tips-error').html('<i class="iconfont">&#xe614;</i> 两次密码输入不一致');
            return false;
        }else{
            tips.removeClass('tips-error tips-success').html('');
            tips.addClass('tips-success');
        }
    });
    J_resetForm.on('submit',function(){
    	var self=this;
        var tips=$('.wlf-row .validtips');
        var tipstxt=['<i class="iconfont">&#xe614;</i> 请输入新密码！',''];
        tips.each(function(k){
            if(!($(this).hasClass('tips-success')) || $(this).hasClass('tips-error')){
                $(this).addClass('tips-error').html(tipstxt[k]);
            }
        });
    	var error=tips.filter('.tips-error');
        if(error.length>0){
        	return false;
		}
    });




    //重发找回邮件
    var sendCode=$('#J_reMail');
    var autoTimer; //timer变量，控制时间
	var intervalTime = 15; //间隔函数，1秒执行
	var curInterval;//当前剩余秒数
	function sendMessage() {
        curInterval = intervalTime;
        //下发邮件
        $.post(resetSendUrl,{},function(data){
        	if(data.status!=200){
        		dialog({content:'邮件发送失败，请重试！'}).showModal();
        	}
        },'json');
        
        //设置button效果，开始计时
        sendCode.prop('disabled',true).addClass('btn-disabled');
        sendCode.val(curInterval + ' 秒后可重新发送');
        _log(curInterval)
        autoTimer = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
    }
    //timer处理函数
	function SetRemainTime() {
        if (curInterval == 0) {                
            window.clearInterval(autoTimer);//停止计时器
            sendCode.prop('disabled',false).removeClass('btn-disabled');
            sendCode.val('点击这里重新发送');
        }else {
            curInterval--;
            sendCode.prop('disabled',true).addClass('btn-disabled');
            sendCode.val(curInterval + ' 秒后可重新发送');
        }
    }
    sendCode.on('click',function(){
    	sendMessage();
    });
    
    var verifyimg = $(".verifyimg").attr("src");
    $("#J_changeCode").click(function(){
        if( verifyimg.indexOf('?')>0){
            $(".verifyimg").attr("src", verifyimg+'&random='+Math.random());
        }else{
            $(".verifyimg").attr("src", verifyimg.replace(/\?.*$/,'')+'?'+Math.random());
        }
    });

});

