	/*******************************
 * @Copyright:云上教育
 * @Author:渔夫科技-info@yufukeji.com
 *******************************/
$(function(){
	//问题富文本
    var mqa_type=$('#mqa_type');
	var mqa_point=$('#mqa_point');
	var mqa_title=$('#mqa_title');
	var mqa_content=$('#mqa_content');
	var mqaf_submit=$('#mqaf_submit');
	//分类选择
	var mqafTypeItem=$('.mqaf-type>li');
	mqafTypeItem.on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		mqa_type.val($(this).attr('data-type'));
	});
    var xuanshang=$('#J_xuanshang');
    var mqafTxt=$('.mqaf-txt');
    var mqafXs=$('.mqaf-xs');
    //积分悬赏
    xuanshang.on('click',function(){
        $.post(getScoreUrl,{},function(data){
            /*
            data.point 返回实时可用积分
            */
            if(data.status==200){
                dialog({
                    title:'悬赏积分',
                    content:'<p>您当前可用积分：<span class="color-red">'+data.point+'分</span></p><input data-max="'+data.point+'" type="text" style="width:228px;margin-top:6px;" placeholder="请输入悬赏积分值" id="xuanshang_point" class="base-input" />',
                    ok: function () {
                        var n=~~$('#xuanshang_point').val();
                        mqa_point.val(n);
                        mqafTxt.html('<i class="iconfont">&#xe609;</i> 已悬赏'+n+'积分！').show();
                        mqafXs.html('<i class="iconfont">&#xe609;</i> 重新悬赏');

                    },
                    cancelValue: '取消',
                    cancel: function () {}
                }).showModal();
            }else{
                dialog({content:'网络错误，请重试！'}).showModal();
            }
        },'json');
        setTimeout(function(){
            $('#xuanshang_point').on('keyup blur',function(){
                var val=~~$(this).val();
                var max=$(this).attr('data-max');
                if(val>max){val=max};
                $(this).val(val);
            });
        },100);
    });
	//提交验证
    mqaf_submit.on('click',function(){
    	var self=this;
        var type=mqa_type.val();
    	var point=mqa_point.val();
    	var content=$.trim(mqa_content.val());
    	var title=$.trim(mqa_title.val());

    	if(title.length<2 || title.length>60){
    		dialog({content:'请输入问题标题，2~60字符内！'}).showModal();
    		return false;
    	}
    	if(content.length<1){
    		dialog({content:'请输入请对问题的描述！'}).showModal();
    		return false;
    	}
        $(self).prop('disabled',true).addClass('btn-disabled').html('努力发布中...');
        var DATA={
        	qtid:type,
        	score:point,
        	title:title,
        	content:content
        }
        $.ajax({
            url:addUrl,
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
                $(this).prop('disabled',false).removeClass('btn-disabled').html('<i class="iconfont">&#xe612;</i> 立即发布');
            }
        });
    });
    //采纳问题
    var mdcItemCN=$('.mdc-item .J_caina');
    mdcItemCN.on('click',function(){
        var self=this;
        var id=$(this).parents('li').attr('data-id');
        dialog({
            content:'确定要采纳此回答吗？若有悬赏积分采纳后积分转充值给被采纳者！',
            ok: function () {
                $.post(adoptUrl,{id:id},function(data){
                    if(data.status==200){
                        dialog({content:'恭喜您，已采纳成功！'}).showModal();
                        $(self).replaceWith('<span class="done">已采纳！</span>');
                    }else{
                        dialog({content:'网络错误，请重试！'}).showModal();
                    }
                },'json');

            },
            cancelValue: '取消',
            cancel: function () {}
        }).showModal();
    });
    //删除自己的问题
    var mdcItemDEL=$('.mdc-item .J_del');
    mdcItemDEL.on('click',function(){
        var self=this;
        var par=$(this).parents('li');
        var id=par.attr('data-id');
        dialog({
            content:'确定要删除此问题吗？操作不可恢复！',
            ok: function () {
                $.post(delAnswerUrl,{id:id},function(data){
                    if(data.status==200){
                        par.slideUp(120).remove();
                    }else{
                        dialog({content:'网络错误，请重试！'}).showModal();
                    }
                },'json');
            },
            cancelValue: '取消',
            cancel: function () {}
        }).showModal();
    });
    //回答问题
    var mdcf_field=$('#mdcf_field');
    var mdcItem=$('.mdc-item');
    var submitMDCF=$('#J_submitMDCF');
    submitMDCF.on('click',function(){
        var self=this;
        var content=$.trim(mdcf_field.val());

        if(content.length<1){
            dialog({content:'回答内容不能为空！'}).showModal();
            return false;
        }
        $(self).prop('disabled',true).addClass('btn-disabled').html('努力提交中...');
        var DATA={
            content:content
        }
        $.ajax({
            url:addAnswerUrl,
            type:'POST',
            dataType:'json',
            data:DATA,
            success:function(data){
                /*
                status:200
                html:返回回答的li html
                */
                if(data.status==200){
                    mdcItem.append(data.html);
                }else{
                    dialog({content:'网络错误，请重试！'}).showModal();
                }
            },
            complete:function(data){
                $(self).prop('disabled',false).removeClass('btn-disabled').html('<i class="iconfont">&#xe612;</i> 立即回答');
            }
        });
    });

});

