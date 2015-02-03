$(function() {
    var URLS = {
            SENDMAIL: '', // post{receiver: receiver,content: content} 发送私信
            DELETEMAIL: '' // post{id: } 删除私信
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
    // ,
    // _openDialog = function(currentReceiver) {
    //     var $dialogContent = $('.inbox-dialog'),
    //         $receiver = $('.inbox-dialog input').val(currentReceiver || ''),
    //         $content = $('.inbox-dialog textarea').val(''),
    //         $send = $('.inbox-dialog a'),
    //         currentDialog = dialog({
    //             title: '发私信',
    //             width: 350,
    //             height: 190,
    //             content: $('.inbox-dialog'),
    //             innerHTML: '<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><button i="close" class="ui-dialog-close">&#215;</button><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr></table></div>'
    //         }).showModal();
    //     $send.off('click').on('click', function() {
    //         var receiver = $receiver.val(),
    //             content = $content.val();
    //         if (!receiver) {
    //             $receiver.focus();
    //             return;
    //         }
    //         if (!content) {
    //             $content.focus();
    //             return;
    //         }
    //         _ajax(URLS.SENDMAIL, {
    //             receiver: receiver,
    //             content: content
    //         }, 'POST').then(function() {
    //             //用户不存在
    //             //发送成功
    //             currentDialog.close();
    //         });
    //         //临时测试
    //         currentDialog.close();
    //     });
    // };
    $('.J_sendmail').on('click', function() {
        window.UC.sendMailDialog($(this).attr('data-nickname'));
        // _openDialog($(this).attr('data-nickname'));
    });
    $('.J_deletemail').on('click', function() {
        var id = $(this).attr('data-id');
        if (!id) {
            dialog({
                content: '该条记录不存在或已删除！'
            }).showModal();
            return;
        }
        _ajax(URLS.DELETEMAIL, {
            id: id
        }, 'POST').then(function() {
            window.location.href = window.location.href;
        });
    });
});
