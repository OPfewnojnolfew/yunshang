	/*******************************
 * @Copyright:云上教育
 * @Author:渔夫科技-info@yufukeji.com
 *******************************/
/* art dialog */
/*! artDialog v6.0.5 | https://github.com/aui/artDialog */
!function(){function a(b){var d=c[b],e="exports";return"object"==typeof d?d:(d[e]||(d[e]={},d[e]=d.call(d[e],a,d[e],d)||d[e]),d[e])}function b(a,b){c[a]=b}var c={};b("jquery",function(){return jQuery}),b("popup",function(a){function b(){this.destroyed=!1,this.__popup=c("<div />").css({display:"none",position:"absolute",outline:0}).attr("tabindex","-1").html(this.innerHTML).appendTo("body"),this.__backdrop=this.__mask=c("<div />").css({opacity:.7,background:"#000"}),this.node=this.__popup[0],this.backdrop=this.__backdrop[0],d++}var c=a("jquery"),d=0,e=!("minWidth"in c("html")[0].style),f=!e;return c.extend(b.prototype,{node:null,backdrop:null,fixed:!1,destroyed:!0,open:!1,returnValue:"",autofocus:!0,align:"bottom left",innerHTML:"",className:"ui-popup",show:function(a){if(this.destroyed)return this;var d=this.__popup,g=this.__backdrop;if(this.__activeElement=this.__getActive(),this.open=!0,this.follow=a||this.follow,!this.__ready){if(d.addClass(this.className).attr("role",this.modal?"alertdialog":"dialog").css("position",this.fixed?"fixed":"absolute"),e||c(window).on("resize",c.proxy(this.reset,this)),this.modal){var h={position:"fixed",left:0,top:0,width:"100%",height:"100%",overflow:"hidden",userSelect:"none",zIndex:this.zIndex||b.zIndex};d.addClass(this.className+"-modal"),f||c.extend(h,{position:"absolute",width:c(window).width()+"px",height:c(document).height()+"px"}),g.css(h).attr({tabindex:"0"}).on("focus",c.proxy(this.focus,this)),this.__mask=g.clone(!0).attr("style","").insertAfter(d),g.addClass(this.className+"-backdrop").insertBefore(d),this.__ready=!0}d.html()||d.html(this.innerHTML)}return d.addClass(this.className+"-show").show(),g.show(),this.reset().focus(),this.__dispatchEvent("show"),this},showModal:function(){return this.modal=!0,this.show.apply(this,arguments)},close:function(a){return!this.destroyed&&this.open&&(void 0!==a&&(this.returnValue=a),this.__popup.hide().removeClass(this.className+"-show"),this.__backdrop.hide(),this.open=!1,this.blur(),this.__dispatchEvent("close")),this},remove:function(){if(this.destroyed)return this;this.__dispatchEvent("beforeremove"),b.current===this&&(b.current=null),this.__popup.remove(),this.__backdrop.remove(),this.__mask.remove(),e||c(window).off("resize",this.reset),this.__dispatchEvent("remove");for(var a in this)delete this[a];return this},reset:function(){var a=this.follow;return a?this.__follow(a):this.__center(),this.__dispatchEvent("reset"),this},focus:function(){var a=this.node,d=this.__popup,e=b.current,f=this.zIndex=b.zIndex++;if(e&&e!==this&&e.blur(!1),!c.contains(a,this.__getActive())){var g=d.find("[autofocus]")[0];!this._autofocus&&g?this._autofocus=!0:g=a,this.__focus(g)}return d.css("zIndex",f),b.current=this,d.addClass(this.className+"-focus"),this.__dispatchEvent("focus"),this},blur:function(){var a=this.__activeElement,b=arguments[0];return b!==!1&&this.__focus(a),this._autofocus=!1,this.__popup.removeClass(this.className+"-focus"),this.__dispatchEvent("blur"),this},addEventListener:function(a,b){return this.__getEventListener(a).push(b),this},removeEventListener:function(a,b){for(var c=this.__getEventListener(a),d=0;d<c.length;d++)b===c[d]&&c.splice(d--,1);return this},__getEventListener:function(a){var b=this.__listener;return b||(b=this.__listener={}),b[a]||(b[a]=[]),b[a]},__dispatchEvent:function(a){var b=this.__getEventListener(a);this["on"+a]&&this["on"+a]();for(var c=0;c<b.length;c++)b[c].call(this)},__focus:function(a){try{this.autofocus&&!/^iframe$/i.test(a.nodeName)&&a.focus()}catch(b){}},__getActive:function(){try{var a=document.activeElement,b=a.contentDocument,c=b&&b.activeElement||a;return c}catch(d){}},__center:function(){var a=this.__popup,b=c(window),d=c(document),e=this.fixed,f=e?0:d.scrollLeft(),g=e?0:d.scrollTop(),h=b.width(),i=b.height(),j=a.width(),k=a.height(),l=(h-j)/2+f,m=382*(i-k)/1e3+g,n=a[0].style;n.left=Math.max(parseInt(l),f)+"px",n.top=Math.max(parseInt(m),g)+"px"},__follow:function(a){var b=a.parentNode&&c(a),d=this.__popup;if(this.__followSkin&&d.removeClass(this.__followSkin),b){var e=b.offset();if(e.left*e.top<0)return this.__center()}var f=this,g=this.fixed,h=c(window),i=c(document),j=h.width(),k=h.height(),l=i.scrollLeft(),m=i.scrollTop(),n=d.width(),o=d.height(),p=b?b.outerWidth():0,q=b?b.outerHeight():0,r=this.__offset(a),s=r.left,t=r.top,u=g?s-l:s,v=g?t-m:t,w=g?0:l,x=g?0:m,y=w+j-n,z=x+k-o,A={},B=this.align.split(" "),C=this.className+"-",D={top:"bottom",bottom:"top",left:"right",right:"left"},E={top:"top",bottom:"top",left:"left",right:"left"},F=[{top:v-o,bottom:v+q,left:u-n,right:u+p},{top:v,bottom:v-o+q,left:u,right:u-n+p}],G={left:u+p/2-n/2,top:v+q/2-o/2},H={left:[w,y],top:[x,z]};c.each(B,function(a,b){F[a][b]>H[E[b]][1]&&(b=B[a]=D[b]),F[a][b]<H[E[b]][0]&&(B[a]=D[b])}),B[1]||(E[B[1]]="left"===E[B[0]]?"top":"left",F[1][B[1]]=G[E[B[1]]]),C+=B.join("-")+" "+this.className+"-follow",f.__followSkin=C,b&&d.addClass(C),A[E[B[0]]]=parseInt(F[0][B[0]]),A[E[B[1]]]=parseInt(F[1][B[1]]),d.css(A)},__offset:function(a){var b=a.parentNode,d=b?c(a).offset():{left:a.pageX,top:a.pageY};a=b?a:a.target;var e=a.ownerDocument,f=e.defaultView||e.parentWindow;if(f==window)return d;var g=f.frameElement,h=c(e),i=h.scrollLeft(),j=h.scrollTop(),k=c(g).offset(),l=k.left,m=k.top;return{left:d.left+l-i,top:d.top+m-j}}}),b.zIndex=1024,b.current=null,b}),b("dialog-config",{backdropBackground:"#000",backdropOpacity:.7,content:'<span class="ui-dialog-loading">Loading..</span>',title:"提示消息",statusbar:"",button:null,ok:function(){},cancel:null,okValue:"确定",cancelValue:"取消",cancelDisplay:!0,width:"240",height:"",padding:"",skin:"",quickClose:!1,cssUri:"../css/ui-dialog.css",innerHTML:'<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><button i="close" class="ui-dialog-close">&#215;</button><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr><tr><td i="footer" class="ui-dialog-footer"><div i="statusbar" class="ui-dialog-statusbar"></div><div i="button" class="ui-dialog-button"></div></td></tr></table></div>'}),b("dialog",function(a){var b=a("jquery"),c=a("popup"),d=a("dialog-config"),e=d.cssUri;if(e){var f=a[a.toUrl?"toUrl":"resolve"];f&&(e=f(e),e='<link rel="stylesheet" href="'+e+'" />',b("base")[0]?b("base").before(e):b("head").append(e))}var g=0,h=new Date-0,i=!("minWidth"in b("html")[0].style),j="createTouch"in document&&!("onmousemove"in document)||/(iPhone|iPad|iPod)/i.test(navigator.userAgent),k=!i&&!j,l=function(a,c,d){var e=a=a||{};("string"==typeof a||1===a.nodeType)&&(a={content:a,fixed:!j}),a=b.extend(!0,{},l.defaults,a),a.original=e;var f=a.id=a.id||h+g,i=l.get(f);return i?i.focus():(k||(a.fixed=!1),a.quickClose&&(a.modal=!0,a.backdropOpacity=0),b.isArray(a.button)||(a.button=[]),void 0!==d&&(a.cancel=d),a.cancel&&a.button.push({id:"cancel",value:a.cancelValue,callback:a.cancel,display:a.cancelDisplay}),void 0!==c&&(a.ok=c),a.ok&&a.button.push({id:"ok",value:a.okValue,callback:a.ok,autofocus:!0}),l.list[f]=new l.create(a))},m=function(){};m.prototype=c.prototype;var n=l.prototype=new m;return l.create=function(a){var d=this;b.extend(this,new c);var e=(a.original,b(this.node).html(a.innerHTML)),f=b(this.backdrop);return this.options=a,this._popup=e,b.each(a,function(a,b){"function"==typeof d[a]?d[a](b):d[a]=b}),a.zIndex&&(c.zIndex=a.zIndex),e.attr({"aria-labelledby":this._$("title").attr("id","title:"+this.id).attr("id"),"aria-describedby":this._$("content").attr("id","content:"+this.id).attr("id")}),this._$("close").css("display",this.cancel===!1?"none":"").attr("title",this.cancelValue).on("click",function(a){d._trigger("cancel"),a.preventDefault()}),this._$("dialog").addClass(this.skin),this._$("body").css("padding",this.padding),a.quickClose&&f.on("onmousedown"in document?"mousedown":"click",function(){return d._trigger("cancel"),!1}),this.addEventListener("show",function(){f.css({opacity:0,background:a.backdropBackground}).animate({opacity:a.backdropOpacity},150)}),this._esc=function(a){var b=a.target,e=b.nodeName,f=/^input|textarea$/i,g=c.current===d,h=a.keyCode;!g||f.test(e)&&"button"!==b.type||27===h&&d._trigger("cancel")},b(document).on("keydown",this._esc),this.addEventListener("remove",function(){b(document).off("keydown",this._esc),delete l.list[this.id]}),g++,l.oncreate(this),this},l.create.prototype=n,b.extend(n,{content:function(a){var c=this._$("content");return"object"==typeof a?(a=b(a),c.empty("").append(a.show()),this.addEventListener("beforeremove",function(){b("body").append(a.hide())})):c.html(a),this.reset()},title:function(a){return this._$("title").text(a),this._$("header")[a?"show":"hide"](),this},width:function(a){return this._$("content").css("width",a),this.reset()},height:function(a){return this._$("content").css("height",a),this.reset()},button:function(a){a=a||[];var c=this,d="",e=0;return this.callbacks={},"string"==typeof a?(d=a,e++):b.each(a,function(a,f){var g=f.id=f.id||f.value,h="";c.callbacks[g]=f.callback,f.display===!1?h=' style="display:none"':e++,d+='<button type="button" i-id="'+g+'"'+h+(f.disabled?" disabled":"")+(f.autofocus?' autofocus class="ui-dialog-autofocus"':"")+">"+f.value+"</button>",c._$("button").on("click","[i-id="+g+"]",function(a){var d=b(this);d.attr("disabled")||c._trigger(g),a.preventDefault()})}),this._$("button").html(d),this._$("footer")[e?"show":"hide"](),this},statusbar:function(a){return this._$("statusbar").html(a)[a?"show":"hide"](),this},_$:function(a){return this._popup.find("[i="+a+"]")},_trigger:function(a){var b=this.callbacks[a];return"function"!=typeof b||b.call(this)!==!1?this.close().remove():this}}),l.oncreate=b.noop,l.getCurrent=function(){return c.current},l.get=function(a){return void 0===a?l.list:l.list[a]},l.list={},l.defaults=d,l}),window.dialog=a("dialog")}();
	window._log=function(){
       var w=window.console,a=arguments;
       if(w && w.log){
         w.log.apply ? w.log.apply(w,a) : w.log(a);
       }
    }
$(function(){
	//共用正则
	window.isEmpty = function (str) {
	    return /^\s*$/g.test(str.replace(/^\s+|\s+$/g, ''));
	};
	window.isNumber = function (str) {
	    return /^[+\-]?\d+(\.\d+)?$/.test(str);
	};
	window.isRealName = function (str) {
	    return /^[a-zA-Z0-9\u4e00-\u9fa5]{2,12}$/.test(str);
	};
	window.isMail = function (str) {
	    return /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(str);
	};
	window.isPsw = function (str) {
	    return /^[\S]{6,16}$/.test(str);
	};
	window.isCompany = function (str) {
	    return /^[0-9a-zA-Z\u4e00-\u9fa5\uff08\uff09]{1,40}$/.test(str);
	};
	window.isMobi = function (str) {
	    return /^1[3|4|5|8][0-9]{9}$/.test(str);
	};
	window.isTel = function (str) {
	    return /^[\d\+\s\-_]{7,15}$/.test(str);
	};
	window.isContact = function (str) {
	    return /^[\S\s]{4,15}$/.test(str);
	};
	window.isUrl = function (str) {
	    return /^(http(s)?:\/\/)?[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\v-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(str);
	};
	window.isDate = function (str) {
	    return /^(\d{4})\-(\d{1,2})\-(\d{1,2})$/.test(str);
	};
	window.isQQ = function (str) {
	    return /^[1-9]\d{3,11}$/.test(str);
	};
	//单数补0
	window.TOEVEN = function (n) {
	    n = parseInt(n);
	    if (typeof n !== 'number') {
	        return;
	    }
	    if (n < 10) {
	        return '0' + n;
	    } else {
	        return n;
	    }
	};
	//公用注册
	window.H = $('#H');
	window.M = $('#M');
	window.L = $('#L');
	window.R = $('#R');
	window.F = $('#F');
	window.W = $(window);
	window.BH = $('body,html');
	window.BODY = $('body');
	window.D = new Date();
	//用户名弹出
	var  hrAvatar=$('#H .hr-avatar');
	hrAvatar.hover(function(){
		$(this).addClass('hr-avatar-active');
		$(this).find('.ha-drop').slideDown(120);
	},function(){
		$(this).removeClass('hr-avatar-active');
		$(this).find('.ha-drop').slideUp(60);
	});
	//网站导航
	var hrItemNav=$('#H .hr-item-nav');
	hrItemNav.hover(function(){
		$(this).addClass('hr-item-nav-active');
		$(this).find('.ht-drop').slideDown(120);
	},function(){
		$(this).removeClass('hr-item-nav-active');
		$(this).find('.ht-drop').slideUp(60);
	});
	//导航弹出
	var navItem=$('#H .nav>li.n-item');
	navItem.hover(function(){
		var drop=$(this).find('.nav-drop');
		var icon=$(this).find('a>.iconfont');
		if(drop.length==1){
			$(this).addClass('acitve');
			icon.addClass('iconfontactive');
			drop.slideDown(120);
		}
	},function(){
		var drop=$(this).find('.nav-drop');
		var icon=$(this).find('a>.iconfont');
		if(drop.length==1){
			$(this).removeClass('acitve');
			icon.removeClass('iconfontactive');
			drop.slideUp(60);
		}
	});

});

// 选项卡插件
(function() {
    var Tab = function(node) {
        this.node = jQuery(node);
    };
    Tab.prototype = {
        activate: function() {
            var node = this.node,
                view = jQuery('.ui-tab[data-tab="' + node.data('tab') + '"]');

            node.addClass('active').siblings().removeClass('active');
            view.addClass('active').siblings().removeClass('active');
        }
    };
    jQuery.fn.tab = function(option) {
        return this.each(function() {
            var node = jQuery(this),
                data = node.data('ui_tab') || new Tab(this);

            if (typeof data[option] === 'function') {
                data[option]();
            }
            node.data('ui_tab', data);
        });
    };
    jQuery(document).on('click.ui-tab', '.ui-tabular [data-tab]', function(e) {
        jQuery(this).tab('activate');
        e.preventDefault();
    });
})();


/*
---

name: JSON

description: JSON encoder and decoder.

license: MIT-style license.

SeeAlso: <http://www.json.org/>

requires: [Array, String, Number, Function]

provides: JSON

...
*/

if (typeof JSON == 'undefined') this.JSON = {};


(function() {

	var special = {
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"': '\\"',
		'\\': '\\\\'
	};

	var escape = function(chr) {
		return special[chr] || '\\u' + ('0000' + chr.charCodeAt(0).toString(16)).slice(-4);
	};

	JSON.validate = function(string) {
		string = string.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
		replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
		replace(/(?:^|:|,)(?:\s*\[)+/g, '');

		return (/^[\],:{}\s]*$/).test(string);
	};

	JSON.encode = JSON.stringify = JSON.stringify ||
		function(obj) {
			if (obj && obj.toJSON) obj = obj.toJSON();

			switch (typeOf(obj)) {
				case 'string':
					return '"' + obj.replace(/[\x00-\x1f\\"]/g, escape) + '"';
				case 'array':
					return '[' + obj.map(JSON.encode).clean() + ']';
				case 'object':
				case 'hash':
					var string = [];
					Object.each(obj, function(value, key) {
						var json = JSON.encode(value);
						if (json) string.push(JSON.encode(key) + ':' + json);
					});
					return '{' + string + '}';
				case 'number':
				case 'boolean':
					return '' + obj;
				case 'null':
					return 'null';
			}

			return null;
	};

	JSON.decode = JSON.parse = JSON.parse ||
		function(string, secure) {
			if (!string || typeOf(string) != 'string') return null;

			if (secure || JSON.secure) {
				if (JSON.parse) return JSON.parse(string);
				if (!JSON.validate(string)) throw new Error('JSON could not decode the input; security is enabled and the value is not secure.');
			}

			return eval('(' + string + ')');
	};

})();

/***************************共用函数************************/
(function() {
    window.YS = window.YS || {};
    window.YS.ajax = function(url, data, type, contentType) {
        var ops = {
            url: url,
            type: type || "GET",
            data: data || {}
        };
        contentType && (ops.contentType = contentType);
        var xhr = $.ajax(ops);
        return xhr;
    };
    window.YS.getParameterByName = function(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
})();

(function(){
	var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
jQuery.uaMatch = function(ua) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

	    return {
	        browser: match[1] || "",
	        version: match[2] || "0"
	    };
	};

	matched = jQuery.uaMatch(navigator.userAgent);
	browser = {};

	if (matched.browser) {
	    browser[matched.browser] = true;
	    browser.version = matched.version;
	}

	// Deprecated, use jQuery.browser.webkit instead
	// Maintained for back-compat only
	if (browser.webkit) {
	    browser.safari = true;
	}

	jQuery.browser = browser;

})(jQuery);

(function(){
	var win = window,
        doc = document;
    var ENV = {
        on: function(el, type, cb) {
            if ('addEventListener' in win) {
                el.addEventListener(type, cb, false);
            } else {
                el.attachEvent('on' + type, cb);
            }
        },

        off: function(el, type, cb) {
            if ('addEventListener' in win) {
                el.removeEventListener(type, cb, false);
            } else {
                el.detachEvent('on' + type, cb);
            }
        },

        bind: function(fn, ctx) {
            return function() {
                fn.apply(ctx, arguments);
            };
        },

        isArray: Array.isArray ||
            function(obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            },

        config: function(preferred, fallback) {
            return preferred ? preferred : fallback;
        },

        transSupport: false,

        useFilter: /msie [678]/i.test(navigator.userAgent),
        // sniff, sniff
        checkTransition: function() {
            var el = doc.createElement('div');
            var vendors = {
                webkit: 'webkit',
                Moz: '',
                O: 'o',
                ms: 'MS'
            };

            for (var vendor in vendors) {
                if (vendor + 'Transition' in el.style) {
                    this.vendorPrefix = vendors[vendor];
                    this.transSupport = true;
                }
            }
        }
    };

    ENV.checkTransition();
    var DOMPanel = (function() {

        var panel = null;

        return {

            append: function(dom) {
                this.getPanel().append(dom);
            },

            prepend: function(dom) {
                this.getPanel().prepend(dom);
            },

            getPanel: function() {
                if (panel === null) {
                    panel = jQuery('#domPanel');
                    if (panel.size() === 0) {
                        panel = jQuery('<div id="domPanel" />').prependTo('body');
                    }

                    // 点击对话框不会触发给document绑定的点击行为
                    panel.click(Toolkit.cancelBubble);
                    panel.mousedown(Toolkit.cancelBubble);
                }

                return panel;
            }
        };

    })();

    var Notify = function(o) {
        o = o || {};
        this.queue = [];
        this.baseCls = o.baseCls || 'notify';
        this.addnCls = o.addnCls || '';
        this.timeout = 'timeout' in o ? o.timeout : 2000;
        this.waitForMove = o.waitForMove || false;
        this.clickToClose = o.clickToClose || false;
        this.container = o.container;

        try {
            this.setupEl();
        } catch (e) {
            jQuery(ENV.bind(this.setupEl, this));
        }
    };

    Notify.prototype = {

        constructor: Notify,

        setupEl: function() {
            var el = doc.createElement('div');
            el.style.display = 'none';
            this.container = this.container || DOMPanel.getPanel()[0];
            this.container.appendChild(el);
            this.el = el;
            this.removeEvent = ENV.bind(this.remove, this);
            this.transEvent = ENV.bind(this.afterAnimation, this);
            this.run();
        },

        afterTimeout: function() {
            if (!ENV.config(this.currentMsg.waitForMove, this.waitForMove)) {
                this.remove();
            } else if (!this.removeEventsSet) {
                ENV.on(doc.body, 'mousemove', this.removeEvent);
                ENV.on(doc.body, 'click', this.removeEvent);
                ENV.on(doc.body, 'keypress', this.removeEvent);
                ENV.on(doc.body, 'touchstart', this.removeEvent);
                this.removeEventsSet = true;
            }
        },

        run: function() {
            if (this.animating || !this.queue.length || !this.el) {
                return;
            }

            this.animating = true;
            if (this.currentTimer) {
                clearTimeout(this.currentTimer);
                this.currentTimer = null;
            }

            var msg = this.queue.shift();
            var clickToClose = ENV.config(msg.clickToClose, this.clickToClose);

            if (clickToClose) {
                ENV.on(this.el, 'click', this.removeEvent);
                ENV.on(this.el, 'touchstart', this.removeEvent);
            }
            var timeout = ENV.config(msg.timeout, this.timeout);

            if (timeout > 0) {
                this.currentTimer = setTimeout(ENV.bind(this.afterTimeout, this), timeout);
            }

            if (ENV.isArray(msg.html)) {
                msg.html = '<ul><li>' + msg.html.join('<li>') + '</ul>';
            }

            this.el.innerHTML = msg.html;
            this.currentMsg = msg;
            this.el.className = this.baseCls;
            if (ENV.transSupport) {
                this.el.style.display = 'block';
                setTimeout(ENV.bind(this.showMessage, this), 50);
            } else {
                this.showMessage();
            }

        },

        setOpacity: function(opacity) {
            if (ENV.useFilter) {
                try {
                    this.el.filters.item('DXImageTransform.Microsoft.Alpha').Opacity = opacity * 100;
                } catch (err) {}
            } else {
                this.el.style.opacity = String(opacity);
            }
        },

        showMessage: function() {
            var addnCls = ENV.config(this.currentMsg.addnCls, this.addnCls);
            if (ENV.transSupport) {
                this.el.className = this.baseCls + ' ' + addnCls + ' ' + this.baseCls + '-animate';
            } else {
                var opacity = 0;
                this.el.className = this.baseCls + ' ' + addnCls + ' ' + this.baseCls + '-js-animate';
                this.setOpacity(0); // reset value so hover states work
                this.el.style.display = 'block';

                var self = this;
                var interval = setInterval(function() {
                    if (opacity < 1) {
                        opacity += 0.1;
                        opacity = Math.min(1, opacity);
                        self.setOpacity(opacity);
                    } else {
                        clearInterval(interval);
                    }
                }, 30);
            }
        },

        hideMessage: function() {
            var addnCls = ENV.config(this.currentMsg.addnCls, this.addnCls);
            if (ENV.transSupport) {
                this.el.className = this.baseCls + ' ' + addnCls;
                ENV.on(this.el, ENV.vendorPrefix ? ENV.vendorPrefix + 'TransitionEnd' : 'transitionend', this.transEvent);
            } else {
                var opacity = 1;
                var self = this;
                var interval = setInterval(function() {
                    if (opacity > 0) {
                        opacity -= 0.1;
                        opacity = Math.max(0, opacity);
                        self.setOpacity(opacity);
                    } else {
                        self.el.className = self.baseCls + ' ' + addnCls;
                        clearInterval(interval);
                        self.afterAnimation();
                    }
                }, 30);
            }
        },

        afterAnimation: function() {
            if (ENV.transSupport) {
                ENV.off(this.el, ENV.vendorPrefix ? ENV.vendorPrefix + 'TransitionEnd' : 'transitionend', this.transEvent);
            }

            if (this.currentMsg.cb) {
                this.currentMsg.cb();
            }
            this.el.style.display = 'none';
            this.animating = false;
            this.run();
        },

        remove: function(e) {
            var cb = typeof e === 'function' ? e : null;

            ENV.off(doc.body, 'mousemove', this.removeEvent);
            ENV.off(doc.body, 'click', this.removeEvent);
            ENV.off(doc.body, 'keypress', this.removeEvent);
            ENV.off(doc.body, 'touchstart', this.removeEvent);
            ENV.off(this.el, 'click', this.removeEvent);
            ENV.off(this.el, 'touchstart', this.removeEvent);
            this.removeEventsSet = false;

            if (cb && this.currentMsg) {
                this.currentMsg.cb = cb;
            }
            if (this.animating) {
                this.hideMessage();
            } else if (cb) {
                cb();
            }
        },

        log: function(html, o, cb, defaults) {
            var msg = {},
                opt = null;
            if (defaults) {
                for (opt in defaults) {
                    msg[opt] = defaults[opt];
                }
            }

            if (typeof o === 'function') {
                cb = o;
            } else if (o) {
                for (opt in o) {
                    msg[opt] = o[opt];
                }
            }

            msg.html = html;
            msg.cb = cb ? cb : msg.cb;
            this.queue.push(msg);
            this.run();
            return this;
        },

        spawn: function(defaults) {
            var self = this;
            return function(html, o, cb) {
                return self.log.call(self, html, o, cb, defaults);
            };
        }
    };

    window.notify = new Notify();

    notify.info = notify.spawn({
        addnCls: 'notify-info'
    });

    notify.error = notify.spawn({
        addnCls: 'notify-error'
    });

    notify.warn = notify.spawn({
        addnCls: 'notify-warn'
    });

    notify.success = notify.spawn({
        addnCls: 'notify-success'
    });
})()