(function() {
    if (!window.YS) {
        return;
    }
    var LOGINURL = '',
        dialogHtml = [
            '<div class="ld-container">',
            '<div class="ld-l">',
            '<div class="wlf-row">',
            '    <label for="ld_usermail" class="label">登录邮箱：</label>',
            '    <input type="text" id="ld_usermail" class="input">',
            '    <i class="iconfont icon-icon"></i>',
            '</div>',
            '<div class="wlf-row">',
            '    <label for="ld_passwd" class="label">登录密码：</label>',
            '    <input type="password" id="ld_passwd" class="input">',
            '    <i class="iconfont icon-icon"></i>',
            '</div>',
            '<div class="wlf-row">',
            '    <p class="wlf-meta"><label for="ld_autologin"><input type="checkbox" id="ld_autologin"> 下次自动登录</label><span class="forget"><a href="/Account/forget.html">忘记密码？</a></span></p>',
            '</div>',
            '<div class="wlf-submit">',
            '    <input type="button" value="立即登录" id="J_ldsubmit">',
            '    <span class="ld-errortip"></span>',
            '</div>',
            '</div>',
            '<div class="ld-r">',
            '<p>还没有云上教育账号?</p>',
            '<a href="/Account/register.html" class="btn btn-success">立即注册</a>',
            '</div>',
            '</div>'
        ],
        bindEvent = function($dom) {
            if (!$dom) {
                return;
            }
            var $ldbtn = $('#J_ldsubmit', $dom),
                $ldUsermail = $('#ld_usermail', $dom),
                $ldPass = $('#ld_passwd', $dom),
                $ldAutologin = $('#ld_autologin', $dom),
                $ldErrortip = $('.ld-errortip', $dom);
            $ldbtn.on('click', function() {
                var ldUsermailVal = $.trim($ldUsermail.val()),
                    ldPass = $.trim($ldPass.val()),
                    ldAutologin = $ldAutologin.prop('checked') ? 1 : 0;
                if (ldUsermailVal === '' || ldPass === '') {
                    $ldErrortip.text('用户名或密码不能为空');
                    return;
                }
                window.YS.ajax(LOGINURL, {
                    email: ldUsermailVal,
                    password: ldPass,
                    autologin: ldAutologin
                }, 'POST').then(function(res) {

                });
            });
            $ldUsermail.on('focus', function() {
                $ldErrortip.text('');
            });
            $ldPass.on('focus', function() {
                $ldErrortip.text('');
            });
        };
    window.YS.loginDialog = function() {
        var $dialogContent = $(dialogHtml.join(''));
        dialog({
            title: '用户登录',
            width: 600,
            height: 300,
            content: $dialogContent,
            innerHTML: '<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><button i="close" class="ui-dialog-close">&#215;</button><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr></table></div>'
        }).showModal();
    };
})();
