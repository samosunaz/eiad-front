const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    polyfill: 'babel-polyfill',
    app: './src/app/app.module.js',
  },
  output: {
    filename: '[name].bundle.js',
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
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          test: /(node_modules)/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
