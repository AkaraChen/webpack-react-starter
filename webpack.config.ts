import { MFSU } from '@umijs/mfsu';
import webpack from 'webpack';
import { ESBuildMinifyPlugin } from 'esbuild-loader';

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
        extensions: ['.ts', '.tsx']
    },
    optimization: {
        minimizer: [
            new ESBuildMinifyPlugin({
                legalComments: 'none',
                css: true
            })
        ]
    }
};

const depConfig: webpack.Configuration = {};

mfsu.setWebpackConfig({ config, depConfig });

export default config;
