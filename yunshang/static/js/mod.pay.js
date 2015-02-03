$(function() {
    var $payInput = $('.J_inputmoney input'),
        $paySumm = $('.pay-summ span');
    // $('.pay-type a').on('click', function() {
    //     var $this = $(this);
    //     $(this).siblings().find('em').removeClass('pay-seleted');
    //     $(this).find('em').addClass('pay-seleted');
    //     $(this).parents('form').find('input:hidden[name="pay"]').val($(this).attr('val'));
    // });

    $('.pay-agreement').on('click', function() {
        var $this = $(this);
        if ($this.hasClass('checked')) {
            $this.removeClass('checked');
        } else {
            $this.addClass('checked');
        }
    });
    $('.J_seletmoney a').on('click', function() {
        var $this = $(this),
            value = $this.attr('val');
        $this.siblings('a').removeClass('active');
        $this.addClass('active');
        $payInput.val('');
        $this.parents('form').find('input:hidden[name="money"]').val(value);
        $paySumm.text(value);
    });
    $payInput.on('keyup', function() {
        $('.J_seletmoney a').removeClass('active');
        var $this = $(this),
            val = parseInt($(this).val()),
            $hiddenMoney = $this.parents('form').find('input:hidden[name="money"]');
        if (val <= 0 || isNaN(val)) {
            $(this).val('');
            $hiddenMoney.val(0);
            $paySumm.text(0);
            return;
        }
        $(this).val(val);
        $hiddenMoney.val(val);
        $paySumm.text(val);
    });
    $('.J_paynow').on('click', function() {
        var $this = $(this),
            $form = $this.parents('form'),
            pay = $form.find('input:hidden[name="pay"]').val(),
            money = $form.find('input:hidden[name="money"]').val();
        if (pay != 'alipay' && pay != 'unionpay') {
            dialog({
                content: '支付方式错误！'
            }).showModal();
            return false;
        }
        if (money <= 0) {
            dialog({
                content: '请选择或填写充值金额！'
            }).showModal();
            return false;
        }
        if (money % 1 !== 0) {
            dialog({
                content: '充值金额必须为整数！'
            }).showModal();
            return false;
        }
        if (!$form.find('.pay-agreement').hasClass('checked')) {
            dialog({
                content: '请同意《出右虚拟货币服务协议》！'
            }).showModal();
            return false;
        }
        $form.submit();
    });
});
