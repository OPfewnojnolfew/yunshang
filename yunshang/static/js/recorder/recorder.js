(function() {
    var index = 0,
        ID = 'F-R-',
        options = {
            uploadUrl: '',
            swfUrl: ''
        };
    var Recorder = function(option) {
        this.options = $.extend({}, options, option);
        index++;
        this.SWFObject = null;
        this.ID = ID + index;
        this.init();
    };
    Recorder.prototype = {
        init: function() {
            var $ieR = $('<object id="' + this.ID + '" name="FlashID" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="215" height="140"><PARAM NAME="_cx" VALUE="3175"><PARAM NAME="_cy" VALUE="1058"><PARAM NAME="FlashVars" VALUE=""><PARAM NAME="Src" VALUE="' + this.options.swfUrl + '?' + Math.random() + '"><PARAM NAME="wmode" VALUE="opaque"><param name="allowScriptAccess" value="sameDomain" /></object>'),
                $otherR = $('<object id="' + this.ID + '" name="FlashID" type="application/x-shockwave-flash" data="' + this.options.swfUrl + '?' + Math.random() + '" width="215" height="140"><param name="movie" value="' + this.options.swfUrl + '?' + Math.random() + '" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><param name="play" value="true" /><param name="loop" value="true" /><param name="wmode" value="opaque" /><param name="scale" value="showall" /><param name="menu" value="true" /><param name="devicefont" value="false" /><param name="salign" value="" /><param name="allowScriptAccess" value="sameDomain" /><a href="http://www.adobe.com/go/getflash"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="获得 Adobe Flash Player" /></a></object>');
            if (/msie/.test(navigator.userAgent.toLowerCase())) {
                $('body').append($ieR);
                this.SWFObject = $ieR;
            } else {
                $('body').append($otherR);
                this.SWFObject = $otherR;
            }
        },
        start: function() {
            this.SWFObject[0].startAsRecord(this.options.uploadUrl);
        },
        stop: function() {
            this.SWFObject[0].stopAsRecord();
        }
    };
    window.YS.Recorder || (window.YS.Recorder = Recorder);
})();
