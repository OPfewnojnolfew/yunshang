$(function() {
    var URLS = {
            DELETEMOCKEXAM: '', //删除我的记录模拟考试 POST {id:}
            DELETELISTENING: '', //删除我的记录听力 POST {id:}
            DELETEREAD: ''
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
        },
        _deleteRecord = function($dom, url) {
            var id = $dom.attr('data-id');
            if (!id) {
                return;
            }
            dialog({
                content: '确定删除吗？',
                ok: function() {
                    _ajax(URLS.DELETEMOCKEXAM, {
                        id: id
                    }, 'POST').then(function() {
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
    $('.J_MockexamDelete').on('click', function() {
        _deleteRecord($(this), URLS.DELETEMOCKEXAM);
    });
    $('.J_ListeningDelete').on('click', function() {
        _deleteRecord($(this), URLS.DELETELISTENING);
    });
    $('.J_ReadDelete').on('click', function() {
        _deleteRecord($(this), URLS.DELETEREAD);
    });

    $('.panel-tile.col-2 li:nth-child(even)').addClass('even');
});
