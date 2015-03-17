	/*******************************
 * @Copyright:云上教育
 * @Author:渔夫科技-info@yufukeji.com
 *******************************/
$(function(){
	var sliderEl=$('.flexslider');
    sliderEl.flexslider({
        animation: 'slide',
        directionNav:true
    });
//    sliderEl.hover(function(){
//        $('a.flex-prev').stop(true).animate({left:'2%',opacity:1},100);
//        $('a.flex-next').stop(true).animate({right:'2%',opacity:1},100);
//    },function(){
//        $('a.flex-prev').stop(true).animate({left:'-6%',opacity:0},100);
//        $('a.flex-next').stop(true).animate({right:'-6%',opacity:0},100);
//    });
    //选项卡鼠标划过
    var hbsTabs=$('#M .hbs-tab');
    hbsTabs.each(function(k,val){
    	var self=this;
    	$(self).find('li').on('mouseover',function(){
    		var block=$(self).parents('.hb-section').find('.hbs-block');
    		var index=$(self).find('li').index(this);
    		$(this).addClass('active').siblings().removeClass('active');
    		block.eq(index).show().siblings('.hbs-block').hide();
    	});
    });
    
    $('#J_sign').on('click', function() {
        var $dom = $(this);
        if ($dom.hasClass('disabled')) {
            return;
        }
        window.YS.ajax($('#sign_url').val(),{},'POST').then(function(data) {
        	notify.warn(data.error_msg);
        	if (data.error_code == 0) {
        		$('span', $dom).html(' 已签到');
                $dom.addClass('disabled');
        	}  
        });
    });

});

