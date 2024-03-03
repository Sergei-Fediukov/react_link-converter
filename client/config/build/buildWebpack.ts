import webpack from 'webpack'

import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { BuildMode, BuildOptions } from './types'

export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
  const { mode, paths } = options
  const isDevelopment = mode === BuildMode.DEVELOPMENT

  return {
    mode,
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options)
    },
    resolve: buildResolvers(options),
    devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'source-map',
    devServer: isDevelopment ? buildDevServer(options) : undefined
  }
}
