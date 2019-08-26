const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
            test: /\.css$/,
            use: ['style-loader',
            'css-loader'
            ]
          }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js','.jsx']
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html"
      }),
    ]
  };