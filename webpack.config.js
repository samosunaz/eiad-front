module.exports = {
  entry: './src/app/app.module.js',
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    port: 8080,
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'ng-annotate-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
};
