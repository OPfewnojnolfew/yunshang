$(function() {
    var type = window.YS.getParameterByName('type'),
        etid = window.YS.getParameterByName('etid'),
        URLS = {
            GETLISTENURL: 'static/jsondata/listen.json'
        },
        OPTIONS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        currentData,
        PASSMESSAGE = '您真是个天才，快去挑战更难的题目吧！',
        NOPASSMESSAGE = '您要加油哦！',
        timer = {
            elapsedTime: 0,
            isplay: false,
            MAXTIMER: 5 * 60 * 60,
            $tContainer: $('.exam-h-timer span'),
            _formartTime: function() {
                return {
                    h: Math.floor(this.elapsedTime / 3600),
                    m: Math.floor(this.elapsedTime % 3600 / 60),
                    s: this.elapsedTime % 3600 % 60
                };
            },
            _getClockTime: function() {
                var ft = this._formartTime();
                if (ft.m < 10) {
                    ft.m = '0' + ft.m;
                }
                if (ft.s < 10) {
                    ft.s = '0' + ft.s;
                }
                return ft.h > 0 ? ('0' + ft.h + ':' + ft.m + ':' + ft.s) : (ft.m + ':' + ft.s);
            },
            getStringTime: function() {
                var ft = this._formartTime();
                return (ft.h > 0 ? (ft.h + '小时') : '') + (ft.m > 0 ? (ft.m + '分钟') : '') + ft.s + '秒';
            },
            _plusTime: function() {
                var self = this;
                if (this.elapsedTime >= this.MAXTIMER || !this.isplay) {
                    return;
                }
                this.elapsedTime += 1;
                this.$tContainer.text(this._getClockTime());
                setTimeout(function() {
                    self._plusTime();
                }, 1000);
            },
            start: function() {
                this.isplay = true;
                this._plusTime();
            },
            pause: function() {
                this.isplay = false;
            }
        },

        examList = [],
        $examLoading = $('.exam-loading'),
        $examReadying = $('.exam-readying'),
        $examing = $('.exam-examing');

    var _createPlayer = function(videoPath) {
            if (!videoPath) {
                return;
            }
            var player = [
                    '<div class="exam-h-player">',
                    '<div class="linsten-jplayer jp-jplayer"></div>',
                    '<div class="linsten-jcontainer jp-audio" role="application" aria-label="media player">',
                    '<div class="jp-type-single">',
                    '<div class="jp-gui jp-interface">',
                    '<div class="jp-progress">',
                    '<div class="jp-seek-bar">',
                    '<div class="jp-play-bar"></div>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '<div class="jp-time-holder">',
                    '<div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>',
                    '<div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '</div>'
                ],
                $player = $($.parseHTML(player.join(''))),
                $linstenJplayer = $('.linsten-jplayer', $player),
                $jpSeekbar = $('.jp-seek-bar', $player);
            $('.J_head').append($player);
            $linstenJplayer.jPlayer({
                ready: function(event) {
                    $(this).jPlayer('setMedia', {
                        mp3: videoPath,
                    }).jPlayer('play');
                    $jpSeekbar.off('click');
                },
                swfPath: 'static/js/jplayer/jquery.jplayer.swf',
                supplied: 'mp3, oga',
                wmode: 'window',
                smoothPlayBar: true,
                cssSelectorAncestor: '.linsten-jcontainer'
            });
        },
        _createSingleChoice = function(obj, index, total) {
            var singleChoice = [
                    '<div class="exam-listening">',
                    '<h2 class="exam-title">Question ' + index + ' of ' + total + '</h2>',
                    '<div class="exam-choice">',
                    '<p class="echoice-header">' + obj.stitle + '</p>',
                    '<ul class="echoice-body"></ul>',
                    '<div class="echoice-foot"></div>',
                    '</div>',
                    '</div>'
                ],
                $singleChoice = $(singleChoice.join('')),
                $foot = $('.echoice-foot', $singleChoice),
                $ui = $('.echoice-body', $singleChoice),
                $prev = $('<a href="javascript:void(0)" class="btn btn-primary"> <i class="iconfont">&#xe63d;</i> 上一题</a>'),
                $next = $('<a href="javascript:void(0)" class="btn btn-primary disabled">下一题 <i class="iconfont">&#xe63c;</i></a>'),
                $submit = $('<a href="javascript:void(0)" class="J_eaxmSubmit btn btn-primary disabled"><i class="iconfont">&#xe612;</i>提交</a>'),
                i = 0,
                clickHandler = function() {
                    var $this = $(this);
                    $('i', $ui).removeClass('checked');
                    $('i', $this).addClass('checked');
                    $next.removeClass('disabled');
                    obj.selectedOption = $this.attr('data-id');
                    if (total === index) {
                        $submit.removeClass('disabled');
                    }
                },
                len = obj.option && obj.option.length || 0,
                $li,
                option;
            if (len) {
                for (; i < len; i++) {
                    option = obj.option[i];
                    $li = $('<li data-id="' + option.eoid + '"><i class="exam-check"></i><p>' + OPTIONS[i % OPTIONS.length] + '. ' + option.otitle + '</p></li>');
                    $li.on('click', clickHandler);
                    $ui.append($li);
                }
            }
            if (total === 1) {
                $foot.append($submit);
            } else if (index === 1) {
                $foot.append($next);
            } else if (index > 1 && index < total) {
                $foot.append($prev).append($next);
            } else {
                $foot.append($prev).append($submit);
            }
            $prev.on('click', function() {
                (index - 2) >= 0 && examList[index - 2].$dom.show().siblings().hide();
            });
            $next.on('click', function() {
                if ($(this).hasClass('disabled')) {
                    return;
                }
                if (examList.length > index) {
                    examList[index].$dom.show().siblings().hide();
                    return;
                }
                var $singleChoice;
                currentData.subjects.length && ($singleChoice = _createSingleChoice(currentData.subjects[index], index + 1, total));
                $('.exam-examing').append($singleChoice);
                examList.push({
                    $dom: $singleChoice,
                    obj: currentData.subjects[index]
                });
                $singleChoice.siblings().hide();
            });
            $submit.on('click', function() {
                timer.pause();
                var i = 0,
                    j,
                    len = examList.length,
                    opLen,
                    examItem,
                    $examItem,
                    optionItem,
                    rcount = 0,
                    wcount = 0;
                for (; i < len; i++) {
                    examItem = examList[i].obj;
                    $examItem = examList[i].$dom;
                    $('li', $examItem).off('click');
                    for (j = 0, opLen = examItem.option.length; j < opLen; j++) {
                        optionItem = examItem.option[j];
                        if (optionItem.is_right === '1') {
                            $('.echoice-body', $examItem).append('<li class="echoice-correct">正确答案: ' + OPTIONS[j % OPTIONS.length] + '</li>')
                            if (optionItem.eoid === examItem.selectedOption) {
                                rcount += 1;
                                break;
                            }
                        }
                        if (j === opLen - 1) {
                            wcount += 1;
                        }
                    }
                    //移除提交按钮
                    if (i === len - 1) {
                        $('.J_eaxmSubmit', $examItem).remove();
                    }
                }
                _submitDialog(rcount, wcount);
            });
            return $singleChoice;
        },
        _submitDialog = function(rcount, wcount) {
            var isPass = rcount / (rcount + wcount) * 100 > 60;
            var dialogHtml = [
                '<div class="exam-dialog">',
                '<div class="exam-body">',
                '<i class="iconfont">' + (isPass ? '&#xe61d;' : '&#xe637;') + '</i>',
                '<ul>',
                '<li>此次练习您用了' + timer.getStringTime() + '</li>',
                '<li>正确：<span>' + rcount + '道</span>',
                '</li>',
                '<li>错误：<span>' + wcount + '道</span>',
                '</li>',
                '<li class="last">' + (isPass ? PASSMESSAGE : NOPASSMESSAGE) + '</li>',
                '</ul>',
                '</div>',
                '<div class="exam-foot">',
                '<a href="javascript:void(0)" class="btn-inver btn-inver-lg btn-inver-primary">回归题目</a>',
                '<a href="' + document.referrer + '" class="btn btn-lg btn-primary">马上去</a>',
                '</div>',
                '</div>'
            ];
            var $dialogContent = $(dialogHtml.join('')),
                $review = $('.exam-foot a:eq(0)', $dialogContent),
                currentDialog = dialog({
                    title: ' ',
                    width: 618,
                    height: 300,
                    content: $dialogContent,
                    innerHTML: '<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><button i="close" class="ui-dialog-close">&#215;</button><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr></table></div>'
                }).showModal();
            $review.on('click', function() {
                examList[0].$dom.show().siblings().hide();
                currentDialog.close();
            });
        },
        gotoReadying = function() {
            $('#H').show();
            $examLoading.hide();
            $examing.hide();
            $examReadying.show();
            $('.exam-h-title').text('美国考试SAT'); //根据后台
            $('.exam-h-subtitle').text(currentData && currentData.title); //根据后台
            $('.exam-h-exit').attr('href', document.referrer); //根据后台
        };

    window.YS.ajax(URLS.GETLISTENURL, {
        etid: etid
    }).then(function(res) {
        Object.prototype.toString.call(res) === '[object String]' && (res = JSON.parse(res));
        if (res.error_code === 0) {
            currentData = res.data;
            gotoReadying();
        }
    });
    $('.J-GO').on('click', function() {
        $examReadying.hide();
        $examing.show();
        timer.start();
        _createPlayer(currentData && currentData.audio);
        if (currentData.subjects && currentData.subjects.length) {
            var $singleChoice;
            $singleChoice = _createSingleChoice(currentData.subjects[0], 1, currentData.subjects.length);
            $('.exam-examing').append($singleChoice);
            examList.push({
                $dom: $singleChoice,
                obj: currentData.subjects[0]
            });
        }
    });
});
