$(function() {
    var URLS = {
            SENDMAIL: '', // post{receiver: receiver,content: content} 发送私信
            DELETEMAIL: '', // post{id: } 删除私信
            DELETEMAILS: '',
            GETMAIL: '/yunshang/static/jsondata/inbox.json'
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
    var $J_Mdel = $('.J_Mdel'),
        $J_Mreaded = $('.J_Mreaded'),
        $J_toobarOnop = $('.J_toobarOnop'),
        $J_toolbarNormal = $('.J_toolbarNormal'),
        $J_Del = $('.J_Del'),
        $J_Sdel = $('.J_Sdel'),
        $J_Readed = $('.J_Readed'),
        $J_cancel = $('.J_cancel'),
        $J_Msel = $('.J_Msel'),
        $checkboxs = $('.inbox-talklist .talk-sel'),
        $talkitems = $('.inbox-talkitem'),
        $J_MsgSendMail = $('.J_MsgSendMail'),
        $J_MsgContent = $('.J_MsgContent'),
        $msgBody = $('.msg-body'),
        currentMailPerson,
        selectedItems = [],
        updateAllCheckBox = function() {
            var isAllSelected = true;
            $checkboxs.each(function() {
                isAllSelected = isAllSelected && this.checked;
            });
            $J_Msel[0].checked = isAllSelected;
        },
        createMail = function(mailObj) {
            var mailHtml = [
                '<li>',
                '<div class="msg-item ' + (mailObj.msgNotice == "1" ? '' : 'right') + ' fn-clear">',
                '        <div class="msg-arrow"></div>',
                '        <div class="msg-content">',
                '            <p>' + mailObj.content + '</p>',
                '            <div class="msg-time">' + mailObj.time + '</div>',
                '        </div>',
                '    </div>',
                '</li>'
            ];
            return mailHtml.join('');
        },
        createMails = function(data) {
            var i = 0,
                msgList = data.msgList,
                msgLis = [],
                len = msgList.length;
            //            currentMailPerson = data.msgPerson;
            $('#J_friend_nickname').text(data.msgPerson.uname);
            $('#J_friend_msg_num').text(len);
            $('#currentMailPerson').val(data.msgPerson.uid);
            for (; i < len; i++) {
                msgLis.push(createMail(msgList[i]));
            }
            $msgBody.html(msgLis.join(''));
            $msgBody[0].scrollTop = $msgBody[0].scrollHeight;
        },
        singleDelete = function(id) {
            if (id) {
                dialog({
                    content: '确定删除吗？',
                    ok: function() {
                        window.YS.ajax($('#delete_msg_url').val(), {
                            friend: id
                        }, 'POST').then(function(res) {
                            if (res.error_code === 0) {
                                location.href = location.href;
                            }
                        });
                    },
                    cancelValue: '取消',
                    cancel: function() {}
                }).showModal();
            }
            return false;
        };
    $J_Mdel.on('click', function() {
        $J_toolbarNormal.hide();
        $J_toobarOnop.show();
        $J_Del.show();
        $J_Readed.hide();
        $checkboxs.show();
    });
    $J_Mreaded.on('click', function() {
        $J_toolbarNormal.hide();
        $J_toobarOnop.show();
        $J_Del.hide();
        $J_Readed.show();
        $checkboxs.show();
    });
    $J_Del.on('click', function() {
        selectedItems = [];
        $checkboxs.each(function() {
            if (this.checked) {
                selectedItems.push($(this).attr('data-id'));
            }
        });
        if (!selectedItems.length) {
            notify.warn('未选择任何项');
            return;
        }
        dialog({
            content: '确定删除吗？',
            ok: function() {
                window.YS.ajax(URLS.DELETEMAILS, {
                    ids: selectedItems.toString()
                }, 'POST').then(function(res) {
                    if (res.status === 0) {
                        location.href = location.href;
                    }
                });
            },
            cancelValue: '取消',
            cancel: function() {}
        }).showModal();


    });
    $J_Msel.on('change', function() {
        var dom = this;
        $checkboxs.each(function() {
            if (dom.checked) {
                this.checked = true;
            } else {
                this.checked = false;
            }
        });
    });
    $checkboxs.on('change', function(argument) {
        updateAllCheckBox();
    });
    $J_cancel.on('click', function() {
        $J_toolbarNormal.show();
        $J_toobarOnop.hide();
        $J_Msel[0].checked = false;
        $checkboxs.each(function() {
            this.checked = false;
        }).hide();
    });
    $J_MsgContent.on('keyup', function() {
        if (!$.trim($J_MsgContent.val())) {
            !$J_MsgSendMail.hasClass('disabled') && $J_MsgSendMail.addClass('disabled');
        } else {
            $J_MsgSendMail.hasClass('disabled') && $J_MsgSendMail.removeClass('disabled');
        }

    });
    $J_MsgSendMail.on('click', function() {
        if ($J_MsgSendMail.hasClass('disabled')) {
            return;
        }
        var msg = $.trim($J_MsgContent.val());
        window.YS.ajax($('#send_msg_url').val(), {
            receiver: $('#currentMailPerson').val(),
            content: msg
        }, 'POST').then(function(res) {
            if (res.error_code === 0) {
                var mailDom = createMail(res.data);
                $('.msg-body').append(mailDom);
                $msgBody[0].scrollTop = $msgBody[0].scrollHeight;
                $J_MsgContent.val('');
                !$J_MsgSendMail.hasClass('disabled') && $J_MsgSendMail.addClass('disabled');
            }
        });
    });
    $talkitems.on('click', function(e) {
        var $dom = $(e.target),
            id = $(this).attr('data-id');
        if ($dom.hasClass('talk-delete') || $dom.closest('.talk-delete').length) {
            singleDelete(id);
            return;
        }
        $talkitems.removeClass('active');
        $(this).addClass('active');
        if (id) {
            window.YS.ajax($('#get_msg_url').val(), {
                friend: id
            }, 'POST').then(function(res) {
                Object.prototype.toString.call(res) === '[object String]' && (res = JSON.parse(res));
                if (res.error_code === 0) {
                    createMails(res.data);
                }
            });
        }
    });
    //$talkitems.length && $talkitems.eq(0).trigger('click');
    $msgBody[0].scrollTop = $msgBody[0].scrollHeight;
});
