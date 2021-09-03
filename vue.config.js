const path = require('path');

module.exports = {
    publicPath: '/',
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            alias: {

            },
        },
        output: {
            libraryExport: 'default'
        }
    },
    css: {
        extract: false
    }
}
