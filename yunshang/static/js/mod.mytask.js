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

    /***********************查看任务详情*************************/
    (function() {
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
            ueid = $('#examueid').val(),
            currentType = examType[type],
            OPTIONS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            examList = [],
            GETLISTENURL = $('#get_exam_record').val();
        var _createPlayer = function(videoPath, $container, showControl, isdrag) {
                if (!videoPath) {
                    return;
                }
                videoPath = (_UPLOAD_URL || '') + videoPath;
                var player = [
                        '<div class="exam-h-player">',
                        '<div class="linsten-jplayer jp-jplayer"></div>',
                        '<div class="linsten-jcontainer jp-audio" role="application" aria-label="media player">',
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
                    cssSelectorAncestor: '.linsten-jcontainer'
                });
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
                    $next = $('<a href="javascript:void(0)" class="btn btn-primary">下一题 <i class="iconfont">&#xe63c;</i></a>'),
                    i = 0,
                    len = obj.option && obj.option.length || 0,
                    $li,
                    currentIndex = 0,
                    option;
                if (len) {
                    for (; i < len; i++) {
                        option = obj.option[i];
                        $li = $('<li><i class="exam-check"></i><p>' + OPTIONS[i % OPTIONS.length] + '. ' + option.otitle + '</p></li>');
                        if (obj.selected === option.eoid) {
                            $('i', $li).addClass('checked');
                        }
                        if (option.is_right === '1') {
                            currentIndex = i;
                        }
                        $ui.append($li);
                    }
                    $ui.append('<li class="echoice-correct">正确答案: ' + OPTIONS[currentIndex % OPTIONS.length] + '</li>');
                }
                if (total === 1) {
                    $foot.append($submit);
                } else if (index === 1) {
                    $foot.append($next);
                } else if (index > 1 && index < total) {
                    $foot.append($prev).append($next);
                } else {
                    $foot.append($prev);
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
                $container.append($singleChoice);
                $singleChoice.siblings().hide();
                examList.push({
                    $dom: $singleChoice,
                    obj: obj
                });
            },
            _createRating = function(score,remark) {
            	if (score==0) {
            		score = '';
            	}
            	if ($('#is_teacher').val()==0) {
            		var rateContainer = [
            		                     '<ul class="exam-rating">',
            		                     '<li><label for="exam-score">评分：</label><input type="text" id="exam-score" value="'+score+'" placeholder="请打分"/><span>(打分0-100)</span></li>',
            		                     '<li><label for="exam-comment" class="exam-comment">评语：</label><textarea id="exam-comment" placeholder="请写评语">'+remark+'</textarea></li>',
            		                     '</ul>'
            		                 ];
            	} else {
            		var rateContainer = [
            		                     '<ul class="exam-rating">',
            		                     '<li><label for="exam-score">评分：</label><input type="text" id="exam-score" value="'+score+'" placeholder="请打分"/><span>(打分0-100)</span></li>',
            		                     '<li><label for="exam-comment" class="exam-comment">评语：</label><textarea id="exam-comment" placeholder="请写评语">'+remark+'</textarea></li>',
            		                     '<li class="last"><a class="btn btn-primary J_rateSubmit">提交</a></li>',
            		                     '</ul>'
            		                 ];
            	}
                
                var $rateContainer = $(rateContainer.join('')),
                    $score = $('#exam-score', $rateContainer),
                    $comment = $('#exam-comment', $rateContainer),
                    $J_rateSubmit = $('.J_rateSubmit', $rateContainer);
                $J_rateSubmit.on('click', function() {
                    var score = $.trim($score.val()),
                        comment = $.trim($comment.val());
                    if (!/^(0|100|[1-9]\d?)$/.test(score)) {
                        notify.warn('评分只能为0到100的整数');
                        $score.focus();
                        return;
                    }
                    window.YS.ajax($('#grade_url').val(), {
                        ueid: ueid,
                        score: score,
                        remark: comment
                    }, 'POST').then(function(res) {
                        if (res.error_code == 0) {
                            notify.success(res.error_msg);
//                            $score.attr('readonly', 'readonly');
//                            $comment.attr('readonly', 'readonly');
//                            $J_rateSubmit.remove();
                        } else {
                        	notify.warn(res.error_msg);
                        }
                    });
                });
                return $rateContainer;
            };
        window.YS.ajax(GETLISTENURL, {
            ueid: ueid
        }, 'POST').then(function(res) {
            Object.prototype.toString.call(res) === '[object String]' && (res = JSON.parse(res));
            if (res.error_code === 0) {
                currentData = JSON.parse(res.data.record);
                var $rate;
                if (currentType === 'listening') {
                    var $listenContainer = $('<div></div'),
                        $playerc = $('<div class="player-container"></div'),
                        $echoicec = $('<div></div');
                    $listenContainer.append($playerc).append($echoicec);
                    $('.exam-body').append($listenContainer);
                    _createPlayer(currentData.audio, $playerc, true, true);
                    if (currentData.subjects && currentData.subjects.length) {
                        _createSingleChoice(currentData.subjects[0], 1, currentData.subjects.length, $echoicec);
                    }
                } else if (currentType === 'reading') {
                    var $readingContainer = $('<div class="reading-container fn-clear"><div class="reading-l"></div><div class="reading-r"></div></div'),
                        $l = $('.reading-l', $readingContainer),
                        $r = $('.reading-r', $readingContainer);
                    $r.html('<h2 class="reading-title">' + currentData.title + '</h2><p class="reading-content">' + currentData.content + '</p>');
                    if (currentData.subjects && currentData.subjects.length) {
                        _createSingleChoice(currentData.subjects[0], 1, currentData.subjects.length, $l);
                    }
                    $('.exam-body').append($readingContainer);
                } else if (currentType === 'speaking') {
                    var $speakingContainer = $('<div></div'),
                        $splayerc = $('<div class="player-container"></div'),
                        $sechoicec = $('<div></div');
                    $speakingContainer.append($splayerc).append($sechoicec);
                    $rate = _createRating(res.data.score, res.data.remark);
                    $('.exam-body').append($speakingContainer).append($rate);
                    _createPlayer(res.data.audio, $splayerc, true, true);
                } else if (currentType === 'writing') {
                    var $writingContainer = $('<div class="writing-container fn-clear"><div class="writing-l"></div><div class="writing-r"><textarea></div></div>'),
                        $wl = $('.writing-l', $writingContainer),
                        $wr = $('.writing-r', $writingContainer),
                        $wrc = $('<div class="writing-area"><textarea>' + currentData.answer_content + '</textarea></div>'),
                        $textarea = $('textarea', $wrc);
                    $wl.html('<h2 class="writing-title">' + currentData.title + '</h2><p class="writing-content">' + currentData.content + '</p>');
                    $wr.html($wrc);
                    $rate = _createRating(res.data.score, res.data.remark);
                    $('.exam-body').append($writingContainer).append($rate);
                }
            }
        });
    })();
});
