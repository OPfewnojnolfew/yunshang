/**
 * [description 用户中心]
 */
define(function(require, exports, module) {
    var model = require('./accountModel'),
        view;
    /**
     * [Controller 定义用户中心控制器类]
     */
    var Controller = function(options) {
        var self = this;
        this.options = options;
        this.userInfo = null;
        this.registerPubsub({
            'account.getCourse': self.getCourse
        });
        view = new(require('./accountView'))(options);
    };
    Controller.prototype = {
        /**
         * 初始化，入口
         * @return {[type]} [description]
         */
        init: function() {
            var self = this;
            view.init();
            self.getSides();
            self.getUserInfo();
        },
        /**
         * 获取用户信息
         * @return {[type]} [description]
         */
        getUserInfo: function() {
            var self = this;
            model.getUserInfo().then(function(res) {
                if (res.code === '200') {
                    self.userInfo = res.userInfo;
                    view && view.renderUserInfo(res);
                } else {
                    //补充
                }
            });
        },
        /**
         * 获取菜单
         * @return {[type]} [description]
         */
        getSides: function() {
            model.getSides().then(function(res) {
                if (res.code === '200') {
                    view && view.renderSides(res);
                } else {
                    //补充
                }
            });
        },
        /**
         * 获取课程
         * @return {[type]} [description]
         */
        getCourse: function() {
            if (this.userInfo && this.userInfo.userID) {
                model.getCourse({
                    id: this.userInfo.userID
                }).then(function(res) {
                    if (res.code === '200') {
                        view && view.renderCourse(res);
                    } else {
                        //补充
                    }
                });
            }
        },
        registerPubsub: function(items) {
            var item,
                self = this;
            for (item in items) {
                if (items.hasOwnProperty(item)) {
                    (function(item) {
                        PubSub.subscribe(item, function(msg, data) {
                            items[item].call(self, data);
                        });
                    })(item);
                }
            }
        }
    };
    module.exports = Controller;
});
