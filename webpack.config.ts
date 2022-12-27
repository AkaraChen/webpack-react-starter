import { MFSU, esbuildLoader } from '@umijs/mfsu';
import webpack from 'webpack';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtract from 'mini-css-extract-plugin';
import esbuild from 'esbuild';

const isDevelopment = process.env.NODE_ENV === 'development';

const mfsu = isDevelopment ? new MFSU({
    strategy: 'normal',
    implementor: webpack,
    depBuildConfig: null,
    startBuildWorker: null as any,
    buildDepWithESBuild: true
}) : undefined;

export default async () => {
    const config: webpack.Configuration = {
        mode: 'development',
        entry: './src/main.tsx',
        // @ts-ignore
        devServer: {
            setupMiddlewares(middlewares: any) {
                if (isDevelopment) {
                    middlewares.unshift(...mfsu!.getMiddlewares());
                }
                return middlewares;
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
                        loader: esbuildLoader,
                        options: {
                            handler: isDevelopment ? mfsu!.getEsbuildLoaderHandler() : [],
                            target: 'esnext',
                            implementation: esbuild
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

    const depConfig: webpack.Configuration = {
        output: {},
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                '@babel/preset-typescript'
                            ]
                        }
                    }
                }
            ]
        }
    };
    if (isDevelopment) {
        await mfsu!.setWebpackConfig({ config, depConfig });
    }
    return config;
};
