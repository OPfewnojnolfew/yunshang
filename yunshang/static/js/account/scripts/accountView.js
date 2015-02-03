/**
 * [description 用户中心]
 */
define(function(require, exports, module) {
    var template = require('template'),
        SIDE = '/assets/static/js/account/template/side.html',
        LIST = '/assets/static/js/account/template/list.html';
    var View = function(options) {
        this.$accountSide = $('.account-side');
        this.$accountInfo = $('.account-info');
        this.$accountOther = $('.account-other');
    };
    View.prototype = {
        init: function() {},
        bindEvents: function() {

        },
        /**
         * 渲染菜单
         * @param  {[type]} res [description]
         * @return {[type]}     [description]
         */
        renderSides: function(res) {
            var self = this;
            template.renderByTemplate(LIST).then(function(tml) {
                var $side = $($.parseHTML(tml({
                    side: res.items
                })));
                self.afterRenderSides($side);
                self.$accountSide.html($side);
            });
        },
        /**
         * 渲染菜单后
         * @param  {[type]} $dom [description]
         * @return {[type]}      [description]
         */
        afterRenderSides: function($dom) {
            var $as = $('a', $dom);
            $dom.on('click', 'a', function() {
                $as.removeClass('active');
                $(this).addClass('active');
                PubSub.publish('account.getCourse');
            });
            $as.removeClass('active');
            $as.eq(0).addClass('active');
            PubSub.publish('account.getCourse');
        },
        /**
         * 渲染用户信息
         * @param  {[type]} res [description]
         * @return {[type]}     [description]
         */
        renderUserInfo: function(res) {
            var self = this;
            template.renderByTemplate(LIST).then(function(tml) {
                var $info = $($.parseHTML(tml({
                    userInfo: res.userInfo
                })));
                self.$accountInfo.html($info);
            });

        },
        /**
         * 渲染课程
         * @param  {[type]} res [description]
         * @return {[type]}     [description]
         */
        renderCourse: function(res) {
            var self = this;
            template.renderByTemplate(LIST).then(function(tml) {
                var $course = $($.parseHTML(tml({
                    course: res.course
                })));
                self.$accountOther.html($course);
            });
        }
    };
    module.exports = View;
});
