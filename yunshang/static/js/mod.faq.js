$(function() {
    var URLS = {
            GETQUESTION: '', //获取我的提问 GET {id:}
            UPDATEQUESTION: '', //更新我的提问 POST {id: data.id,title: title,content: content}
            UPDATEANSWER: '', //更新我的回答 POST {id: data.id,title: title,content: content}
            DELETEQUESTION: '', //删除我的提问 POST {id:}
            DELETEANSWER: '' //删除我的回答 POST {id:}
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
        _openDialog = function(data, callback) {
            var $dialogContent = $('.J_dialog'),
                $title = $('.J_dialog input').val(data && data.title || ''),
                $content = $('.J_dialog textarea').val(data && data.content || '');
            dialog({
                title: '编辑我的提问',
                width: 650,
                height: 250,
                content: $('.J_dialog'),
                ok: function() {
                    var dia = this,
                        title = $title.val(),
                        content = $content.val();
                    if (!title) {
                        $title.focus();
                    }
                    if (!content) {
                        $content.focus();
                    }
                    _ajax($('#update_question_url').val(), {
                        id: data.id,
                        title: title,
                        content: content
                    }, 'POST').then(function(data) {
                    	if (data.error_code==0) {
                    		//修改成功
                            callback && callback(title, content);
                            dia.close();
                    	} else {
                    		dia.close();
                    	    dialog({
                    	    	content: data.error_msg
                            }).showModal();
                    	}
                        
                    });
                    return false;
                },
                cancelValue: '取消',
                cancel: function() {}
            }).showModal();
        },
        _editQuestion = function($dom) {
            var id = $dom.attr('data-id'),
                $mb = $dom.closest('.media-body'),
                $h = $('.media-heading', $mb),
                $c = $('.media-content', $mb);
            if (!id) {
                return;
            }
            _openDialog({
                id: id,
                title: $h.text(),
                content: $c.text()
            }, function(title, content) {
                $h.text(title);
                $c.text(content);
            });
            // _ajax(URLS.GETQUESTION, {
            //     id: id
            // }).then(function(data) {
            //     if (data.status == 200) {
            // _openDialog(data, function(title) {
            //     $dom.closest('.media-body').find('.media-content').text(title);
            // });
            // } else {
            //     dialog({
            //         content: '网络错误，请重试！'
            //     }).showModal();
            // }

            // });
        },
        _editAnswer = function($dom) {
            var id = $dom.attr('data-id'),
                $mediaContent = $dom.closest('.media-body').find('.media-content'),
                $content = $('.J_dialog textarea').val($mediaContent.text());
            if (!id) {
                return;
            }
            dialog({
                title: '编辑我的回答',
                width: 650,
                height: 200,
                content: $('.J_dialog'),
                ok: function() {
                    var dia = this,
                        content = $content.val();
                    if (!content) {
                        $content.focus();
                    }
                    _ajax($('#update_question_url').val(), {
                        id: id,
                        content: content
                    }, 'POST').then(function(data) {
                    	if (data.error_code==0) {
                    		//修改成功
                            $mediaContent.text(content);
                            dia.close();
                    	} else {
                    		dia.close();
                    	    dialog({
                    	    	content: data.error_msg
                            }).showModal();
                    	}
                        
                    });
                    return false;
                },
                cancelValue: '取消',
                cancel: function() {}
            }).showModal();
        },
        _deleteFAQ = function($dom, url) {
            var id = $dom.attr('data-id');
            if (!id) {
                return;
            }
            dialog({
                content: '确定删除吗？',
                ok: function() {
                    _ajax(url, {
                        id: id
                    }, 'POST').then(function(data) {
                        if (data.error_code == 0) {
                            window.location.href = window.location.href;
                        } else {
                            dialog({
                                content: data.error_msg
                            }).showModal();
                        }
                    });
                },
                cancelValue: '取消',
                cancel: function() {}
            }).showModal();
        };
    $('.J_editquestion').on('click', function() {
        _editQuestion($(this));
    });
    $('.J_deletequestion').on('click', function() {
        _deleteFAQ($(this), $('#delete_question_url').val());
    });
    $('.J_editanswer').on('click', function() {
        _editAnswer($(this));
    });
    $('.J_deletanswer').on('click', function() {
        _deleteFAQ($(this), $('#delete_question_url').val());
    });
});
