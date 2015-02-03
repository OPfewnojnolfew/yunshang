/**
 * [description 用户中心]
 */
define(function(require, exports, module) {
    var baseModel = require('baseModel'),
        URLS = {
            SIDES: '',
            USER_INFO: '',
            COURSE: ''
        };
    var model = {
        getUserInfo: function(postData) {
            // return baseModel.ajaxSingle(URLS.SIDES, postData);
            return $.Deferred().resolve({
                code: "200",
                userInfo: {
                    userID: '1',
                    nickName: '火拳阿飞',
                    userName: 'xxx@xxx.com',
                    balance: '1000',
                    answer: 10,
                    signin: 11,
                    course: 30000,
                    questions: 1000
                }
            });
        },
        getSides: function(postData) {
            // return baseModel.ajaxSingle(URLS.SIDES, postData);
            return $.Deferred().resolve({
                code: "200",
                items: [{
                    name: '内容管理',
                    children: [{
                        name: '我的课程'
                    }, {
                        name: '我的记录'
                    }, {
                        name: '我的记录'
                    }]
                }, {
                    name: '内容管理',
                    children: [{
                        name: '我的课程'
                    }, {
                        name: '我的记录'
                    }, {
                        name: '我的记录'
                    }]
                }, {
                    name: '内容管理',
                    children: [{
                        name: '我的课程'
                    }, {
                        name: '我的记录'
                    }, {
                        name: '我的记录'
                    }]
                }]
            });
        },
        getCourse: function(postData) {
            // return baseModel.ajaxSingle(URLS.COURSE, postData);
            return $.Deferred().resolve({
                code: "200",
                course: {
                    userID: '1',
                    nickName: '火拳阿飞',
                    userName: 'xxx@xxx.com',
                    balance: '1000',
                    answer: 10,
                    signin: 11,
                    course: 30000,
                    questions: 1000
                }
            });
        }
    };
    module.exports = model;
});
