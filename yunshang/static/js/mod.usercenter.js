$(function() {
    window.UC = window.UC || {};
    var URLS = {
            FOOTPRINTURL: '' //签到
        },
        _ajax = function(url, data, type, contentType) {
            var ops = {
                url: url,
                type: type || "GET",
                data: data || {}
            };
            contentType && (ops.contentType = contentType);
            var xhr = $.ajax(ops);
            return xhr;
        };
    /*****************用户中心*****************/
    (function() {
        var $footprint = $('.J_footprint');
        $footprint.on('click', function() {
            var $dom = $(this);
            if ($dom.hasClass('disabled')) {
                return;
            }
            _ajax(URLS.FOOTPRINTURL).then(function() {
                $('span', $dom).html(' 已签到');
                $dom.addClass('disabled');
            });
        });
    })();
    /***************发私信***********************/
    (function() {
        var dialogHtml = [];
        dialogHtml.push('<div class="inbox-dialog">');
        dialogHtml.push('<ul>');
        dialogHtml.push('<li>');
        dialogHtml.push('<label>收件人：</label>');
        dialogHtml.push('<input type="text"/>');
        dialogHtml.push('</li>');
        dialogHtml.push('<li>');
        dialogHtml.push('<label class="t">内容：</label>');
        dialogHtml.push('<textarea></textarea>');
        dialogHtml.push('</li>');
        dialogHtml.push('<li class="last">');
        dialogHtml.push('<a href="javascript:void(0)" class="btn btn-lg btn-primary"><i class="iconfont">&#xe605;</i> 发送</a>');
        dialogHtml.push('</li>');
        dialogHtml.push('</ul>');
        dialogHtml.push('</div>');
        window.UC.sendMailDialog = function(currentReceiver) {
            var $dialogContent = $(dialogHtml.join('')),
                $receiver = $('input', $dialogContent).val(currentReceiver || ''),
                $content = $('textarea', $dialogContent).val(''),
                $send = $('a', $dialogContent),
                currentDialog = dialog({
                    title: '发私信',
                    width: 350,
                    height: 190,
                    content: $dialogContent,
                    innerHTML: '<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><button i="close" class="ui-dialog-close">&#215;</button><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr></table></div>'
                }).showModal();
            $send.off('click').on('click', function() {
                var receiver = $receiver.val(),
                    content = $content.val();
                if (!receiver) {
                    $receiver.focus();
                    return;
                }
                if (!content) {
                    $content.focus();
                    return;
                }
                _ajax(URLS.SENDMAIL, {
                    receiver: receiver,
                    content: content
                }, 'POST').then(function() {
                    //用户不存在
                    //发送成功
                    currentDialog.close();
                });
                //临时测试
                currentDialog.close();
            });
        };
    })();
});
