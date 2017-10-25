require('dotenv').config();
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import UglifyJsWebpackPlugin from 'uglifyjs-webpack-plugin';;
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const extractStyles = new ExtractTextWebpackPlugin('[name].css', {allChunks: true});
const extractHtml = new ExtractTextWebpackPlugin('[name].html', {allChunks: true});

const appConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));

let env = {
  production: process.env.NODE_ENV === 'production',
  apiUri: process.env.API_URL || 'beta-cms.stepconference.com',
  appUri: process.env.APP_URL || 'localhost:3000',
  appTitle: appConfig.appTitle || 'react-super-starter',
  verbose: process.env.VERBOSE,
};

let config = {
  devtool: env.production ? false : 'inline-source-map',
  devServer: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: { disableDotRule: true }
  },
  entry: {
    main: './client/index'
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true
        }
      }, {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(css|sass|scss)$/,
        use: extractStyles.extract([
          {
            loader: 'css-loader',
            options: { minimize: false }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                autoprefixer({ browsers: ['last 2 version', 'Explorer >= 10', 'Android >= 4'] })
              }
            }
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: []
            }
          }
        ])
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('build'),
    new WriteFileWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
      env,
      PUBLIC_URL: env.appUri,
      APP_TITLE: env.appTitle
    }),
    new CopyWebpackPlugin([
      {from: 'public/favicon.ico'},
      {from: 'public/manifest.json'},
      {from: 'i18n/*.json'},
    ]),
    extractStyles,
  ]
};


if (env.production) {
  config.plugins = [
    ...config.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.png$|\.jpe?g$|\.gif$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new UglifyJsWebpackPlugin({ parallel: true })
  ];
}

if (!env.verbose) {
  const stats = {
    assets: true,
    assetsSort: 'size',
    chunks: false,
    children: false,
    modules: false,
    errors: true,
    errorDetails: true,
    excludeAssets: /\.(png|jpe?g|svg|gif|woff2?|ttf|eot)$/,
    warnings: true,
    hash: true,
    version: true,
    timings: true,
    reasons: true,
    source: true,
    publicPath: true
  };
  config.devServer.stats = { ...stats };
  config.stats = { ...stats };
};

export default config;
