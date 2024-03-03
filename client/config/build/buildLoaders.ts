import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import { ModuleOptions } from 'webpack'

// import { buildBabelLoader } from "./babel/buildBabelLoader";
import { BuildMode, BuildOptions } from './types'

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const isDevelopment = options.mode === BuildMode.DEVELOPMENT

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource'
  }

  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true
                }
              }
            ]
          }
        }
      }
    ]
  }

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDevelopment ? '[path][name]__[local]' : '[hash:base64:8]'
      }
    }
  }

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      'sass-loader'
    ]
  }

  const tsLoader = {
    // use: 'ts-loader',
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          // Disable typescript code validation. Fast project build
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean)
          })
        }
      }
    ],
    exclude: /node_modules/
  }

  // const babelLoader = buildBabelLoader(options);
  return [
    assetLoader,
    scssLoader,
    tsLoader,
    // babelLoader,
    svgrLoader
  ]
}
