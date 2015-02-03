seajs.config({
    alias: {
        'jquery': '/assets/static/js/jquery',
        'handlebars': '/assets/static/js/lib/handlebars',
        'template': '/assets/static/js/utils/template',
        'baseModel': '/assets/static/js/utils/baseModel',
        'PubSub': '/assets/static/js/lib/pubsub',
        'mod.base': '/assets/static/js/mod.base'
    },
    preload: [
        window.jQuery ? '' : 'jquery',
        window.Handlebars ? '' : 'handlebars'
    ]
});
