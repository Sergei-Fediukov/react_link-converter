import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin'
import { BuildMode, BuildOptions } from '../types/index'

export function buildBabelLoader({ mode }: BuildOptions) {
  const isDevelopment = mode === BuildMode.DEVELOPMENT
  const isProduction = mode === BuildMode.PRODUCTION

  const plugins = []
  if (isProduction) {
    plugins.push([
      removeDataTestIdBabelPlugin,
      {
        props: ['data-testid']
      }
    ])
  }

  return {
    test: /\.m?tsx$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              runtime: isDevelopment ? 'automatic' : 'classic'
            }
          ]
        ],
        plugins: plugins.length ? plugins : []
      }
    }
  }
}
