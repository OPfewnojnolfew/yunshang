$(function() {
    var URLS = {
            UPDATEINFO: saveInfoUrl, //修改用户基本信息 POST{nikeName: nikeName,email: email,sex: sex,profession: profession,introduce: introduce}
            // UPLOADIMG: 'changeAvatarUrl', //头像上传 file
            // CROPAVATAR: '', //头像裁切 GET{id: avatarID,x: avatarX,y: avatarY,width: avatarW,height: avatarH} 
            UPDATEPASS: changePassUrl //更新密码POST{originPass:,newPass:}
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

        // var $avatarUpload = $('.avatar-upload'), //上传容器
        //     $avatarCrop = $('.avatar-crop'); //裁切容器
        // //裁切
        // var jcrop_api,
        //     boundx,
        //     boundy,
        //     originWidth = 0,
        //     originHeight = 0,
        //     DEFAULT_W = 300,
        //     DEFAULT_H = 200,
        //     $avatarOriginContainer = $('.J-originimg'),
        //     $preview = $('.avatar-preview'),
        //     $pcnt = $('.avatar-preview .preview-container'),
        //     // $pimg = $('.avatar-preview .preview-container img'),
        //     $pimg,
        //     xsize = $pcnt.width(),
        //     ysize = $pcnt.height(),
        //     avatarX, avatarY, avatarW, avatarH, avatarID, avatarImageUrl,
        //     _updatePreview = function(c) {
        //         if (parseInt(c.w) > 0) {
        //             var rx = xsize / c.w;
        //             var ry = ysize / c.h;
        //             $pimg.css({
        //                 width: Math.round(rx * boundx) + 'px',
        //                 height: Math.round(ry * boundy) + 'px',
        //                 marginLeft: '-' + Math.round(rx * c.x) + 'px',
        //                 marginTop: '-' + Math.round(ry * c.y) + 'px'
        //             });
        //         }
        //     },
        //     _updateCoords = function(c) {
        //         avatarX = c.x;
        //         avatarY = c.y;
        //         avatarW = c.w;
        //         avatarH = c.h;
        //         _updateHidden(c.x, c.y, c.w, c.h);
        //     },
        //     _updateHidden = function(x, y, w, h) {
        //         var pecentX = originWidth / DEFAULT_W || 1,
        //             pecentY = originHeight / DEFAULT_H || 1;
        //         $('.J_avatarX').val(Math.round(pecentX * x));
        //         $('.J_avatarY').val(Math.round(pecentY * y));
        //         $('.J_avatarW').val(Math.round(pecentX * w));
        //         $('.J_avatarH').val(Math.round(pecentY * h));
        //     },
        //     _showAvatarUpload = function() {
        //         $avatarCrop.hide();
        //         $avatarUpload.show();
        //         jcrop_api && jcrop_api.destroy();
        //         jcrop_api = null;
        //     },
        //     _showAvatarCrop = function() {
        //         $avatarCrop.show();
        //         $avatarUpload.hide();
        //         jcrop_api && jcrop_api.destroy();
        //         jcrop_api = null;
        //     },
        //     _preview = function(fileObj) {
        //         var browserVersion = window.navigator.userAgent.toUpperCase(),
        //             self = this,
        //             $avatarOrigindv = $('<div style="width:' + DEFAULT_W + 'px;"></div>'),
        //             $temDv = $('<div style="height:1px;width:1px;"></div>'),
        //             $avatarOriginimg = $('<img  width="' + DEFAULT_W + 'px"/>');
        //         if (fileObj.files) { //HTML5实现预览，兼容chrome、火狐7+等
        //             if (window.FileReader) {
        //                 $pimg = $('<img/>');
        //                 var reader = new FileReader();
        //                 reader.onload = function(e) {
        //                     $avatarOriginContainer.html($avatarOriginimg);
        //                     $pcnt.html($pimg);
        //                     $pimg.attr('src', avatarImageUrl);
        //                     $avatarOriginimg.attr('src', avatarImageUrl);
        //                     $pimg.attr("src", e.target.result);
        //                     $avatarOriginimg.attr('src', e.target.result);
        //                     originWidth = $pimg[0].naturalWidth;
        //                     originHeight = $pimg[0].naturalHeight;
        //                     $avatarOriginimg.Jcrop({
        //                         onChange: _updatePreview,
        //                         onSelect: _updateCoords,
        //                         maxSize: [DEFAULT_W, DEFAULT_H],
        //                         allowSelect: false,
        //                         aspectRatio: 1,
        //                         bgFade: true,
        //                         setSelect: [0, 0, 120, 120]
        //                     }, function() {
        //                         var bounds = this.getBounds();
        //                         boundx = bounds[0];
        //                         boundy = bounds[1];
        //                         jcrop_api = this;
        //                         $preview.appendTo(jcrop_api.ui.holder);
        //                     });
        //                 };
        //                 reader.readAsDataURL(fileObj.files[0]);
        //             }
        //         } else if (browserVersion.indexOf("MSIE") > -1 && browserVersion.indexOf("MSIE 6") < 0 && fileObj.value) {
        //             $pimg = $('<div style="height:100%"></div>');
        //             fileObj.select();
        //             if (browserVersion.indexOf("MSIE 9") > -1)
        //                 fileObj.blur();
        //             $('body').append($temDv);
        //             $avatarOriginContainer.html($avatarOrigindv);
        //             $pcnt.html($pimg);
        //             $pimg.css("filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')");
        //             $avatarOrigindv.css("filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='crop',src='" + document.selection.createRange().text + "')");
        //             $temDv.css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod="image",src="' + document.selection.createRange().text + '")');
        //             originWidth = $temDv[0].offsetWidth;
        //             originHeight = $temDv[0].offsetHeight;
        //             $temDv.remove();
        //             $avatarOrigindv.Jcrop({
        //                 onChange: _updatePreview,
        //                 onSelect: _updateCoords,
        //                 maxSize: [DEFAULT_W, DEFAULT_H],
        //                 allowSelect: false,
        //                 aspectRatio: 1,
        //                 bgFade: true,
        //                 setSelect: [0, 0, 120, 120]
        //             }, function() {
        //                 var bounds = this.getBounds();
        //                 boundx = bounds[0];
        //                 boundy = bounds[1];
        //                 jcrop_api = this;
        //                 $preview.appendTo(jcrop_api.ui.holder);
        //             });
        //         }
        //     };
        // $('.J_avatarsave').on('click', function() {
        //     $('.setting-avatar form').submit();
        //     // if (avatarW && avatarH) {
        //     //     // _ajax(URLS.CROPAVATAR, {
        //     //     //     id: avatarID,
        //     //     //     x: avatarX,
        //     //     //     y: avatarY,
        //     //     //     width: avatarW,
        //     //     //     height: avatarH
        //     //     // }).then(function(res) {
        //     //     //     _showAvatarUpload();
        //     //     // });


        //     //     //临时测试
        //     //     _showAvatarUpload();
        //     // }
        // });
        // $('.J_avatarcancel').on('click', function() {
        //     _showAvatarUpload();
        //     _clear();
        // });

        // //头像上传
        // var $simulatFile = $('#simulat-file'),
        //     $simulatSubmit = $('#simulatSubmit'),
        //     _checkFile = function($file) {
        //         if (/msie/.test(navigator.userAgent.toLowerCase())) {
        //             var fileVal = $file.val();
        //             if (!fileVal) {
        //                 return false;
        //             }
        //             if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG|BMP)$/.test(fileVal)) {
        //                 return false;
        //             }
        //         } else {
        //             var filesObj = $file[0].files;
        //             return _checkFileEmpty(filesObj.length) && _checkFileExt(filesObj[0].type) && _checkFileSize(filesObj[0].size);
        //         }
        //         return true;
        //     },
        //     _checkFileEmpty = function(length) {
        //         if (isNaN(length) || length === 0) {
        //             return false;
        //         }
        //         return true;
        //     },
        //     _checkFileExt = function(ext) {
        //         ext = ext.substring(ext.indexOf('/') + 1);
        //         if (!/(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG|BMP)$/.test(ext)) {
        //             return false;
        //         }
        //         return true;
        //     },
        //     _checkFileSize = function(size) {
        //         if (size > 5 * 1024 * 1024) {
        //             return false;
        //         }
        //         return true;
        //     },
        //     _clear = function() {
        //         var $simulatFileClone = $simulatFile.clone(true);
        //         $simulatFileClone.val('');
        //         $simulatFile.after($simulatFileClone);
        //         $simulatFile.remove();
        //         $simulatFile = $simulatFileClone;
        //         originWidth = 0;
        //         originHeight = 0;
        //         _updateHidden(0, 0, 0, 0);
        //     };
        // $simulatFile.on('change', function() {
        //     // if (_checkFile($(this))) {
        //     //     $('.avatar-upload form').submit();
        //     // } else {
        //     //     _clear();
        //     // }
        //     if (!_checkFile($(this))) {
        //         _clear();
        //     } else {
        //         _showAvatarCrop();
        //         _preview(this);
        //     }

        // });
        // $simulatSubmit.on('load', function() {
        //     var result,
        //         res;
        //     try {
        //         res = decodeURIComponent(this.contentWindow.document.body.innerHTML);
        //         result = JSON.parse(res.replace(/<pre.*?>/, '').replace(/<\/pre>/, ''));
        //     } catch (ex) {}
        //     _showAvatarUpload();
        //     if (result) {
        //         //返回三种类型的图片url

        //     }
        //     _clear();
        // });


        $('.J_changeAavatar').on('click', function() {
            var aDialog = dialog({
                title: '修改图像',
                width: 670,
                height: 450,
                cancel:function(){
                    location.href = location.href;
                },
                content: $('#setting-avatar-dialog'),
                innerHTML: '<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><button i="close" class="ui-dialog-close">&#215;</button><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr></table></div>'
            }).showModal();
            setTimeout(function() {
                /*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
                xiuxiu.embedSWF("avatar-dialog-container", 5, "670", "450");
                //修改为您自己的图片上传接口
                xiuxiu.setUploadURL(changeAvatarUrl);
                xiuxiu.setUploadType(2);
                xiuxiu.setUploadDataFieldName("file");
                xiuxiu.onInit = function() {
                    xiuxiu.loadPhoto(defaultAvatar); //修改为要处理的图片url
                };
                xiuxiu.onUploadResponse = function(res) {
                    location.href = location.href;
                    // res = JSON.parse(res);
                    // if (res.status === 200) {
                    //     $('.avatar-view img').attr('src', res.path + res.avatar);
                    //     aDialog.close();
                    // }
                };
            }, 300);
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
