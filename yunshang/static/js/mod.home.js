	/*******************************
 * @Copyright:云上教育
 * @Author:渔夫科技-info@yufukeji.com
 *******************************/
$(function(){
	var sliderEl=$('.flexslider');
    sliderEl.flexslider({
        animation: 'slide',
        directionNav:false
    });
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
});

