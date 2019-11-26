module.exports = {
    runtimeCompiler: true,
    lintOnSave: false,
    
    // Github pages setup
    publicPath: 
      process.env.NODE_ENV === 'production'
        ? '/d3-chart-stacker/'
        : '/'
  }