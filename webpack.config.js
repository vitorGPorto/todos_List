const path = require("path");
const webpack = require('webpack')
module.exports = {
entry: "./src/main.js",
output:{
    filename: "bundle.js", 
    path: path.resolve(__dirname, "public"),
    sourceMapFilename:"bundle.js.map"
    
},
devServer: {
    contentBase:path.resolve(__dirname, "public"),
    port:3000
},

devtool:'source-map',
module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
}