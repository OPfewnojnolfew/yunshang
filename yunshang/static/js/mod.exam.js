$(function() {
    var examType = {
            '2': 'listening',
            '3': 'reading',
            '4': 'speaking',
            '5': 'writing',
            '6': 'mocking'
        },
        examTypeValue = {
            '2': '听力',
            '3': '阅读',
            '4': '口语',
            '5': '写作',
            '6': '模拟考试'
        },
        // type = window.YS.getParameterByName('type'),
        type = $('#examtype').val() || '2',
        // etid = window.YS.getParameterByName('etid'),
        etid = $('#exametid').val(),
        currentType = examType[type],
        recorder = null,
        currentTypeValue = examTypeValue[type];
    if (!currentType || !etid) {
        return;
    }
    var URLS = {
            GETLISTENURL: _EXAM_URL,
            POSTRECORDER: 'acceptfile.php?filename=hello',
            ADDWRITINGURL: '' //{'content':}
        },
        OPTIONS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        currentData,
        PASSMESSAGE = '您真是个天才，快去挑战更难的题目吧！',
        NOPASSMESSAGE = '您要加油哦！',
        $recorder, //录音机
        PREPARETIME = 15, //录音准备时间
        RECORDTIME = 45, //录音时间
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

    var _createPlayer = function(videoPath, $container, showControl, isdrag) {
            if (!videoPath) {
                return;
            }
            videoPath = (_STATIC_URL || '') + videoPath;
            var player = [
                    '<div class="exam-h-player">',
                    '<div class="linsten-jplayer jp-jplayer"></div>',
                    '<div id="linsten-jcontainer" class="jp-audio" role="application" aria-label="media player">',
                    '<div class="jp-type-single">',
                    '<div class="jp-gui jp-interface">',
                    showControl ? '<div class="jp-controls"><a class="jp-play" href="javascript:void(0)" tabindex="0"></a></div>' : '',
                    '<div class="jp-progress">',
                    '<div class="jp-seek-bar">',
                    '<div class="jp-play-bar"></div>',
                    '</div>',
                    '</div>',
                    '<div class="jp-volume-controls">',
                    '<button class="jp-mute" role="button" tabindex="0">mute</button>',
                    '<button class="jp-volume-max" role="button" tabindex="0">max volume</button>',
                    '<div class="jp-volume-bar">',
                    '<div class="jp-volume-bar-value"></div>',
                    '</div>',
                    '</div>',
                    '<div class="jp-time-holder">',
                    '<div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>',
                    '<div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '</div>'
                ],
                $player = $($.parseHTML(player.join(''))),
                $linstenJplayer = $('.linsten-jplayer', $player),
                $jpSeekbar = $('.jp-seek-bar', $player);
            ($container || $('.J_head')).append($player);
            $linstenJplayer.jPlayer({
                ready: function(event) {
                    var pl = $(this).jPlayer('setMedia', {
                        mp3: videoPath,
                    });
                    !showControl && pl.jPlayer('play');
                    !isdrag && $jpSeekbar.off('click');
                },
                swfPath: 'static/js/jplayer/jquery.jplayer.swf',
                supplied: 'mp3, oga',
                wmode: 'window',
                smoothPlayBar: true,
                useStateClassSkin: true,
                autoBlur: false,
                keyEnabled: true,
                remainingDuration: true,
                toggleDuration: true,
                cssSelectorAncestor: '#linsten-jcontainer'
            });
        },
        _createReader = function($container) {
            $container.html('<h2 class="reading-title">' + currentData.title + '</h2><p class="reading-content">' + currentData.content + '</p>');
        },
        _createWrite = function($container) {
            var $wl = $('.writing-l', $container),
                $wr = $('.writing-r', $container),
                $wrc = $('<div class="writing-area"><textarea/></div><div class="writing-s"><a href="javascript:void(0)" class="btn btn-primary">提交</a></div>'),
                $textarea = $('textarea', $wrc),
                $wsubmit = $('a', $wrc);
            $wsubmit.on('click', function() {
                var textareaVal = $.trim($textarea.val());
                if (!textareaVal) {
                    $textarea.focus();
                    return;
                }
                timer.pause();
                window.YS.ajax(URLS.ADDWRITINGURL, {
                    content: textareaVal
                }, 'POST').then(function(res) {
                    $wsubmit.remove();
                    $textarea.attr('disabled', 'disabled');
                });
            });
            $wl.html('<h2 class="writing-title">' + currentData.title + '</h2><p class="writing-content">' + currentData.content + '</p>');
            $wr.html($wrc);

        },
        _createSingleChoice = function(obj, index, total, $container) {
            var singleChoice = [
                    '<div class="exam-' + examType[type] + '">',
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
                $submit = $('<a href="javascript:void(0)" class="J_eaxmSubmit btn btn-primary disabled"><i class="iconfont">&#xe612;</i> 提交</a>'),
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
                currentData.subjects.length && _createSingleChoice(currentData.subjects[index], index + 1, total, $container);
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
            $container.append($singleChoice);
            $singleChoice.siblings().hide();
            examList.push({
                $dom: $singleChoice,
                obj: obj
            });
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
                    width: 570,
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
            var rc,
                $rc;
            if (currentType === 'speaking') {
                rc = [
                    '<div>',
                    '<p class="exam-ready-header ' + currentType + '">',
                    '您即将进行' + currentTypeValue + '练习，请做好准备',
                    '</p>',
                    '<div class="recorder-content fn-clear">',
                    '<a href="javascript:void(0)" class="J-recordertest btn btn-primary">录音测试</a>',
                    '<p class="J-recordertsign">出现 "请求授权" 时，请点击 "允许"</p>',
                    '</div>',
                    '<a href="javascript:void(0)" class="J-GO btn btn-primary btn-go" style="display:none">GO</a>',
                    '</div>'
                ];
                $rc = $(rc.join(''));

                var $Jrecordercontent = $('.recorder-content', $rc),
                    $Jrecordertest = $('.J-recordertest', $rc),
                    $Jrecordertsign = $('.J-recordertsign', $rc),
                    $t = $('<span></span>'),
                    t = 4,
                    $JGO = $('.J-GO', $rc),
                    recorderType = 0, //0-录音测试 1-录音中 2-重新录音测试
                    readyRecorder = function() {
                        t = t - 1;
                        $t.text(' ' + t);
                        if (t === 0) {
                            $Jrecordertest.on('click', recorderAudio);
                            $.jRecorder.record(30);
                            $Jrecordertest.text('录音中。。。');
                            $Jrecordertsign.text('录音中，点击进行回听和重新测试');
                            $Jrecordertest.removeClass('btn-primary').addClass('btn-default');
                            recorderType = 1;
                        } else {
                            setTimeout(readyRecorder, 1000);
                        }
                    },
                    recorderAudio = function() {
                        if (recorderType === 0 || recorderType === 2) {
                            $.jRecorder.stopAudio();
                            $Jrecordertest.append($t);
                            t = 4;
                            readyRecorder();
                            $Jrecordertest.off('click');
                        } else if (recorderType === 1) {
                            $.jRecorder.stop();
                            $.jRecorder.playAudio();
                            $Jrecordertest.text('重新测试');
                            $Jrecordertsign.text('出现 "请求授权" 时，请点击 "允许"');
                            $Jrecordertest.removeClass('btn-default').addClass('btn-primary');
                            recorderType = 2;
                            $JGO.show();
                        }
                    };
                $Jrecordertest.on('click', recorderAudio);
                $examReadying.html($rc).show();
                // _createSpeakRecord($Jrecordercontent);
                _createSpeakRecord();
            } else {
                rc = [
                    '<div>',
                    '<p class="exam-ready-header ' + currentType + '">',
                    '您即将进行' + currentTypeValue + '练习，请做好准备',
                    '</p>',
                    '<a href="javascript:void(0)" class="J-GO btn btn-primary btn-go">GO</a>',
                    '</div>'
                ];
                $rc = $(rc.join(''));
                $examReadying.html($rc).show();
            }
            $('.exam-h-title').text(currentData && currentData.cate_name); //根据后台
            $('.exam-h-subtitle').text(currentData && currentData.title); //根据后台
            $('.exam-h-exit').attr('href', document.referrer); //根据后台
        },
        _createSpeakRecord = function() {
            $.jRecorder({
                host: URLS.POSTRECORDER,
                swf_path: 'static/js/jrecorder/jRecorder.swf',
                callback_finished_sending: function(res) {
                    var $speakingPreview = $('.speaking-previeving');
                    res = JSON.parse(res);
                    if ($speakingPreview.length) {
                        $speakingPreview.show().siblings().remove();
                        $('.speaking-foot').remove();
                        _createPlayer(res.path, $speakingPreview, true, true);
                    }
                }
            }, $('.J_recorder'));
        },
        _createSpeaking = function($container) {
            var speakingHtml = [
                    '<div class="exam-' + examType[type] + '">',
                    '<div class="speaking-header"><p></p></div>',
                    '<div class="speaking-body">',
                    '<div class="speaking-ready">',
                    '<p>Preparation Time: ' + PREPARETIME + ' Seconds</p>',
                    '<p>Response Time: ' + RECORDTIME + ' Seconds</p>',
                    '</div>',
                    '<div class="speaking-recording">',
                    '<div class="speaking-recording-t">Prepare your response</div>',
                    '<div class="speaking-recording-m">00:' + (PREPARETIME < 10 ? '0' + PREPARETIME : PREPARETIME) + '</div>',
                    '<div class="speaking-recording-b">',
                    '<div class="speaking-recording-run"></div>',
                    '</div>',
                    '</div>',
                    '<div class="speaking-previeving"></div>',
                    '</div>',
                    '<div class="speaking-foot"><a href="javascript:void(0)" class="btn btn-primary">提交</a></div>',
                    '</div>'
                ],
                $speakingHtml = $(speakingHtml.join('')),
                $ready = $('.speaking-ready', $speakingHtml),
                $record = $('.speaking-recording', $speakingHtml),
                $srt = $('.speaking-recording-t', $record),
                $srm = $('.speaking-recording-m', $record),
                // $srb = $('.speaking-recording-b', $record),
                $srr = $('.speaking-recording-run', $record),
                $foot = $('.speaking-foot', $speakingHtml),
                $recorderSubmit = $('a', $foot),
                $headerp = $('.speaking-header p', $speakingHtml);
            $headerp.text(currentData.content);
            $container.html($speakingHtml);
            // $speakingHtml.append($recorder);
            $recorderSubmit.on('click', function() {
                $.jRecorder.sendData();
                timer.pause();
                $foot.html('<p class="speaking-stip">正在处理音频文件，请稍后...</p>');
            });
            var ptime = PREPARETIME,
                rtime = RECORDTIME,
                bwidth = '458px',
                prepareing = function() {
                    $srm.text('00:' + (ptime < 10 ? '0' + ptime : ptime));
                    ptime = ptime - 1;
                    if (ptime < 0) {
                        $srt.text('Recording');
                        $srm.text('00:' + (RECORDTIME < 10 ? '0' + RECORDTIME : RECORDTIME));
                        $srr.finish().css('width', 0);
                        setTimeout(function() {
                            $.jRecorder.record(RECORDTIME);
                            $srr.finish().animate({
                                width: bwidth
                            }, RECORDTIME * 1000);
                            recording();
                        }, 1000);
                    } else {
                        setTimeout(prepareing, 1000);
                    }
                },
                recording = function() {
                    $srm.text('00:' + (rtime < 10 ? '0' + rtime : rtime));
                    rtime = rtime - 1;
                    if (rtime < 0) {
                        $.jRecorder.stop();
                        $foot.show();
                    } else {
                        setTimeout(recording, 1000);
                    }
                };
            setTimeout(function() {
                $ready.hide();
                $record.show();
                setTimeout(function() {
                    prepareing();
                    $srr.finish().animate({
                        width: bwidth
                    }, PREPARETIME * 1000);
                }, 1000);
            }, 1000);
        };

    window.YS.ajax(URLS.GETLISTENURL, {
        etid: etid
    }, 'POST').then(function(res) {
        Object.prototype.toString.call(res) === '[object String]' && (res = JSON.parse(res));
        if (res.error_code === 0) {
            currentData = res.data;
            gotoReadying();
        }
    });
    $(document).on('click', '.J-GO', function() {
        $examReadying.hide();
        $examing.show();
        timer.start();
        if (currentType === 'listening') {
            $('#M').addClass('w-158');
            _createPlayer(currentData && currentData.audio);
            if (currentData.subjects && currentData.subjects.length) {
                var $listeningContainer = $('<div></div');
                _createSingleChoice(currentData.subjects[0], 1, currentData.subjects.length, $listeningContainer);
                $('.exam-examing').append($listeningContainer);
            }
        } else if (currentType === 'reading') {
            var $readingContainer = $('<div class="reading-container fn-clear"><div class="reading-l"></div><div class="reading-r"></div></div'),
                $l = $('.reading-l', $readingContainer),
                $r = $('.reading-r', $readingContainer);
            _createReader($r);
            if (currentData.subjects && currentData.subjects.length) {
                _createSingleChoice(currentData.subjects[0], 1, currentData.subjects.length, $l);
            }
            $('.exam-examing').append($readingContainer);
        } else if (currentType === 'speaking') {
            var $speakingContainer = $('<div class="speaking-container"></div');
            $('.exam-examing').append($speakingContainer);
            $.jRecorder.stopAudio();
            _createSpeaking($speakingContainer);
        } else if (currentType === 'writing') {
            var $writingContainer = $('<div class="writing-container fn-clear"><div class="writing-l"></div><div class="writing-r"><textarea/></div></div');
            _createWrite($writingContainer);
            $('.exam-examing').append($writingContainer);
        }
    });
});
