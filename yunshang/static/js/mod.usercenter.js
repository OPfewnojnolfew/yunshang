$(function() {
    window.UC = window.UC || {};
    var URLS = {
            FOOTPRINTURL: $('#sign_url').val() //签到
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
            window.YS.ajax($('#sign_url').val(), {}, 'POST').then(function(data) {
                notify.warn(data.error_msg);
                if (data.error_code == 0) {
                    $('span', $dom).html(' 已签到');
                    $dom.addClass('disabled');
                }
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
        dialogHtml.push('<input type="text" placeholder="请输入@进行用户选择"/>');
        dialogHtml.push('</li>');
        dialogHtml.push('<li>');
        dialogHtml.push('<label class="t">内容：</label>');
        dialogHtml.push('<textarea></textarea> ');
        dialogHtml.push('</li>');
        dialogHtml.push('<li class="last">');
        dialogHtml.push('<a href="javascript:void(0)" class="btn btn-lg btn-primary"><i class="iconfont">&#xe605;</i> 发送</a>');
        dialogHtml.push('</li>');
        dialogHtml.push('</ul>');
        dialogHtml.push('</div>');
        window.UC.sendMailDialog = function(currentReceiver, receiverId) {
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
            currentReceiver && $receiver.attr('readonly', 'readonly');
            $receiver.atwho({
                at: "@",
                data: $('#user_list_url').val(),
                displayTpl: '<li data-id="${id}">${name}</li>',
                insertTpl: "${name}",
                callbacks: {
                    beforeInsert: function(value, li) {
                        value = value ? value : '';
                        $receiver.val('');
                        receiverId = li.attr('data-id');
                        return value;
                    }
                }
            });
            $receiver.atwho('isSelecting');
            $receiver.focus();
            $send.off('click').on('click', function() {
                var receiver = $receiver.val(),
                    content = $content.val();
                if (!receiverId || !receiver) {
                    notify.warn('请选择收件人');
                    $receiver.focus();
                    return;
                }
                if (!content) {
                    notify.warn('请输入私信内容');
                    $content.focus();
                    return;
                } 
                _ajax($('#send_msg_url').val(), {
                    receiver: receiverId,
                    content: content
                }, 'POST').then(function(data) {
                    //发送成功
                    if (data.error_code == 0) {
                        notify.success(data.error_msg);
                        currentDialog.close();
                    } else {
                        notify.warn(data.error_msg);
                    }
                });
            });
        };
        $(document).on('click', '.J_sendMessage', function(e) {
            var currentReceiver = $(this).attr('data-receiver');
            var receiverId = $(this).attr('data-id');
            if (currentReceiver && receiverId) {
                window.UC.sendMailDialog(currentReceiver, receiverId);
            }
        });
    })();
});
