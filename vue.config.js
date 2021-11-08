module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      filename: `cr_plugins-chunk.js`,
      chunkFilename: `cr_plugins-chunk.js`,
    }
  },
  css: {
    extract: false,
  },
}
