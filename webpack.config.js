/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const webpack = require('webpack');

const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  // const isAnalyze = env.analyze;
  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval',
    watch: !isProduction,

    entry: ['./src/index.ts', './src/sass/style.scss'],
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'script.js',
      assetModuleFilename: 'assets/public/[hash][ext]',
    },
    optimization: {
      minimize: false,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json', '.mjs'],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },

        {
          test: /\.(sa|sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          type: 'asset/resource',
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    devServer: {
      open: true,
      port: 1000,
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
    ],
  };

  return config;
};
