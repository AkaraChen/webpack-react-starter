const { MFSU, esbuildLoader } = require('@umijs/mfsu');
const webpack = require('webpack');
const { EsbuildPlugin } = require('esbuild-loader')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');
const esbuild = require('esbuild');
const WebpackBar = require('webpackbar');
const { Consola } = require('consola');

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * @type {MFSU}
 */
const mfsu = isDevelopment
  ? new MFSU({
      strategy: 'normal',
      implementor: webpack,
      depBuildConfig: null,
      startBuildWorker: null,
      buildDepWithESBuild: true,
      cwd: process.cwd()
    })
  : undefined;

module.exports = async () => {
  const { default: confetti } = await import('unplugin-confetti')
  /**
   * @type {webpack.Configuration}
   */
  const config = {
    mode: isDevelopment ? 'development' : 'production',
    entry: './main.tsx',
    devServer: {
      setupMiddlewares(middlewares) {
        middlewares.unshift(...mfsu.getMiddlewares());
        return middlewares;
      },
      historyApiFallback: true,
      open: true,
      compress: false,
      client: {
        logging: 'none',
        progress: true
      }
    },
    infrastructureLogging: {
      level: 'error',
      console: Consola
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCSSExtract.loader, 'css-loader', 'postcss-loader']
        },
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: esbuildLoader,
            options: {
              handler: isDevelopment ? mfsu.getEsbuildLoaderHandler() : [],
              target: 'esnext',
              implementation: esbuild
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@': __dirname
      }
    },
    optimization: {
      minimizer: [
        new EsbuildPlugin({
          legalComments: 'none',
          css: true
        })
      ]
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './index.html'
      }),
      new MiniCSSExtract(),
      new WebpackBar(),
      new webpack.ProvidePlugin({
        React: 'react'
      }),
      confetti.webpack()
    ],
    stats: isDevelopment ? 'errors-warnings' : 'summary'
  };

  /**
   * @type {webpack.Configuration}
   */
  const depConfig = {
    output: {},
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: {
            loader: 'swc-loader'
          }
        }
      ]
    }
  };
  if (isDevelopment) {
    await mfsu.setWebpackConfig({ config, depConfig });
  }
  return config;
};
