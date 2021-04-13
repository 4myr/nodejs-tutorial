const path = require('path');
const glob = require('glob');

module.exports = {
    watch: true,
    entry: glob.sync('./public/dist/**.js').reduce(function(obj, el){
        obj[path.parse(el).name] = el;
        return obj
        },{}),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './public/js/'),
    },
};