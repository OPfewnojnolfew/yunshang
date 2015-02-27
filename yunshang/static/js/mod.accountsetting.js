$(function() {
    var URLS = {
            UPDATEINFO: 'saveInfoUrl', //修改用户基本信息 POST{nikeName: nikeName,email: email,sex: sex,profession: profession,introduce: introduce}
            UPLOADIMG: 'changeAvatarUrl', //头像上传 file
            CROPAVATAR: '', //头像裁切 GET{id: avatarID,x: avatarX,y: avatarY,width: avatarW,height: avatarH} 
            UPDATEPASS: 'changePassUrl' //更新密码POST{originPass:,newPass:}
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
        _getParameterByName = function(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
                results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };
    //进入页面后切换
    (function() {
        var type = _getParameterByName('type');
        if (type === 'changeavatar') {
            $('.panel-nav li[data-tab="changeavatar"]').trigger('click');
        } else if (type === 'changepass') {
            $('.panel-nav li[data-tab="changepass"]').trigger('click');
        }
    })();
    /**********************************账户设置**********************************/
    (function() {
        //基本信息设置
        $('.J-infosave').on('click', function() {
            var nikeName = $.trim($('#setting-nickname').val()),
                //email = $.trim($('#setting-email').val()),
                sex = $('input[name="sex"]:checked').val(),
                profession = $('#setting-profession').val(),
                introduce = $('#setting-introduce').val();
            if (!nikeName) {
                dialog({
                    content: '昵称不能为空！'
                }).showModal();
                return;
            }
            /*if (!isMail(email)) {
                dialog({
                    content: '邮箱格式不正确！'
                }).showModal();
                return;
            }*/
            _ajax(URLS.UPDATEINFO, {
                nikeName: nikeName,
                //email: email,
                sex: sex,
                profession: profession,
                introduce: introduce
            }, 'POST').then(function(res) {
                dialog({
                    content: res.message
                }).showModal();
            });
        });

        var $avatarUpload = $('.avatar-upload'), //上传容器
            $avatarCrop = $('.avatar-crop'); //裁切容器
        //裁切
        var jcrop_api,
            boundx,
            boundy,
            $avatarOriginimg = $('.J-originimg'),
            $preview = $('.avatar-preview'),
            $pcnt = $('.avatar-preview .preview-container'),
            $pimg = $('.avatar-preview .preview-container img'),
            xsize = $pcnt.width(),
            ysize = $pcnt.height(),
            avatarX, avatarY, avatarW, avatarH, avatarID, avatarImageUrl,
            _updatePreview = function(c) {
                if (parseInt(c.w) > 0) {
                    var rx = xsize / c.w;
                    var ry = ysize / c.h;

                    $pimg.css({
                        width: Math.round(rx * boundx) + 'px',
                        height: Math.round(ry * boundy) + 'px',
                        marginLeft: '-' + Math.round(rx * c.x) + 'px',
                        marginTop: '-' + Math.round(ry * c.y) + 'px'
                    });
                }
            },
            _updateCoords = function(c) {
                avatarX = c.x;
                avatarY = c.y;
                avatarW = c.w;
                avatarH = c.h;
            },
            _showAvatarUpload = function() {
                $avatarCrop.hide();
                $avatarUpload.show();
                jcrop_api && jcrop_api.destroy();
                jcrop_api = null;
            },
            _showAvatarCrop = function() {
                $avatarCrop.show();
                $avatarUpload.hide();
                jcrop_api && jcrop_api.destroy();
                jcrop_api = null;
            };
        $('.J_avatarsave').on('click', function() {
            if (avatarW && avatarH) {
                // _ajax(URLS.CROPAVATAR, {
                //     id: avatarID,
                //     x: avatarX,
                //     y: avatarY,
                //     width: avatarW,
                //     height: avatarH
                // }).then(function(res) {
                //     _showAvatarUpload();
                // });


                //临时测试
                _showAvatarUpload();
            }
        });
        $('.J_avatarcancel').on('click', function() {
            _showAvatarUpload();
        });

        //头像上传
        var $simulatFile = $('#simulat-file'),
            $simulatSubmit = $('#simulatSubmit'),
            _checkFile = function($file) {
                if (/msie/.test(navigator.userAgent.toLowerCase())) {
                    var fileVal = $file.val();
                    if (!fileVal) {
                        return false;
                    }
                    if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG|BMP)$/.test(fileVal)) {
                        return false;
                    }
                } else {
                    var filesObj = $file[0].files;
                    return _checkFileEmpty(filesObj.length) && _checkFileExt(filesObj[0].type) && _checkFileSize(filesObj[0].size);
                }
                return true;
            },
            _checkFileEmpty = function(length) {
                if (isNaN(length) || length === 0) {
                    return false;
                }
                return true;
            },
            _checkFileExt = function(ext) {
                ext = ext.substring(ext.indexOf('/') + 1);
                if (!/(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG|BMP)$/.test(ext)) {
                    return false;
                }
                return true;
            },
            _checkFileSize = function(size) {
                if (size > 5 * 1024 * 1024) {
                    return false;
                }
                return true;
            },
            _clear = function() {
                var $simulatFileClone = $simulatFile.clone(true);
                $simulatFileClone.val('');
                $simulatFile.after($simulatFileClone);
                $simulatFile.remove();
                $simulatFile = $simulatFileClone;
            };
        $simulatFile.on('change', function() {
            if (_checkFile($(this))) {
                $('.avatar-upload form').submit();
            } else {
                _clear();
            }
        });
        $simulatSubmit.on('load', function() {
            var result,
                res;
            try {
                res = decodeURIComponent(this.contentWindow.document.body.innerHTML);
                result = JSON.parse(res.replace(/<pre.*?>/, '').replace(/<\/pre>/, ''));
            } catch (ex) {}
            if (result) {
                avatarID = result.avatarID;
                avatarImageUrl = result.avatarImageUrl;
                _showAvatarCrop();
                $pimg.attr('src', avatarImageUrl);
                $avatarOriginimg.attr('src', avatarImageUrl);
                setTimeout(function() {
                    $avatarOriginimg.Jcrop({
                        onChange: _updatePreview,
                        onSelect: _updateCoords,
                        maxSize: [300, 200],
                        allowSelect: false,
                        aspectRatio: 1,
                        bgFade: true,
                        setSelect: [0, 0, 120, 120]
                    }, function() {
                        var bounds = this.getBounds();
                        boundx = bounds[0];
                        boundy = bounds[1];
                        jcrop_api = this;
                        $preview.appendTo(jcrop_api.ui.holder);
                    });
                }, 200);
            }
            _clear();
            /****测试代码(可删)*****/
           /* _showAvatarCrop();
            $pimg.attr('src', 'static/img/test.jpg');
            $avatarOriginimg.attr('src', 'static/img/test.jpg');
            $preview.hide();
            setTimeout(function() {
                $avatarOriginimg.Jcrop({
                    onChange: _updatePreview,
                    onSelect: _updateCoords,
                    // maxSize: [300, 200],
                    allowSelect: false,
                    aspectRatio: 1,
                    bgFade: true,
                    setSelect: [0, 0, 120, 120]
                }, function() {
                    var bounds = this.getBounds();
                    boundx = bounds[0];
                    boundy = bounds[1];
                    jcrop_api = this;
                    $preview.appendTo(jcrop_api.ui.holder);
                    $preview.show();
                });
            }, 200);*/
        });

        $('.J-passsave').on('click', function() {
            var originPass = $('#setting-originpass').val(),
                $newPass = $('#setting-newpass'),
                newPass = $newPass.val(),
                $confirmpass = $('#setting-confirmpass'),
                confirmpass = $confirmpass.val();
            if (!originPass || !newPass || !confirmpass) {
                dialog({
                    content: '密码不能为空！'
                }).showModal();
                return;
            }
            if (newPass !== confirmpass) {
                dialog({
                    content: '两次输入的密码不一致！'
                }).showModal();
                $newPass.val('');
                $confirmpass.val('');
                return;
            }
            _ajax(URLS.UPDATEPASS, {
                originPass: originPass,
                newPass: newPass
            }, 'POST').then(function(res) {
            	dialog({
                    content: res.message
                }).showModal();
            });
        });
    })();
});
