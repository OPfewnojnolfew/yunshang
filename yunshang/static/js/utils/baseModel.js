define(function(require, exports, module) {
    var cache = {};
    module.exports = {
        /**
         * ajax请求
         * @param  {[type]} url         [description]
         * @param  {[type]} data        [description]
         * @param  {[type]} type        [description]
         * @param  {[type]} contentType [description]
         * @return {[type]}             [description]
         */
        ajax: function(url, data, type, contentType) {
            var ops = {
                url: url,
                type: type || "GET",
                data: data || {}
            };
            contentType && (ops.contentType = contentType);
            var xhr = $.ajax(ops);
            if (!cache[url]) {
                cache[url] = [];
            }
            cache[url].push(xhr);
            return xhr;
        },
        /**
         * 不托管的ajax
         * @param  {[type]} url         [description]
         * @param  {[type]} data        [description]
         * @param  {[type]} type        [description]
         * @param  {[type]} contentType [description]
         * @return {[type]}             [description]
         */
        ajaxUnAbort: function(url, data, type, contentType) {
            var ops = {
                url: url,
                type: type || "GET",
                data: data || {}
            };
            contentType && (ops.contentType = contentType);
            return $.ajax(ops);
        },
        /**
         * ajax单例请求
         * @param  {[type]} url         [description]
         * @param  {[type]} data        [description]
         * @param  {[type]} type        [description]
         * @param  {[type]} contentType [description]
         * @return {[type]}             [description]
         */
        ajaxSingle: function(url, data, type, contentType) {
            this.abort(url);
            return this.ajax(url, data, type, contentType);
        },
        /**
         * 通过ajax配置发送请求
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        ajaxByOptions: function(options) {
            var xhr = $.ajax(options),
                url = options.url;
            if (!cache[url]) {
                cache[url] = [];
            }
            cache[url].push(xhr);
            return xhr;
        },
        /**
         * 通过ajax配置发送单例请求
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        ajaxSingleByOptions: function(options) {
            this.abort(options.url);
            return this.ajaxByOptions(options);
        },
        /**
         * 不托管的ajax
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        ajaxUnAbortByOptions: function(options) {
            return $.ajax(options);
        },
        /**
         * 中断请求
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        abort: function(url) {
            var list;
            if (list = cache[url]) {
                while (list.length) {
                    list.pop().abort();
                }
            }
        },
        /**
         * 中断所有请求
         * @return {[type]} [description]
         */
        abortAll: function() {
            var xhrMap = cache;
            for (var url in xhrMap) {
                if (xhrMap.hasOwnProperty(url)) {
                    this.abort(url);
                }
            }
        }
    }
});