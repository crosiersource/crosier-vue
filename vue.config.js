const path = require("path");

module.exports = {
  publicPath: "/",
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve(`./node_modules/vue`),
      },
    },
    output: {
      libraryExport: "default",
    },
  },
  css: {
    extract: false,
  },
};
