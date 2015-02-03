define(function(require, exports, module) {
    var templates = {};
    module.exports = {
        /**
         * 模板渲染
         * @param  {string} tempURL 模板地址
         * @param  {boolean} force   强制更新
         * @return {[type]}         [description]
         */
        renderByTemplate: function(tempURL, force) {
            var self = this,
                temp = templates[tempURL];
            if (!temp || force) {
                return $.get(tempURL).then(function(tml) {
                    return templates[tempURL] = Handlebars.compile(tml);
                });
            } else {
                return $.Deferred().resolve(temp);
            }
        }
    };
});
