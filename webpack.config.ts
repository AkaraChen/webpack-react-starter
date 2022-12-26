import { MFSU } from '@umijs/mfsu';
import webpack from 'webpack';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import HTMLWebpackPlugin from 'html-webpack-plugin';

const mfsu = new MFSU({
    implementor: webpack,
    depBuildConfig: {},
    startBuildWorker: undefined as any,
    buildDepWithESBuild: true
});

const config: webpack.Configuration = {
    mode: 'development',
    entry: './src/main.tsx',
    module: {
        rules: [
            {
                test: /\.(`ts|tsx)$/,
                loader: 'swc-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    optimization: {
        minimizer: [
            new ESBuildMinifyPlugin({
                legalComments: 'none',
                css: true
            })
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        })
    ]
};

const depConfig: webpack.Configuration = {};

mfsu.setWebpackConfig({ config, depConfig });

export default config;
