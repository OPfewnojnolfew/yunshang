$(function() {
    var URLS = {
            DELETETASK: '' //删除我的作业 POST {id:}
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
    _deleteTask = function($dom, url) {
        var id = $dom.attr('data-id');
        if (!id) {
            return;
        }
        dialog({
            content: '确定删除吗？',
            ok: function() {
                _ajax(URLS.DELETETASK, {
                    id: id
                }, 'POST').then(function(data) {
                    if (data.status == 200) {
                        window.location.href = window.location.href;
                    } else {
                        dialog({
                            content: '网络错误，请重试！'
                        }).showModal();
                    }
                });
            },
            cancelValue: '取消',
            cancel: function() {}
        }).showModal();
    };
    $('.J_sendmail').on('click', function() {
        window.UC.sendMailDialog($(this).attr('data-nickname'));
    });
    $('.J_taskDelete').on('click', function() {
        _deleteTask($(this));
    });
});
