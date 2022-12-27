import { MFSU } from '@umijs/mfsu';
import webpack from 'webpack';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtract from 'mini-css-extract-plugin';

const mfsu = new MFSU({
    strategy: 'normal',
    implementor: webpack,
    depBuildConfig: null,
    startBuildWorker: null as any,
    buildDepWithESBuild: true
});

export default async () => {
    const config: webpack.Configuration = {
        mode: 'development',
        entry: './src/main.tsx',
        // @ts-ignore
        devServer: {
            onBeforeSetupMiddleware(devServer: any) {
                for (const middleware of mfsu.getMiddlewares()) {
                    devServer.app.use(middleware);
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.(`ts|tsx)$/,
                    loader: 'swc-loader'
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCSSExtract.loader,
                        'css-loader',
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.[jt]sx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                            plugins: [
                                ...mfsu.getBabelPlugins()
                            ]
                        }
                    }
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
            }),
            new MiniCSSExtract()
        ],
        stats: 'minimal',
        cache: {
            type: 'filesystem'
        }
    };

    const depConfig: webpack.Configuration = {};

    await mfsu.setWebpackConfig({ config, depConfig });

    return config;
};
